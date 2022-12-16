import Svg, { Line } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import Grid from "./src/components/Grid/Grid";
import React, { useState } from "react";
import GestureRecorder from "./src/components/GestureRecorder";
import { getDimenssions } from "./src/utils/utils";

const { width, height } = getDimenssions();

function App() {
  const [path, setPath] = useState({});

  const onPathChanged = (updatedPath) => {
    setPath(updatedPath);
  };

  return (
    <View style={styles.container}>
      <GestureRecorder onPathChanged={onPathChanged} />
      <Grid />
      <View style={{width, height, position: 'absolute', zIndex: -100}} >
        <Svg >
          <Line
            x1={path.startX}
            y1={path.startY}
            x2={path.endX}
            y2={path.endY}
            stroke="red"
            strokeWidth="14"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7C3",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
});

export default App;
