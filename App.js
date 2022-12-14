import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import gridGenerator from "./src/gridGenerator";
import { getCurrentHeight } from "./src/utils";



export default function App() {
  const [grid] = useState(gridGenerator.generate());

  return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <FlatList data={grid} numColumns={4} renderItem={({item}) => {
            return <View
                key={item.key}
                style={{ ...styles.box, backgroundColor: item.color }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>{item.value}</Text>
              </View>
          }} />
        </View>
      </View>
  );
}

const height = getCurrentHeight();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE7C3',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  innerContainer: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    padding: 5, 
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    flex: 1,
    margin: 15,
    height: height * 0.08
  },
});
