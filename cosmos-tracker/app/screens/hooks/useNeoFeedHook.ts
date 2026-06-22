import { useMemo, useState } from "react";
import { NeoScreenProps } from "../NeoScreen";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { fetchISOStringDate, fetchNeoFeedData } from "@/app/utilities/helper";

const useNeoFeedHook = ({
  totalNeos,
  hazardousNeos,
  objectClosestToEarth,
  highestVelocityObject,
}: NeoScreenProps) => {
  const [neoFeedData, setNeoFeedData] = useState({
    totalNeo: totalNeos,
    hazardousNeo: hazardousNeos,
    objClosestToEarth: objectClosestToEarth,
    highestVelocityObj: highestVelocityObject,
  });

  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => addDays(new Date(), 7));
  const [endDateGreaterThanExpectedRange, setEndDateGreaterThanExpectedRange] =
    useState(false);

  const rangeEndDate = useMemo(() => addDays(new Date(), 7), []);

  const onDateRangeChange = (selectedDate: Date, selectedEndDate: Date) => {
    setStartDate(selectedDate);
    setEndDate(selectedEndDate);
    setEndDateGreaterThanExpectedRange(
      selectedEndDate > addDays(selectedDate, 7),
    );
  };

  const fetchDataForSelectedDateRange = async (signal: AbortSignal) => {
    const selStartDate = fetchISOStringDate(startDate);
    const selEndDate = fetchISOStringDate(addDays(startDate, 7));
    console.log("SelStartDate", selStartDate);
    console.log("selEndDate", selEndDate);
    const updatedNeoFeedDate = await fetchNeoFeedData(
      selStartDate,
      selEndDate,
      signal,
    );
    setNeoFeedData({
      totalNeo: updatedNeoFeedDate?.totalNeos,
      hazardousNeo: updatedNeoFeedDate?.hazardousNeos,
      objClosestToEarth: updatedNeoFeedDate?.objectClosestToEarth,
      highestVelocityObj: updatedNeoFeedDate?.highestVelocityObject,
    });
    return updatedNeoFeedDate;
  };

  const { isLoading, isFetching } = useQuery({
    // ✅ Stable string keys — Date objects are always new references
    queryKey: [startDate.toISOString(), endDate.toISOString()],
    queryFn: ({ signal }) => fetchDataForSelectedDateRange(signal),
    retry: 3,
    retryDelay: 100,
  });

  return {
    neoFeedData,
    startDate,
    endDate,
    rangeEndDate,
    onDateRangeChange,
    endDateGreaterThanExpectedRange,
    isLoading,
    isFetching,
  };
};

export default useNeoFeedHook;
