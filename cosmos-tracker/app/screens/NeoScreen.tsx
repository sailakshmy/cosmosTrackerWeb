"use client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { addDays, toDate } from "date-fns";
import { NearEarthObject } from "../utilities/types";
import { convertEpochDateToMonthDateYearFormat } from "../utilities/helper";
import DateRangePickerComponent from "../components/DateRangePicker";
import Tooltip from "../components/Tooltip";

interface NeoScreenProps {
  totalNeos: number;
  hazardousNeos: number;
  objectClosestToEarth: NearEarthObject;
  highestVelocityObject: NearEarthObject;
}

const NeoScreen = ({
  totalNeos,
  hazardousNeos,
  objectClosestToEarth,
  highestVelocityObject,
}: NeoScreenProps) => {
  const [startDate, setStartDate] = useState(new Date());

  const rangeEndDate = addDays(new Date(startDate), 7);
  // console.log("maxEndDate", maxEndDate);
  console.log("rangeEndDate", rangeEndDate);
  const [endDate, setEndDate] = useState(toDate(rangeEndDate));
  const [endDateGreaterThanExpectedRange, setEndDateGreaterThanExpectedRange] =
    useState(false);

  const onDateRangeChange = (selectedDate: Date, selectedEndDate: Date) => {
    setStartDate(selectedDate);
    setEndDate(selectedEndDate);
    if (selectedEndDate > addDays(new Date(selectedDate), 7)) {
      setEndDateGreaterThanExpectedRange(true);
    } else setEndDateGreaterThanExpectedRange(false);
  };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] w-full flex-1 items-start justify-center overflow-x-hidden bg-cosmos-night px-4 py-6 sm:px-6 lg:min-h-[calc(100vh-72px)] lg:px-8 lg:py-10">
      <section className="relative z-10 flex w-full max-w-6xl flex-col gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-8 sm:rounded-2xl sm:p-6 lg:p-8 dark:border-slate-800 dark:bg-cosmos-panel">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-1.5">
            <p className="cosmos-kicker">Objects Near Our Big Blue</p>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <DateRangePickerComponent
              startDate={startDate}
              endDate={endDate}
              onChangeDateRange={onDateRangeChange}
              maximumEndDate={rangeEndDate}
            />
            {endDateGreaterThanExpectedRange && (
              <Tooltip message="Please select a date range that is within 7 days" />
            )}
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card
            title={`${totalNeos}`}
            subtitle="A total of"
            description="Objects came close to Earth during this period"
          />
          {hazardousNeos > 0 && (
            <Card
              title={`${hazardousNeos}`}
              subtitle={`Out of ${totalNeos}`}
              description={`${hazardousNeos > 1 ? "were" : "was"} potentially hazardous to us`}
            />
          )}
          <Card
            title={`${objectClosestToEarth?.name}  on ${convertEpochDateToMonthDateYearFormat(objectClosestToEarth?.epoch_date_close_approach)}`}
            subtitle="The object that was closest to us during this period was the"
            description={`at a distance of ${
              objectClosestToEarth?.miss_distance?.kilometers
            } km (${objectClosestToEarth?.miss_distance?.miles} miles)`}
          />
          <Card
            title={`${highestVelocityObject?.name}`}
            subtitle="The object with the highest velocity during this period"
            description={`at a velocity of ${
              highestVelocityObject?.relative_velocity?.kilometers_per_hour
            } kmph (${highestVelocityObject?.relative_velocity?.miles_per_hour} mph)`}
          />
        </div>
      </section>
    </main>
  );
};

export default NeoScreen;
