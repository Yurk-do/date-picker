import { FC } from 'react';
import './dayOfWeekItem.css';

interface DayOFWeekItemProps {
  dayOfWeekName: string;
}

const DayOFWeekItem: FC<DayOFWeekItemProps> = ({ dayOfWeekName }) => {
  return (
    <div className='day-of-week-item'>
      <div className='day-of-week-item-name'>{dayOfWeekName}</div>
    </div>
  );
};

export default DayOFWeekItem;
