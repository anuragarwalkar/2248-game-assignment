import uuid from "react-native-uuid";
import { getDimenssions } from "../utils/utils";

class RandomNumbersGenerator {
  numbersToFill = [];
  rows = 0;
  columns = 0;
  colorMapper = {};
  rowsCounter = 1;
  columnsCounter = 1;
  mappedGridIndex = [];


  constructor(rows, columns, numbers, colorsMapper) {
    this.rows = rows;
    this.columns = columns;
    this.numbersToFill = numbers;
    this.colorMapper = colorsMapper;
    const { width, height } = getDimenssions()
    this.width = width;
    this.height = height;
  }

  _getRandomNumberToFill(number) {
    return this.numbersToFill[Math.floor(Math.random() * number)];
  }

  _callback = (_, i) => {
    const randomNumber = this._getRandomNumberToFill(this.numbersToFill.length);
    this.mappedGridIndex.push({x: this.columnsCounter - 1, y: this.rowsCounter - 1});

    const x = Math.floor((this.width / 4) * this.columnsCounter) - this.width * 0.21;
    const y =  Math.floor((this.height * 0.7) / this.rows * this.rowsCounter);

    const result =  {
      x,
      y,
      x1: x + 35,
      y1: y + 35,
      value: randomNumber,
      color: this.colorMapper[randomNumber],
      id: uuid.v4(),
      index: i,
    };

    if(this.columnsCounter === this.columns) {
      this.rowsCounter++;
    }

    if(this.columnsCounter === this.columns) {
      this.columnsCounter = 1;
    }else {
      this.columnsCounter++;
    }

    return result;
  };

  generateGrid() {
    return Array.from({ length: this.rows * this.columns }, this._callback);
  }

  generateMappedGrid() {
    return this.mappedGridIndex;
  }
}

export default RandomNumbersGenerator;