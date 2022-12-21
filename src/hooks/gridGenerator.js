import uuid from "react-native-uuid";
import { getDimenssions } from "../utils/utils";

class RandomNumbersGenerator {
  numbersToFill = [];
  rows = 0;
  columns = 0;
  colorMapper = {};
  rowsCounter = 1;
  columnsCounter = 1;
  mappedDotsIndex = [];


  constructor(rows, columns,numbers, colorsMapper) {
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
    this.mappedDotsIndex.push([this.columnsCounter - 1, this.rowsCounter - 1]);

    const result =  {
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

  generate() {
    const grid = Array.from({ length: this.rows * this.columns }, this._callback);

    return {grid, mappedDotsIndex: this.mappedDotsIndex}
  }
}

export default RandomNumbersGenerator;
