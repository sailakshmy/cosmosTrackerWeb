"use client";

import Card from "../components/Card";
import { NearEarthObject } from "../utilities/types";
import { convertEpochDateToMonthDateYearFormat } from "../utilities/helper";
import DateRangePickerComponent from "../components/DateRangePicker";
import Tooltip from "../components/Tooltip";
import CardSkeleton from "../components/CardSkeleton";
import useNeoFeedHook from "./hooks/useNeoFeedHook";

export interface NeoScreenProps {
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
  const {
    startDate,
    endDate,
    rangeEndDate,
    onDateRangeChange,
    endDateGreaterThanExpectedRange,
    isFetching,
    isLoading,
    neoFeedData,
  } = useNeoFeedHook({
    totalNeos,
    hazardousNeos,
    objectClosestToEarth,
    highestVelocityObject,
  });
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

        {isLoading || isFetching ? (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4]?.map((item) => (
              <CardSkeleton key={item} />
            ))}
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card
              title={`${neoFeedData?.totalNeo}`}
              subtitle="A total of"
              description="Objects came close to Earth during this period"
            />
            {neoFeedData?.hazardousNeo > 0 ? (
              <Card
                title={`${neoFeedData?.hazardousNeo}`}
                subtitle={`Out of ${neoFeedData?.totalNeo}`}
                description={`${neoFeedData?.hazardousNeo > 1 ? "were" : "was"} potentially hazardous to us`}
              />
            ) : (
              <Card
                title={`Thankfully, none of them were hazardous`}
                subtitle={`Phew!`}
              />
            )}
            {neoFeedData?.objClosestToEarth && (
              <Card
                title={`${neoFeedData?.objClosestToEarth?.name}  on ${convertEpochDateToMonthDateYearFormat(neoFeedData?.objClosestToEarth?.epoch_date_close_approach)}`}
                subtitle="The object that was closest to us during this period was the"
                description={`at a distance of ${neoFeedData?.objClosestToEarth?.miss_distance?.kilometers} km (${neoFeedData?.objClosestToEarth?.miss_distance?.miles} miles)`}
              />
            )}
            {neoFeedData?.highestVelocityObj && (
              <Card
                title={`${neoFeedData?.highestVelocityObj?.name}`}
                subtitle="The object with the highest velocity during this period"
                description={`at a velocity of ${neoFeedData?.highestVelocityObj?.relative_velocity?.kilometers_per_hour} kmph (${neoFeedData?.highestVelocityObj?.relative_velocity?.miles_per_hour} mph)`}
              />
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default NeoScreen;
