import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Svg } from "react-native-svg";
import { GridContext } from "../../context";
import useGestureRecorder from "../../hooks/useGestureRecorder";
import useUpdateGridTiles from "../../hooks/useUpdateGridTiles";
import { getDimenssions } from "../../utils/utils";
import ActiveLine from "../ActiveLine";
import GridItem from "../GridItem/GridItem";
import Pattern from "../Pattern/Pattern";

const { height, width } = getDimenssions();

function Grid() {
  const { grid, mappedGridIndex } = useContext(GridContext);
  const { onUpdate } = useUpdateGridTiles();
  const { activeDotCoordinate, pattern, panResponder } = useGestureRecorder({
    grid,
    mappedGridIndex,
    onRelease: onUpdate,
  });

  return (
    <View
    {...panResponder.panHandlers} >
      <Svg width={width} height={height * 0.65}>
        <ActiveLine activeDotCoordinate={activeDotCoordinate} />
        <Pattern
            items={pattern.current}
            grid={grid.current}
            mappedGridIndex={mappedGridIndex.current}
          />
        {grid.current &&
          grid.current.map((dot, i) => <GridItem key={i} item={dot} />)}
      </Svg>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    ...StyleSheet.absoluteFill,
    marginTop: height * 0.28,
  },
  activeLineContainer: {
    position: "absolute",
    zIndex: Number.MIN_SAFE_INTEGER,
  },
});

export default Grid;
