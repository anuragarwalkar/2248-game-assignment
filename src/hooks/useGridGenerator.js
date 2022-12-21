import { useState } from "react";
import RandomNumbersGenerator from './gridGenerator';

function useGridGenerator() {
  const generate = () => {
   return new RandomNumbersGenerator(6, 4, [2, 4, 8], {
      2: "red",
      4: "blue",
      8: "green",
    }).generate();
  }

  const [{grid, mappedDotsIndex}, setGridData] = useState(() => generate());

  const resetGrid = () => {
    setGridData(generate());
  };

  return {grid, resetGrid, mappedDotsIndex};
}

export default useGridGenerator;
