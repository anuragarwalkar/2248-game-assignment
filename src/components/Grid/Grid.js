import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Svg } from "react-native-svg";
import { GridContext } from "../../context";
import useGestureRecorder from "../../hooks/useGestureRecorder";
import useUpdateGridTiles from "../../hooks/useUpdateGridTiles";
import { getDimenssions } from "../../utils/utils";
import ActiveLine from "../ActiveLine";
import GridItem from "../GridItem/GridItem";
import Pattern from '../Pattern/Pattern';

const { height, width } = getDimenssions();

function Grid() {
  const { grid, mappedGridIndex } = useContext(GridContext);
  const { onUpdate } = useUpdateGridTiles();
  const { activeDotCoordinate, pattern, panResponder } =
    useGestureRecorder({grid, mappedGridIndex, onRelease: onUpdate});

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        ...StyleSheet.absoluteFill,
      }}
    >
      <View>
        <Svg width={width} height={height * 0.8}>
          {grid.current &&
            grid.current.map((dot, i) => <GridItem key={i} item={dot} />)}
        </Svg>
        <View style={{ position: "absolute", zIndex: Number.MIN_SAFE_INTEGER }}>
          <Svg width={width} height={height * 0.8}>
            <Pattern
              items={pattern.current}
              grid={grid.current}
              mappedGridIndex={mappedGridIndex.current}
            />
            <ActiveLine activeDotCoordinate={activeDotCoordinate} />
          </Svg>
        </View>
      </View>
    </View>
  );
}

export default Grid;
