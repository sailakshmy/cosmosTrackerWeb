"use client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import DatePicker from "../components/DatePicker";
import { addDays, toDate } from "date-fns";
import { NearEarthObject } from "../utilities/types";
import { convertEpochDateToMonthDateYearFormat } from "../utilities/helper";

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
  const maxEndDate = new Date();
  maxEndDate.setDate(startDate.getDate() + 7);
  const result = addDays(new Date(startDate), 7);
  const [endDate, setEndDate] = useState(toDate(result));

  console.log("Result", result);
  //   console.log("endDate", endDate);

  //   const updateDatesToMax7Days = () => {
  //     maxEndDate.setDate(startDate.getDate() + 7);
  //     console.log("EndDateWeek", maxEndDate);
  //     setEndDate(maxEndDate);
  //   };

  //   useEffect(() => {
  //     updateDatesToMax7Days();
  //   }, [startDate]);

  const onStartDateChange = (selectedDate: Date) => {
    console.log("changed start date");
    setStartDate(selectedDate);
  };
  const onEndDateChange = (selectedDate: Date) => {
    console.log("changed end date");
    setEndDate(selectedDate);
    // result = addDays(new Date(selectedDate), 0);
  };
  return (
    <main className="cosmos-home">
      <section className="cosmos-card">
        <div className="cosmos-heading">
          <p className="cosmos-kicker">Objects Near Our Big Blue</p>
          <div className="gap-4 flex">
            <DatePicker date={startDate} setDate={onStartDateChange} />
            -
            <DatePicker
              date={endDate}
              setDate={onEndDateChange}
              maxDate={maxEndDate}
            />
          </div>
        </div>
        <div className="flex gap-4">
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
