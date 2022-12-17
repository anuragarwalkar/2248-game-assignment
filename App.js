import { StyleSheet, View } from "react-native";
import React from "react";
import GestureRecorder from "./src/components/GestureRecorder";

function App() {
  return (
    <View style={styles.container}>
      <GestureRecorder />
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
