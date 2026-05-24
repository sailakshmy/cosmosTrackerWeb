import { CSSProperties, Dispatch, SetStateAction } from "react";
import { fetchISOStringDate } from "../utilities/helper";

interface DatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  darkTheme: boolean;
}

const DatePicker = ({ date, setDate, darkTheme }: DatePickerProps) => {
  const currentDate = fetchISOStringDate(date);
  const onChangeDate = (event) => {
    const selectedDate = new Date(event?.target?.value);
    if (!Number.isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
    }
  };
  const inputStyle: CSSProperties = {
    width: "95%",
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: darkTheme ? "#334155" : "#cbd5e1",
    backgroundColor: darkTheme ? "#0f172a" : "#ffffff",
    color: darkTheme ? "#f8fafc" : "#0f172a",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "22px",
    padding: "10px 14px",
    colorScheme: darkTheme ? "dark" : "light",
    outline: "none",
    boxShadow: darkTheme
      ? "0 1px 0 rgba(255,255,255,0.04) inset"
      : "0 1px 2px rgba(15,23,42,0.08)",
    WebkitAppearance: "none",
  };

  return (
    <>
      <input
        type="date"
        value={currentDate}
        max={fetchISOStringDate(new Date())}
        onChange={onChangeDate}
        style={inputStyle}
        id="date-picker"
      />
    </>
  );
};

export default DatePicker;
