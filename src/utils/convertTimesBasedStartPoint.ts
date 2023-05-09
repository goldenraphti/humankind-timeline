import { startPointsDates } from "./timeline";

const adjustTimeBasedOnStartPoint = (time: number, startPoint: number) => {};

const adjustTimelineFromStartPoint = (startDate: number) => {
  // iterate through each event in timeline
  // based on new startDate, modify value of each span
};

const listenToStartInputChange = (e: Event) => {
  const startPoint = e.target?.value;
  let startDate = startPointsDates.homo;
  if (!startPoint) {
    return false;
  } else if (startPoint === "genus homo") {
    startDate = startPointsDates.homo;
  } else if (startPoint === "daily usage of fire") {
    startDate = startPointsDates.fire;
  } else if (startPoint === "homo sapiens") {
    startDate = startPointsDates.sapiens;
  }

  adjustTimelineFromStartPoint(startDate);
};

document
  .querySelectorAll("input[name='startpoint']")
  .forEach((input) =>
    input.addEventListener("input", listenToStartInputChange)
  );
