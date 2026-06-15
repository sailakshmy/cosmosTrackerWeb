import { ChangeEvent } from "react";
import { fetchISOStringDate } from "../utilities/helper";

interface DatePickerProps {
  date: Date;
  setDate: (selectedDate: Date) => void;
  maxDate?: Date;
}

const DatePicker = ({ date, setDate, maxDate }: DatePickerProps) => {
  // console.log("maxDate", maxDate);
  // console.log("date", date);
  const currentDate = fetchISOStringDate(date);
  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    if (!Number.isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
    }
  };
  const maximumDate = maxDate
    ? fetchISOStringDate(maxDate)
    : fetchISOStringDate(new Date());
  console.log("maximumDate", maximumDate);
  return (
    <>
      <input
        type="date"
        value={currentDate}
        max={maximumDate}
        onChange={onChangeDate}
        className="cosmos-date-picker"
        id="date-picker"
      />
    </>
  );
};

export default DatePicker;
