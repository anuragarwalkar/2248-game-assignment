import { useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import {  Line, Rect, Svg } from "react-native-svg";
import RandomNumbersGenerator from "../hooks/gridGenerator";
import getDotIndex, { getDimenssions } from "../utils/utils";

const { height, width } = getDimenssions();
const [_dots, _mappedDotsIndex]  = new RandomNumbersGenerator(6, 4, [2, 4, 8], {
  2: "red",
  4: "blue",
  8: "green",
}).generate();;

const GestureRecorder = () => {
  const [pathRef, setPathRef] = useState({});
  const node = useRef();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        console.log('asd');
        return true
      },
      onPanResponderGrant: (event) => {
        let { locationX, locationY } = event.nativeEvent;
        let activeDotIndex = getDotIndex({ x: locationX, y: locationY }, _dots);
        if (activeDotIndex != null) {
          let activeDotCoordinate = _dots[activeDotIndex];
          let firstDot = _mappedDotsIndex[activeDotIndex];
          
          setPathRef({
            activeDotCoordinate,
            initialGestureCoordinate: activeDotCoordinate,
            pattern: [firstDot],
          });
        }
      },
      onPanResponderMove: (event) => {},
      onPanResponderRelease: () => {},
    })
  ).current;
  

  return (
    <View {...panResponder.panHandlers} style={{...StyleSheet.absoluteFill, display: 'flex', justifyContent: 'center'}}>
      <View>
        <Svg width={width} height={height}>
          {_dots.map((dot, i) => (
            <Rect key={i} x={dot.x} y={dot.y} rx={20} width={60} height={60} fill={dot.color} />
          ))}

          {pathRef.activeDotCoordinate ? (
            <Line
              ref={node}
              x1={pathRef.activeDotCoordinate.x}
              y1={pathRef.activeDotCoordinate.y}
              x2={pathRef.activeDotCoordinate.x}
              y2={pathRef.activeDotCoordinate.y}
              stroke="red"
              strokeWidth="2"
            />
          ) : null}
        </Svg>
      </View>
    </View>
  );
};

export default GestureRecorder;