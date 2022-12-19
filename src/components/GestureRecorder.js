import { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

const GestureRecorder = ({ onPathChanged, children }) => {
    const pathRef = useRef({
      startX: 50,
      startY: 0,
      endY: 0,
      endX: 0,
    });
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          pathRef.current = {
            startX: event.nativeEvent.locationX,
            startY: event.nativeEvent.locationY,
          };
        },
        onPanResponderMove: (event) => {
          // console.log('event:', event);
          pathRef.current = {
            ...pathRef.current,
            endX: event.nativeEvent.locationX,
            endY: event.nativeEvent.locationY,
          };
          // Update path real-time (A new array must be created
          // so setState recognises the change and re-renders the App):
          onPathChanged(pathRef.current);
        },
        onPanResponderRelease: () => {
          pathRef.current = {
            startX: 0,
            startY: 0,
            endY: 0,
            endX: 0,
          };
          onPathChanged(pathRef.current);
        }
      })
    ).current;
  
    return (
      <View
        {...panResponder.panHandlers}
       >
        {children}
        </View>
    );
  }

  export default GestureRecorder;