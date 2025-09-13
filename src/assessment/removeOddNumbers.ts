

const removeOddNumbers = (arr: number[]): number[] => {
    return arr.filter(num => num % 2 === 0);
  };

export default removeOddNumbers;