import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  onChange: (date: Date) => void;
}

export function Calendar({ onChange }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      onSelect={(date) => {
        if (date) {
          onChange(date);
        }
      }}
    />
  );
}