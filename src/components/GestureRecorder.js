import { useContext, useRef, useState } from "react";
import { PanResponder, View, StyleSheet } from "react-native";
import { Rect, Svg, Line } from "react-native-svg";
import { GridContext } from "../context";
import getDotIndex, { getDimenssions } from "../utils/utils";
import Grid from "./Grid/Grid";

const { width, height } = getDimenssions();

const GestureRecorder = ({ children }) => {
  const {dots: _dots} = useContext(GridContext);
  const pathRef = useRef({});
  const [pattern, setPattern] = useState([]);
  //  "x": 15, "x2": 195.15814208984375, "y": 15, "y2": 185.56150817871094
  const [activeDotCoordinate, setActiveDotCoordinate] = useState({});
  const lineRef = useRef();

  const _isAlreadyInPattern = ({ x, y }) => {
    return (
      pattern.find((dot) => {
        return dot.x === x && dot.y === y;
      }) != null
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event) => {
        return true;
      },
      onPanResponderGrant: (event) => {
        let { locationX, locationY } = event.nativeEvent;

        console.log(_dots.current);

        console.log('x', locationX, 'y', locationY);

        let activeDotIndex = getDotIndex(
          { x: locationX, y: locationY },
          _dots.current,
          10
        );

        // console.log('activeDotIndex:', activeDotIndex);
        
        if (activeDotIndex != null) {
          let activeDotCoordinate = _dots.current[activeDotIndex];
          // let firstDot = _mappedDotsIndex[activeDotIndex];

          pathRef.current = {
            activeDotCoordinate,
            initialGestureCoordinate: activeDotCoordinate,
          };

          setActiveDotCoordinate({
            ...activeDotCoordinate,
          });
        }
      },
      onPanResponderMove: (_, gestureState) => {
        let { dx, dy } = gestureState;

        let { initialGestureCoordinate, activeDotCoordinate } = pathRef.current;

        if (activeDotCoordinate == null || initialGestureCoordinate == null) {
          return;
        }

        let endGestureX = initialGestureCoordinate.x + dx;
        let endGestureY = initialGestureCoordinate.y + dy;

        // let matchedDotIndex = getDotIndex(
        //   { x: endGestureX, y: endGestureY },
        //   _dots
        // );

        // const matchedDot =
        //   matchedDotIndex != null && _mappedDotsIndex[matchedDotIndex];

        // if (
        //   matchedDotIndex != null &&
        //   matchedDot &&
        //   !_isAlreadyInPattern(matchedDot)
        // ) {
        //   const newMatch = { x: matchedDot.x, y: matchedDot.y };
        //   setPattern((p) => p.concat(newMatch));
        //   setActiveDotCoordinate(_dots[matchedDotIndex]);
        // } else {

          setActiveDotCoordinate({
            ...activeDotCoordinate,
            x2: endGestureX,
            y2: endGestureY,
          });
          
        // }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View >
      <View {...panResponder.panHandlers} style={{ height: 599, width: 388, left: 20, top: 220, position: 'absolute', zIndex: 2000 }} />
      <View style={{ height: 599, width: 388, left: 20, top: 220, position: 'absolute', zIndex: -100}}>
        <Grid />
      </View>
      <View style={{ height: 570, width: 388, left: 20, top: 200, position: 'absolute', zIndex: -2000 }}> 
      <Svg width={width} height={height}>
        {pattern.map((startCoordinate, index) => {
          if (index === pattern.length - 1) {
            return;
          }
          let startIndex = _mappedDotsIndex.findIndex((dot) => {
            return dot.x === startCoordinate.x && dot.y === startCoordinate.y;
          });
          let endCoordinate = pattern[index + 1];
          let endIndex = _mappedDotsIndex.findIndex((dot) => {
            return dot.x === endCoordinate.x && dot.y === endCoordinate.y;
          });
          if (startIndex < 0 || endIndex < 0) {
            return;
          }
          
          const actualStartDot = _dots[startIndex];
          const actualEndDot = _dots[endIndex];

          return (
            <Line
              key={`fixedLine${index}`}
              x1={actualStartDot.x}
              y1={actualStartDot.y}
              x2={actualEndDot.x}
              y2={actualEndDot.y}
              stroke="red"
              strokeWidth="2"
            />
          );
        })}

          {activeDotCoordinate ? <Line
            ref={lineRef}
            x1={activeDotCoordinate.x}
            y1={activeDotCoordinate.y}
            x2={activeDotCoordinate.x2}
            y2={activeDotCoordinate.y2}
            stroke={'red'}
            strokeWidth="25"
          /> : null}

      </Svg>
      </View>
    </View>
  );
};

export default GestureRecorder;
