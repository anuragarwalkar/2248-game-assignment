import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import GestureRecorder from "./src/components/GestureRecorder";
import Svg, { Polyline } from "react-native-svg";
import Grid from './src/components/Grid/Grid';

function GestureResponderWithSvg() {
  const { width, height } = Dimensions.get("window");
  const [path, setPath] = useState([]);
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");

  const onPathChanged = (updatedPath) => {
    setPath(updatedPath);
    console.log('updatedPath:', updatedPath)
  };

  return (
    <View style={styles.container}>
        <Grid />
        <GestureRecorder onPathChanged={onPathChanged} >
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
            <Polyline points={points} fill="none" stroke="red" strokeWidth="10" />
          </Svg>
      </GestureRecorder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7C3",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

export default GestureResponderWithSvg;
