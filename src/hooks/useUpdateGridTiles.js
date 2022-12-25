import { useContext } from "react";
import { GridContext } from "../context";
import gridGenerator from "./gridGenerator";

function useUpdateGridTiles() {
  const { setScore, setGridData } = useContext(GridContext);

  const updateCrossedTiles = (data) => {
    setGridData((prevGridData) => {
      const lastIndex = data.indexes.pop();

      for (let index = 0; index < data.indexes.length; index++) {
        const randomNumber = gridGenerator.getRandomNumber();
        prevGridData[data.indexes[index]].value = randomNumber;
        prevGridData[data.indexes[index]].color =
          gridGenerator.getColorByNumber(randomNumber);
      }

      data.indexes.push(lastIndex);

      const multiplyBy = data.indexes.length > 4 ? 4 : data.indexes.length;
      const newTileNumber = multiplyBy  * data.number;

      prevGridData[lastIndex].value = newTileNumber;
      prevGridData[lastIndex].color =
        gridGenerator.getColorByNumber(newTileNumber);

      return prevGridData;
    });
  };

  const onUpdate = (data) => {
    setScore((s) => s + (data.indexes.length - 2) * data.number);
    updateCrossedTiles(data);
  };

  return { onUpdate };
}

export default useUpdateGridTiles;
