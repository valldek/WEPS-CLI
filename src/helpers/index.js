export const formatLargeNumber = (num) => {
  let formattedNumber = num;
  if (!Number.isFinite(formattedNumber)) {
    // if string change it to number else locale will not work
    return typeof formattedNumber
  }

  return formattedNumber.toLocaleString('en-GB');
}