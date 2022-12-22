import { useRef, useState } from "react";
import { PanResponder } from "react-native";
import useGridGenerator from "./useGridGenerator";
import getDotIndex from "../utils/utils";

const useGestureRecorder = () => {
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

  return {activeDotCoordinate, grid, mappedGridIndex, panResponder, pattern};
};

export default useGestureRecorder;
