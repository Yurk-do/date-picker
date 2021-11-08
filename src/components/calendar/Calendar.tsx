import { FC, useEffect, useState } from 'react';
import './calendar.css';
import DayOFWeekItem from '../dayOfWeekItem/DayOfWeekItem';
import { arrayDaysOfWeek } from '../../helpers/variables';
import DateItem from '../dateItem/DateItem';
import {
  getAllDays,
  getDayNumber,
  getMonthNumber,
  objectDataIsFull,
  objectDataIsEmpty,
} from '../../helpers/getDate';

import { inputDateType } from '../../types/types';

import moment from 'moment';
// import 'moment/locale/ru';

interface CalendarPropsType {
  inputDate: inputDateType;
  setInputDate: any;
  selectedMonth: any;
  setSelectedMonth: any;
}

const Calendar: FC<CalendarPropsType> = ({
  inputDate,
  setInputDate,
  selectedMonth,
  setSelectedMonth,
}) => {
  const now = moment();

  const today = moment(now.clone().format('YYYY-M-DD'));

  const [allDays, setAllDays] = useState(getAllDays(now));

  const getPreviousMonth = () => {
    setSelectedMonth(selectedMonth.clone().subtract(1, 'month'));
  };

  const getNextMonth = () => {
    setSelectedMonth(selectedMonth.clone().add(1, 'month'));
  };

  useEffect(() => {
    setAllDays(getAllDays(selectedMonth));
  }, [inputDate, selectedMonth]);

  const selectRange = (selectedDate: string) => {
    const firstRangeElement = inputDate.startDate;
    const lastRangeElement = inputDate.endDate;

    if (objectDataIsEmpty(inputDate)) {
      return setInputDate((previousObject: inputDateType) => ({
        ...previousObject,
        startDate: selectedDate,
      }));
    }

    if (!objectDataIsFull(inputDate)) {
      if (
        (inputDate.startDate !== '' &&
          moment(selectedDate).isBefore(firstRangeElement)) ||
        inputDate.endDate !== ''
      ) {
        return setInputDate((previousObject: inputDateType) => ({
          ...previousObject,
          startDate: selectedDate,
        }));
      } else {
        return setInputDate((previousObject: inputDateType) => ({
          ...previousObject,
          endDate: selectedDate,
        }));
      }
    }

    if (objectDataIsFull(inputDate)) {
      if (
        moment(selectedDate).isAfter(firstRangeElement) &&
        moment(selectedDate).isBefore(lastRangeElement)
      ) {
        return setInputDate({
          startDate: selectedDate,
          endDate: '',
        });
      }
      if (moment(selectedDate).isBefore(firstRangeElement)) {
        return setInputDate((previousObject: inputDateType) => ({
          ...previousObject,
          startDate: selectedDate,
        }));
      }
      if (moment(selectedDate).isAfter(lastRangeElement)) {
        return setInputDate((previousObject: inputDateType) => ({
          ...previousObject,
          endDate: selectedDate,
        }));
      }
    }
  };

  return (
    <div className='calendar'>
      <div className='month-year-section'>
        <div onClick={getPreviousMonth} className='month-change-button'>
          prev
        </div>
        <div className='month-year-section-text'>
          <span className='month-name'>
            {selectedMonth.format('MMMM YYYY')}
          </span>
          <span className='year-name'></span>
        </div>
        <div onClick={getNextMonth} className='month-change-button'>
          next
        </div>
      </div>
      <div className='days-of-week-section'>
        {arrayDaysOfWeek.map((dayOfWeek) => (
          <DayOFWeekItem
            dayOfWeekName={dayOfWeek.shortName}
            key={dayOfWeek.fullName}
          ></DayOFWeekItem>
        ))}
      </div>
      <div className='date-section'>
        {allDays.map((date, index) => (
          <DateItem
            isDisabled={!date || today.isAfter(date)}
            dayNumber={date && getDayNumber(date)}
            date={date}
            key={index}
            isActive={today.isSame(date) ? 'active' : ''}
            startDayIsActive={
              date && moment(date).isSame(inputDate.startDate)
                ? 'start-day-active'
                : ''
            }
            otherMonth={
              selectedMonth.format('MM') !== getMonthNumber(date)
                ? 'other-month'
                : ''
            }
            daysOfRangeIsActive={
              moment(date).isAfter(inputDate.startDate) &&
              moment(date).isBefore(inputDate.endDate)
                ? 'range-days-active'
                : ''
            }
            firstDayOfRange={
              objectDataIsFull(inputDate) &&
              moment(date).isSame(inputDate.startDate)
                ? 'start-range-day-active'
                : ''
            }
            lastDayOfRange={
              objectDataIsFull(inputDate) &&
              moment(date).isSame(inputDate.endDate)
                ? 'last-range-day-active'
                : ''
            }
            selectDay={selectRange}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
