import { useState } from "react";
import {
  fetchImageForSelectedDate,
  fetchISOStringDate,
} from "../../utilities/helper";
import { useQuery } from "@tanstack/react-query";

const useApodHook = (
  title: string,
  src: string,
  description: string,
  mediaType: string,
  dateReceived?: string,
) => {
  const dateHasBeenUpdated =
    dateReceived !== undefined && dateReceived !== null;
  const [date, setDate] = useState(
    dateHasBeenUpdated ? new Date(dateReceived) : new Date(),
  );
  const [showDateChangeMessage, setShowDateChangeMessage] =
    useState(dateHasBeenUpdated);
  console.log("dateHasBeenUpdated", dateHasBeenUpdated);
  console.log("showDateChangeMessage", showDateChangeMessage);
  const [mediaDetails, setMediaDetails] = useState({
    title,
    src,
    description,
    mediaType,
  });
  const updateImageForSelectedDate = async (signal: AbortSignal) => {
    const apod = await fetchImageForSelectedDate(
      fetchISOStringDate(date),
      false,
      signal,
    );
    if (!apod) {
      return;
    }

    setMediaDetails({
      title: apod?.data?.title,
      src: apod?.data?.url,
      description: apod?.data?.explanation,
      mediaType: apod?.data?.media_type,
    });
    if (apod?.data?.updatedDate) {
      setShowDateChangeMessage(true);
    } else {
      console.log("I am being called");
      setShowDateChangeMessage(false);
    }
    return apod;
  };

  const { isLoading, isFetching } = useQuery({
    queryKey: [date],
    queryFn: ({ signal }) => updateImageForSelectedDate(signal),
    retry: 3,
    retryDelay: 100,
  });

  const onDateChange = (selectedDate: Date) => {
    console.log("changed date");
    setDate(selectedDate);
  };
  return {
    isLoading,
    mediaDetails,
    onDateChange,
    date,
    showDateChangeMessage,
    isFetching,
  };
};

export default useApodHook;
