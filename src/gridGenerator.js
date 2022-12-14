import uuid from 'react-native-uuid';

class RandomNumberGenerator {
    initialNumbers = [2, 4, 8];
    colorMapper = {
      2: 'red',
      4: 'blue',
      8: 'green',
    }
  
    constructor() {
  
    }
  
    _getRandom(number) {
      return this.initialNumbers[Math.floor(Math.random() * number)];
    }
  
    _callback = () => {
        const value = this._getRandom(this.initialNumbers.length);
  
        return {
          value ,
          color: this.colorMapper[value],
          key: uuid.v4(),
        }
    }
  
    generate() {
      return Array.from({ length: 6 * 4 }, this._callback);
    }
  }

export default new RandomNumberGenerator();
