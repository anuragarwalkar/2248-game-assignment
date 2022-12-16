import { Children, useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

const GestureRecorder = ({ onPathChanged, children }) => {
    const pathRef = useRef([]);
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pathRef.current = [];
        },
        onPanResponderMove: (event) => {
          pathRef.current.push({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
          // Update path real-time (A new array must be created
          // so setState recognises the change and re-renders the App):
          onPathChanged([...pathRef.current]);
        },
        onPanResponderRelease: () => {
          onPathChanged(pathRef.current);
        }
      })
    ).current;
  
    return (
      <View
        style={StyleSheet.absoluteFill}
        {...panResponder.panHandlers}
      >
        {children}
        </View>
    );
  }

  export default GestureRecorder;