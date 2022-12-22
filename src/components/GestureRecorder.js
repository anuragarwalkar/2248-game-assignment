import { useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { Line, Rect, Svg, Text } from "react-native-svg";
import RandomNumbersGenerator from "../hooks/gridGenerator";
import getDotIndex, { getDimenssions } from "../utils/utils";

const { height, width } = getDimenssions();
const {dots: _dots, mappedDotsIndex: _mappedDotsIndex} = new RandomNumbersGenerator(6, 4, [2, 4, 8], {
  2: "red",
  4: "blue",
  8: "green",
}).generate();

const GestureRecorder = () => {
  const pathRef = useRef({});
  const pattern = useRef([]);
  const [activeDotCoordinate, setActiveDotCoordinate] = useState({});
  const lineRef = useRef();

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
          _dots,
          30
        );

        if (activeDotIndex != null) {
          let activeDotCoordinate = { ..._dots[activeDotIndex] };
          let firstDot = _mappedDotsIndex[activeDotIndex];

          pathRef.current = {
            activeDotCoordinate,
            initialGestureCoordinate: activeDotCoordinate,
          };

          pattern.current = [firstDot];

          setActiveDotCoordinate({
            ...activeDotCoordinate,
          });
        }
      },
      onPanResponderMove: (event, gestureState) => {
        let { locationX, locationY } = event.nativeEvent;
        // let { dx, dy } = gestureState;

        let { initialGestureCoordinate, activeDotCoordinate } = pathRef.current;

        if (activeDotCoordinate == null || initialGestureCoordinate == null) {
          return;
        }

        // let endGestureX = initialGestureCoordinate.x + dx;
        // let endGestureY = initialGestureCoordinate.y + dy;

        let matchedDotIndex = getDotIndex(
          { x: locationX, y: locationY },
          _dots
        );

        const matchedDot =
          matchedDotIndex != null && _mappedDotsIndex[matchedDotIndex];

        if (
          matchedDotIndex != null &&
          matchedDot &&
          !_isAlreadyInPattern(matchedDot) &&
          activeDotCoordinate.color === _dots[matchedDotIndex].color
        ) {
          const newMatch = { x: matchedDot.x, y: matchedDot.y };
          pattern.current = pattern.current.concat(newMatch);
          setActiveDotCoordinate(_dots[matchedDotIndex]);
        } else {
          setActiveDotCoordinate({
            ...activeDotCoordinate,
            x2: locationX,
            y2: locationY,
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
        display: "flex",
        flex: 1,
        justifyContent: "center",
        ...StyleSheet.absoluteFill,
      }}
    >
      <View>
        <Svg width={width} height={height * 0.8}>
          {_dots.map((dot, i) => (
            <Svg key={i}>
              <Rect
                x={dot.x}
                y={dot.y}
                rx={20}
                width={70}
                height={70}
                fill={dot.color}
              />
              <Text
                x={dot.x + 35}
                y={dot.y + 50}
                fill="white"
                fontSize="42"
                textAnchor="middle"
              >
                {dot.value}
              </Text>
            </Svg>
          ))}
        </Svg>
        <View style={{ position: "absolute", zIndex: -2000 }}>
          <Svg width={width} height={height * 0.8}>
            {pattern.current.map((startCoordinate, index) => {
              if (index === pattern.current.length - 1) {
                return;
              }
              let startIndex = _mappedDotsIndex.findIndex((dot) => {
                return (
                  dot.x === startCoordinate.x && dot.y === startCoordinate.y
                );
              });

              let endCoordinate = pattern.current[index + 1];
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
                  x1={actualStartDot.x + 35}
                  y1={actualStartDot.y + 35}
                  x2={actualEndDot.x + 35}
                  y2={actualEndDot.y + 35}
                  stroke={actualStartDot.color}
                  strokeWidth="25"
                />
              );
            })}

            {activeDotCoordinate ? (
              <Line
                ref={lineRef}
                x1={activeDotCoordinate.x1}
                y1={activeDotCoordinate.y1}
                x2={activeDotCoordinate.x2}
                y2={activeDotCoordinate.y2}
                stroke={activeDotCoordinate.color}
                strokeWidth="25"
              />
            ) : null}
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default GestureRecorder;
