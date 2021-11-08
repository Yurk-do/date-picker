export const validateYear = (date) => {
  //   const pattern = /^(19|20)\d{2}\-(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])$/;
  const pattern = /^(19|20)\d{2}$/;
  console.log(pattern.test(date));
  return pattern.test(date.slice(0, -2));
};
export const validateMonth = (date) => {
  const pattern = /^(0[1-9]|1[0-2])$/;
  console.log(pattern.test(date));
  return pattern.test(date.slice(5, 7));
};
export const validateDay = (date) => {
  const pattern = /^(0[1-9]|1\d|2\d|3[01])$/;
  console.log(pattern.test(date));
  return pattern.test(date.slice(8));
};
