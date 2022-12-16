import uuid from "react-native-uuid";

class RandomNumbersGenerator {
  numbersToFill = [];
  length = 0;
  colorMapper = {};

  constructor(length, numbers, colorsMapper) {
    this.length = length;
    this.numbersToFill = numbers;
    this.colorMapper = colorsMapper;
  }

  _getRandomNumberToFill(number) {
    return this.numbersToFill[Math.floor(Math.random() * number)];
  }

  _callback = (_, i) => {
    const randomNumber = this._getRandomNumberToFill(this.numbersToFill.length);

    return {
      value: randomNumber,
      color: this.colorMapper[randomNumber],
      id: uuid.v4(),
      index: i,
    };
  };

  generate() {
    return Array.from({ length: this.length }, this._callback);
  }
}

export default new RandomNumbersGenerator(6 * 4, [2, 4, 8], {
  2: "red",
  4: "blue",
  8: "green",
});
