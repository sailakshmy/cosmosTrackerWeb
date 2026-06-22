import DateRangePicker, {
  type DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";
import { useMemo, useState } from "react";

interface DateRangePickerComponentProps {
  startDate: Date;
  endDate: Date;
  maximumEndDate: Date;
  onChangeDateRange: (startDate: Date, endDate: Date) => void;
}

const DateRangePickerComponent = ({
  startDate,
  endDate,
  maximumEndDate,
  onChangeDateRange,
}: DateRangePickerComponentProps) => {
  const [calendarKey, setCalendarKey] = useState(0);

  const handleChange: NonNullable<DateRangePickerProps["onChange"]> = (
    value,
  ) => {
    if (!Array.isArray(value)) return;
    const [nextStartDate, nextEndDate] = value;
    if (nextStartDate && nextEndDate) {
      onChangeDateRange(nextStartDate, nextEndDate);
      // Force remount — resets isOpen to null (not false), removing calendar from DOM
      setCalendarKey((k) => k + 1);
    }
  };

  const dateRange = useMemo(
    () => [startDate, endDate] as [Date, Date],
    [startDate, endDate],
  );

  return (
    <DateRangePicker
      key={calendarKey}
      calendarAriaLabel="Open date range calendar"
      className="cosmos-date-range-picker"
      clearIcon={null}
      dayAriaLabel="Day"
      format="y-MM-dd"
      maxDate={maximumEndDate}
      monthAriaLabel="Month"
      onChange={handleChange}
      openCalendarOnFocus={false}
      rangeDivider={
        <span className="cosmos-date-range-picker__divider">to</span>
      }
      value={dateRange}
      yearAriaLabel="Year"
    />
  );
};

export default DateRangePickerComponent;
