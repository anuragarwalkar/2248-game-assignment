import { FlatList, View } from "react-native";
import useGridGenerator from "../../hooks/useGridGenerator";
import { gridStyles } from "./styles";
import GridItem from '../GridItem/GridItem';

function Grid(props) {
  const {grid} = useGridGenerator();

  return (
    <View style={gridStyles.innerContainer} {...props}>
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
