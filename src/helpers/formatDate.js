export const formatInputDate = (date) => {
  if (
    (date.length === 5 && date[4] === '-') ||
    (date.length === 8 && date[7] === '-')
  ) {
    return date.slice(0, -1);
  }
  if (
    (date.length === 5 && date[5] !== '-') ||
    (date.length === 8 && date[8] !== '-')
  ) {
    const lastSymbol = date.slice(-1);
    return date.slice(0, -1) + '-' + lastSymbol;
  }

  if (date.length > 10) {
    return date.slice(0, -1);
  }

  return date;
};
