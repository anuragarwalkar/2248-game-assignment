import { useRef, useState } from "react";
import gridGenerator from './gridGenerator';

function useGridGenerator() {
  const [_grid, setGridData] = useState(gridGenerator.generateGrid());
  const grid = useRef(_grid);
  const mappedGridIndex = useRef(gridGenerator.generateMappedGrid());
  
  const resetGrid = () => {
    const data = gridGenerator.generateGrid();
    setGridData(data);
    grid.current = data;
  }

  return { grid, resetGrid, mappedGridIndex, setGridData };
}

export default useGridGenerator;
