import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import GestureRecorder from "./src/components/GestureRecorder";
import { GridContext } from "./src/context";

function App() {
  const [path] = useState({});
  const [dots, setDots] = useState([]);
  const dotsRef = React.useRef([]);

  React.useEffect(() => {
    dotsRef.current = dots
  },[dots])

  return (
    <GridContext.Provider value={{dots: dotsRef, setDots}}>
      <View style={styles.container}>
        <GestureRecorder />
      </View>
    </GridContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7C3",
    height: '100%',
  },
});

export default App;
