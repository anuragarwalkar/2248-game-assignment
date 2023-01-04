import { useContext } from "react";
import { GridContext } from "../context";
import gridGenerator from "./gridGenerator";

function useUpdateGridTiles() {
  const { setScore, setGridData, setShowModal } = useContext(GridContext);

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

      let total = data.indexes.length * data.number;
      const poweOf = Math.log2(total)
      const isPowerOfTwo = poweOf % 1 === 0;
      
      if(!isPowerOfTwo) {
        total =  Math.pow(2, Math.floor(poweOf));
      }

      prevGridData[lastIndex].value = total;
      prevGridData[lastIndex].color =
      gridGenerator.getColorByNumber(total);

      if(total >= 2048) {
        setShowModal(true);
      }

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
