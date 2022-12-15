import { FlatList, View } from "react-native";
import useGridGenerator from "../hooks/useGridGenerator";
import { gridStyles } from "./styles";

function Grid() {
  const [grid] = useGridGenerator();

  return (
    <View style={gridStyles.innerContainer}>
      <FlatList
        data={grid}
        numColumns={4}
        scrollEnabled={false}
        renderItem={({ item }) => <GridItem {...item} />}
      />
    </View>
  );
}

export default Grid;
