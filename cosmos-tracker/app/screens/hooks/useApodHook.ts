import { useEffect, useState } from "react";
import {
  fetchImageForSelectedDate,
  fetchISOStringDate,
} from "../../utilities/helper";

const useApodHook = (
  title: string,
  src: string,
  description: string,
  mediaType: string,
  dateReceived?: string,
) => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    console.log("date inside", date);
    const updateImageForSelectedDate = async () => {
      const apod = await fetchImageForSelectedDate(fetchISOStringDate(date));
      if (!apod) {
        setIsLoading(false);
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
      setIsLoading(false);
    };

    updateImageForSelectedDate();
  }, [date]);

  const onDateChange = (selectedDate: Date) => {
    setIsLoading(true);
    console.log("changed date");
    setDate(selectedDate);
  };
  return {
    isLoading,
    mediaDetails,
    onDateChange,
    date,
    showDateChangeMessage,
  };
};

export default useApodHook;
