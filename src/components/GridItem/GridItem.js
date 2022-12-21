import { useContext, useEffect, useRef } from "react";
import { StyleSheet, View, Text, UIManager, findNodeHandle } from "react-native";
import { GridContext } from "../../context";
import { gridStyles } from "../Grid/styles";
findNodeHandle

function GridItem({ id, value, color: backgroundColor, index }) {
  const { setDots } = useContext(GridContext);
  const boxStyle = { ...gridStyles.box, backgroundColor, position: "relative" };
  const ref = useRef();

  useEffect(() => {

    setTimeout(() => {
      ref.current.measure((x, y, width, height, px, py) => {
        console.log(index, x, y);
      })
    }, 2000);
    

    // setDots((g) => {
    //   // let { height, width, x, y } = layout;
    //   return g.concat({
    //     // height,
    //     // width,
    //     // x,
    //     // y,
    //     // id,
    //     // value,
    //     // color: backgroundColor,
    //     // index,
    //   });
    // });
  }, []);

  return (
    <View
      ref={ref}
      key={id}
      style={boxStyle}
    >
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ text: { color: "white", fontSize: 40 } });

export default GridItem;
