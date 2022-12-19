import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

const DemoPan = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        console.log('sd');
        return true
        },
      onPanResponderGrant: () => {

      },
      onPanResponderMove: () => {

      },
      onPanResponderRelease: () => {
      }
    })
  ).current;

  return (
    <View style={styles.container}  {...panResponder.panHandlers}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
 
});

export default DemoPan;