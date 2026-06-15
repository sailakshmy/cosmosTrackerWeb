"use client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import DatePicker from "../components/DatePicker";
import { addDays, toDate } from "date-fns";

const NeoScreen = ({}) => {
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
            title="Near Earth Objects"
            subtitle="Track close approaches and orbital neighbors"
            description="Explore asteroid and comet activity near Earth with a compact card designed to match the Cosmos Tracker light and dark themes."
          />
          <Card
            title="Near Earth Objects 2"
            subtitle="Track close approaches and orbital neighbors"
            description="Explore asteroid and comet activity near Earth with a compact card designed to match the Cosmos Tracker light and dark themes."
          />
          <Card
            title="Near Earth Objects 2"
            subtitle="Track close approaches and orbital neighbors"
            description="Explore asteroid and comet activity near Earth with a compact card designed to match the Cosmos Tracker light and dark themes."
          />
        </div>
      </section>
    </main>
  );
};

export default NeoScreen;
