import DateRangePicker, {
  type DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";

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
  const handleChange: NonNullable<DateRangePickerProps["onChange"]> = (
    value,
  ) => {
    if (!Array.isArray(value)) {
      return;
    }

    const [nextStartDate, nextEndDate] = value;

    if (nextStartDate && nextEndDate) {
      onChangeDateRange(nextStartDate, nextEndDate);
    }
  };

  return (
    <DateRangePicker
      calendarAriaLabel="Open date range calendar"
      className="cosmos-date-range-picker"
      clearIcon={null}
      dayAriaLabel="Day"
      format="y-MM-dd"
      maxDate={maximumEndDate}
      monthAriaLabel="Month"
      onChange={handleChange}
      rangeDivider={
        <span className="cosmos-date-range-picker__divider">to</span>
      }
      value={[startDate, endDate]}
      yearAriaLabel="Year"
    />
  );
};

export default DateRangePickerComponent;
