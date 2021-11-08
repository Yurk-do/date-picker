import { FC } from 'react';
import './dateItem.css';

interface DateItemProps {
  dayNumber: any;
  date: any;
  isActive?: string;
  selectDay: (dateItemNumber: string) => void;
  startDayIsActive: string;
  daysOfRangeIsActive: string;
  isDisabled: boolean;
  firstDayOfRange: string;
  lastDayOfRange: string;
  otherMonth: string;
}

const DateItem: FC<DateItemProps> = ({
  dayNumber,
  date,
  isActive,
  selectDay,
  startDayIsActive,
  daysOfRangeIsActive,
  isDisabled,
  firstDayOfRange,
  lastDayOfRange,
  otherMonth,
}) => {
  return (
    <div
      className={`date-item ${daysOfRangeIsActive} ${firstDayOfRange} ${lastDayOfRange}`}
    >
      <div className='date-item-button-container'>
        <button
          className={`date-item-button ${isActive} ${startDayIsActive} ${lastDayOfRange} ${otherMonth}`}
          onClick={() => selectDay(date)}
          disabled={isDisabled}
        >
          {dayNumber}
        </button>
      </div>
    </div>
  );
};

export default DateItem;
