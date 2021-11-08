import { useEffect, useState } from 'react';
import Calendar from '../calendar/Calendar';
import './calendarInputs.css';
import { formatInputDate } from '../../helpers/formatDate';
import moment from 'moment';
import { inputDateType } from '../../types/types';

const CalendarInputs = () => {
  const now = moment();

  const [calendarStatus, setCalendarStatus] = useState(false);
  const [dateNotValid, setDateNotValid] = useState({ status: false, date: '' });

  const [selectedMonth, setSelectedMonth] = useState(now);

  const [inputDate, setInputDate] = useState<inputDateType>({
    startDate: '',
    endDate: '',
  });

  const changeCalendarStatus = () => {
    if (!calendarStatus) {
      setCalendarStatus(true);
    }
  };

  const closeCalendar = () => {
    console.log('hello')
    setCalendarStatus(false);
  };

  const changeInputDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = formatInputDate(event.target.value);

    setDateNotValid({ status: false, date: '' });

    if (date.length === 10) {
      moment(date).isValid()
        ? setSelectedMonth(moment(date))
        : setDateNotValid({ status: true, date: date });
    }
    if (event.target.dataset.startInput) {
      setInputDate((previousDate: inputDateType) => ({
        ...previousDate,
        startDate: date,
      }));
    } else {
      setInputDate((previousDate: inputDateType) => ({
        ...previousDate,
        endDate: date,
      }));
    }
  };

  useEffect(() => {}, [selectedMonth, inputDate, dateNotValid]);

  return (
    <div className='main-container-calendar-container'>
      {calendarStatus && (
        <div className='button-close-window' onClick={closeCalendar}>
          x
        </div>
      )}
      {dateNotValid.status && (
        <div className='error-message-container'>
          <p> Дата "{dateNotValid.date}" не корректна</p>
        </div>
      )}
      <div className='calendar-inputs-container'>
        <div className='calendar-input-container'>
          <input
            className={`calendar-input ${
              dateNotValid.status ? 'not-valid' : ''
            }`}
            type='text'
            onFocus={changeCalendarStatus}
            placeholder='yyyy-mm-dd'
            value={inputDate.startDate}
            onChange={changeInputDate}
            data-start-input
          />
        </div>
        <div className='delimiter'>
          <p>to</p>
        </div>
        <div className='calendar-input-container'>
          <input
            className={`calendar-input ${
              dateNotValid.status ? 'not-valid' : ''
            }`}
            type='text'
            onFocus={changeCalendarStatus}
            placeholder='yyyy-mm-dd'
            value={inputDate.endDate}
            onChange={changeInputDate}
            data-end-input
          />
        </div>
      </div>
      {calendarStatus && (
        <Calendar
          inputDate={inputDate}
          setInputDate={setInputDate}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      )}
    </div>
  );
};

export default CalendarInputs;
