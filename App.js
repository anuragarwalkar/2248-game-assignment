import { StyleSheet, View } from "react-native";
import React from "react";
import GestureRecorder from "./src/hooks/useGestureRecorder";
import Grid from "./src/components/Grid/Grid";

function App() {
  return (
    <View style={styles.container}>
      <Grid />
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

export default App;
