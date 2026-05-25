import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { fetchISOStringDate } from "../utilities/helper";

interface DatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const currentDate = fetchISOStringDate(date);
  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    if (!Number.isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
    }
  };

  return (
    <>
      <input
        type="date"
        value={currentDate}
        max={fetchISOStringDate(new Date())}
        onChange={onChangeDate}
        className="cosmos-date-picker"
        id="date-picker"
      />
    </>
  );
};

export default DatePicker;
