import { FlatList, Text, View } from "react-native";
import useGridGenerator from "../hooks/useGridGenerator";
import { gridStyles } from "./styles";

function Grid() {
  const [grid] = useGridGenerator();

  return (
    <View style={gridStyles.innerContainer}>
      <FlatList
        data={grid}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <View
              key={item.key}
              style={{ ...gridStyles.box, backgroundColor: item.color }}
            >
              <Text style={{ color: "white", fontSize: 40 }}>{item.value}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default Grid;
