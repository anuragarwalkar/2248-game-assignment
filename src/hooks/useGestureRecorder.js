import { useRef, useState } from "react";
import { PanResponder } from "react-native";
import { getIsValidPattern, getGridIndex } from "../utils/utils";

const useGestureRecorder = ({grid, mappedGridIndex, onRelease}) => {
  const pathRef = useRef({});
  const pattern = useRef([]);
  const releaseTiles = useRef({indexes: [], number: 0})
  const [activeDotCoordinate, setActiveDotCoordinate] = useState({});

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
        releaseTiles.current = {indexes: [], number: 0};
        return true;
      },
      onPanResponderGrant: (event) => {
        let { locationX, locationY } = event.nativeEvent;

        let activeDotIndex = getGridIndex(
          { x: locationX, y: locationY },
          grid.current,
          40
        );

        if (activeDotIndex != null) {
          let activeDotCoordinate = { ...grid.current[activeDotIndex] };
          let firstDot = mappedGridIndex.current[activeDotIndex];

          pathRef.current = {
            activeDotCoordinate,
            initialGestureCoordinate: activeDotCoordinate,
          };

          releaseTiles.current.indexes = releaseTiles.current.indexes.concat(activeDotIndex);

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

        let matchedDotIndex = getGridIndex({ x: locationX, y: locationY }, grid.current, 40);

        const matchedDot =
          matchedDotIndex != null && mappedGridIndex.current[matchedDotIndex];

          const isValid = getIsValidPattern(mappedGridIndex.current[initialGestureCoordinate.index], matchedDot)

          

        if (
          matchedDotIndex != null &&
          matchedDot &&
          !_isAlreadyInPattern(matchedDot) &&
          activeDotCoordinate.color === grid.current[matchedDotIndex].color && 
          activeDotCoordinate.value === grid.current[matchedDotIndex].value && 
          isValid
        ) {
          const newMatch = { x: matchedDot.x, y: matchedDot.y };
          pattern.current = pattern.current.concat(newMatch);
          pathRef.current.activeDotCoordinate = grid.current[matchedDotIndex];
          pathRef.current.initialGestureCoordinate = grid.current[matchedDotIndex];
          releaseTiles.current.indexes = releaseTiles.current.indexes.concat(matchedDotIndex);
          releaseTiles.current.number = pathRef.current.activeDotCoordinate.value;
        }
        setActiveDotCoordinate({
          ...pathRef.current.activeDotCoordinate,
          x2: locationX,
          y2: locationY,
        });
      },
      onPanResponderRelease: () => {
        pathRef.current = {};
        pattern.current = [];

        if(releaseTiles.current.indexes.length > 1) {
          onRelease(releaseTiles.current);
        }

        setActiveDotCoordinate({});
      },
    })
  ).current;

  return {activeDotCoordinate, grid, mappedGridIndex, panResponder, pattern};
};

export default useGestureRecorder;
