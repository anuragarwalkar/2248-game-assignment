import { useRef } from "react";
import RandomNumbersGenerator from "./gridGenerator";

const randomGenerator = new RandomNumbersGenerator(6, 4, [2, 4, 8], {
    2: "red",
    4: "blue",
    8: "green",
});

function useGridGenerator() {
  const grid = useRef(randomGenerator.generateGrid());
  const mappedGridIndex = useRef(randomGenerator.generateMappedGrid());

  const resetGrid = () => {
    grid.current = generate();
  }
  
  return { grid, resetGrid, mappedGridIndex };
}

export default useGridGenerator;
