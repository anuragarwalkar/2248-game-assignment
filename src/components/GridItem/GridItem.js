import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GridContext } from "../../context";
import { gridStyles } from "../Grid/styles";

function GridItem({ id, value, color: backgroundColor, index }) {
  const [_, setGridData] = useContext(GridContext);
  const boxStyle = { ...gridStyles.box, backgroundColor, position: "relative" };

  return (
    <View
      key={id}
      style={boxStyle}
      onLayout={({ nativeEvent: { layout } }) => {
        setGridData((g) =>
          g.concat({ ...layout, id, value, color: backgroundColor, index })
        );
      }}
    >
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ text: { color: "white", fontSize: 40 } });

export default GridItem;
