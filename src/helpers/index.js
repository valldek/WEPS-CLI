export const formatLargeNumber = (num) => {
  if (!num) return 'N/A';

  let formattedNumber = num;

  if (!Number.isFinite(formattedNumber)) {
    if (formattedNumber === 'N/A') return formattedNumber;

    formattedNumber = parseFloat(formattedNumber)
  }

  return parseFloat(formattedNumber.toFixed(2)).toLocaleString('en-GB');
}

export const sortByThreeFactors = (arr, factor1, factor2, factor3) => {
  return arr.sort(
    function(a, b) {
      if (a[factor1] !== b[factor1])
        return (a[factor1] < b[factor1]) ?
          -1 : 1;
      if (a[factor2] !== b[factor2])
        return (a[factor2] < b[factor2]) ?
          -1 : 1;
      return (a[factor3] < b[factor3]) ?
        -1 : 1;
    }
  )
}