import { addDays } from "date-fns";
import NeoScreen from "../screens/NeoScreen";
import { fetchISOStringDate, fetchNeoFeedData } from "../utilities/helper";

const NeoPage = async () => {
  // const startDateExp = Temporal.Now.zonedDateTimeISO();
  // console.log("StartDate", startDateExp);
  // const endDateExp = Temporal.ZonedDateTime.from(startDateExp);
  // console.log("endDate", endDateExp);

  let neoData;
  try {
    const startDate = fetchISOStringDate(new Date());
    const endDate = fetchISOStringDate(addDays(startDate, 7));
    neoData = await fetchNeoFeedData(startDate, endDate);
  } catch (e) {
    console.log("err in neo server page", e);
  }
  if (neoData) {
    console.log("neoData", neoData);
    const {
      totalNeos,
      hazardousNeos,
      objectClosestToEarth,
      highestVelocityObject,
    } = neoData;
    return (
      <NeoScreen
        totalNeos={totalNeos}
        hazardousNeos={hazardousNeos}
        objectClosestToEarth={objectClosestToEarth}
        highestVelocityObject={highestVelocityObject}
      />
    );
  }
};

export default NeoPage;
