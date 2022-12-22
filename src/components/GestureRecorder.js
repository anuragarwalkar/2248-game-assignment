import { useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { G, Svg } from "react-native-svg";
import useGridGenerator from "../hooks/useGridGenerator";
import getDotIndex, { getDimenssions } from "../utils/utils";
import ActiveLine from "./ActiveLine";
import GridItem from "./GridItem/GridItem";
import Pattern from "./Pattern/Pattern";

const { height, width } = getDimenssions();

const GestureRecorder = () => {
  const pathRef = useRef({});
  const pattern = useRef([]);
  const [activeDotCoordinate, setActiveDotCoordinate] = useState({});
  const { grid, mappedGridIndex } = useGridGenerator();

  const _isAlreadyInPattern = ({ x, y }) => {
    return (
      pattern.current.find((dot) => {
        return dot.x === x && dot.y === y;
      }) != null
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderGrant: (event) => {
        let { locationX, locationY } = event.nativeEvent;

        let activeDotIndex = getDotIndex(
          { x: locationX, y: locationY },
          grid.current,
          30
        );

        if (activeDotIndex != null) {
          let activeDotCoordinate = { ...grid.current[activeDotIndex] };
          let firstDot = mappedGridIndex.current[activeDotIndex];

          pathRef.current = {
            activeDotCoordinate,
            initialGestureCoordinate: activeDotCoordinate,
          };

          console.log(pathRef.current)

          pattern.current = [firstDot];
        }
      },
      onPanResponderMove: (event) => {
        let { locationX, locationY } = event.nativeEvent;

        const { initialGestureCoordinate, activeDotCoordinate } =
          pathRef.current;
          
        if (activeDotCoordinate == null || initialGestureCoordinate == null) {
          return;
        }

        let matchedDotIndex = getDotIndex({ x: locationX, y: locationY }, grid.current, 40);

        const matchedDot =
          matchedDotIndex != null && mappedGridIndex.current[matchedDotIndex];

        if (
          matchedDotIndex != null &&
          matchedDot &&
          !_isAlreadyInPattern(matchedDot) &&
          activeDotCoordinate.color === grid.current[matchedDotIndex].color
        ) {
          const newMatch = { x: matchedDot.x, y: matchedDot.y };
          pattern.current = pattern.current.concat(newMatch);
          pathRef.current.activeDotCoordinate = grid.current[matchedDotIndex];
        }
        setActiveDotCoordinate({
          ...pathRef.current.activeDotCoordinate,
          x2: locationX,
          y2: locationY,
        });
      },
      onPanResponderRelease: () => {
        pathRef.current = {};
        setActiveDotCoordinate({});
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} style={{
      display: "flex",
      flex: 1,
      justifyContent: "center",
      ...StyleSheet.absoluteFill,
    }}>
      <View>
        <Svg width={width} height={height * 0.8}>
          {grid.current && grid.current.map((dot, i) => (
            <GridItem key={i} item={dot} />
          ))}
        </Svg>
        <View style={{ position: "absolute", zIndex: Number.MIN_SAFE_INTEGER }}>
          <Svg width={width} height={height * 0.8}>
            <Pattern items={pattern.current} grid={grid.current} mappedGridIndex={mappedGridIndex.current} />
            <ActiveLine activeDotCoordinate={activeDotCoordinate} />
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default GestureRecorder;
