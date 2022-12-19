import { useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { Line, Rect, Svg } from "react-native-svg";
import RandomNumbersGenerator from "../hooks/gridGenerator";
import getDotIndex, { getDimenssions } from "../utils/utils";

const { height, width } = getDimenssions();
const [_dots, _mappedDotsIndex] = new RandomNumbersGenerator(6, 4, [2, 4, 8], {
  2: "red",
  4: "blue",
  8: "green",
}).generate();

const GestureRecorder = () => {
  const pathRef = useRef({});
  const [pattern, setPattern] = useState([]);
  const [activeDotCoordinate, setActiveDotCoordinate] = useState({});
  const lineRef = useRef();

  const _isAlreadyInPattern = ({x, y}) => {
    console.log('pattern:', pattern);
    return pattern.find(dot => {
      return dot.x === x && dot.y === y;
    }) != null;
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderGrant: (event) => {
        let { locationX, locationY } = event.nativeEvent;

        let activeDotIndex = getDotIndex(
          { x: locationX, y: locationY },
          _dots,
          60
        );

        if (activeDotIndex != null) {
          let activeDotCoordinate = _dots[activeDotIndex];
          let firstDot = _mappedDotsIndex[activeDotIndex];

          pathRef.current = {
            activeDotCoordinate,
            initialGestureCoordinate: activeDotCoordinate,
            pattern: [firstDot],
          };

          setActiveDotCoordinate({
            ...activeDotCoordinate,
          });
        }
      },
      onPanResponderMove: (e, gestureState) => {
        let { dx, dy } = gestureState;

        let { initialGestureCoordinate, activeDotCoordinate } = pathRef.current;

        if (activeDotCoordinate == null || initialGestureCoordinate == null) {
          return;
        }

        let endGestureX = initialGestureCoordinate.x + dx;
        let endGestureY = initialGestureCoordinate.y + dy;

        let matchedDotIndex = getDotIndex(
          { x: endGestureX, y: endGestureY },
          _dots
        );

        const matchedDot =
          matchedDotIndex != null && _mappedDotsIndex[matchedDotIndex];

        if (
          matchedDotIndex != null &&
          matchedDot &&
          !_isAlreadyInPattern(matchedDot)
        ) {
          const newMatch = { x: matchedDot.x, y: matchedDot.y };
          setPattern((p) => p.concat(newMatch));
          setActiveDotCoordinate(_dots[matchedDotIndex]);
        } else {
          setActiveDotCoordinate({
            ...activeDotCoordinate,
            x2: endGestureX,
            y2: endGestureY,
          });
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        ...StyleSheet.absoluteFill,
        display: "flex",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View>
        <Svg width={width} height={height * 0.7}>
          {_dots.map((dot, i) => (
            <Rect
              key={i}
              x={dot.x}
              y={dot.y}
              rx={20}
              width={60}
              height={60}
              fill={dot.color}
            />
          ))}

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

          {activeDotCoordinate ? (
            <Line
              ref={lineRef}
              x1={activeDotCoordinate.x}
              y1={activeDotCoordinate.y}
              x2={activeDotCoordinate.x2}
              y2={activeDotCoordinate.y2}
              stroke={activeDotCoordinate.color}
              strokeWidth="25"
            />
          ) : null}
        </Svg>
      </View>
    </View>
  );
};

export default GestureRecorder;
