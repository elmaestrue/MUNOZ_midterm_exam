function sumArray(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  
  // Example usage:
  
  console.log(sumArray([1, 2, 3, 4, 5])); // Output: 15
  