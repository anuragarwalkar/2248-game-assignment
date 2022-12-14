import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import gridGenerator from "./src/gridGenerator";

export default function App() {
  const [grid] = useState(gridGenerator.generate());

  return (
    <View style={styles.container}>
      {grid.map((i) => (
        i.map(j => <View key={j.key} style={{ ...styles.box, backgroundColor: j.color }}>
          <Text>{j.value}</Text>
        </View>)
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 50,
    height: 50,
  },
});
