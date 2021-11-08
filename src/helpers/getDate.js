import moment from 'moment';

export const getAllDays = (date) => {
  const startMonthDay = date.clone().startOf('month').startOf('week');
  const endMonthDay = date.clone().endOf('month').endOf('week');

  let days = [];

  days.push(startMonthDay.format('YYYY-MM-DD'));

  while (
    !moment(startMonthDay.format('YYYY-MM-DD')).isSame(
      endMonthDay.format('YYYY-MM-DD')
    )
  ) {
    startMonthDay.add(1, 'day').format('YYYY-MM-DD');
    days.push(startMonthDay.format('YYYY-MM-DD'));
  }

  return days;
};

export const getDayNumber = (fullDate) => fullDate.split('-')[2];
export const getMonthNumber = (fullDate) => fullDate.split('-')[1];

export const objectDataIsFull = (objectData) =>
  Object.values(objectData).every((value) => value !== '');

export const objectDataIsEmpty = (objectData) =>
  Object.values(objectData).every((value) => value === '');
