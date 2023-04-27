export type ITimelineSpan = "day" | "year";

if (!CSS.supports("selector(:has(input))")) {
  const adjustTimeline = (
    spanElmt: HTMLSpanElement,
    timelineUnit: ITimelineSpan
  ) => {
    if (spanElmt?.dataset.unit === timelineUnit) {
      spanElmt.style.display = "block";
    } else if (spanElmt?.dataset.unit !== timelineUnit) {
      spanElmt.style.display = "none";
    }
  };

  const listenToTimelineInputChange = (e: Event) => {
    const timelineUnit =
      e.target.type === "radio" ? e?.target?.value : "history in distance";
    if (!timelineUnit) return false;
    document
      .querySelectorAll("ul > li > div.time > span")
      .forEach((eventElSpan) => adjustTimeline(eventElSpan, timelineUnit));
  };
  document
    .querySelectorAll("input")
    .forEach((input) =>
      input.addEventListener("input", listenToTimelineInputChange)
    );
}

const populateCustomDistance = () => {
  const totalDistance = document?.getElementById("distance")?.value;
  document
    .querySelectorAll(
      "ul > li > div.time > span[data-unit='history in distance']"
    )
    .forEach(
      (eventElSpan) =>
        (eventElSpan.textContent = convertTimedRatioedOverCustomNumber(
          Number(eventElSpan?.closest("li")?.dataset?.years),
          Number(totalDistance)
        ))
    );
};

import { timeline } from "../utils/timeline";

const convertTimedRatioedOverCustomNumber = (
  yearsBeforePresent: number,
  totalDistance: number
) => {
  const startTimeline = timeline[0].dateYearsBeforePresent;
  const endTimeline = 0;
  const yearsComparedToStart = startTimeline - yearsBeforePresent;
  const timeSpanYearEquivalent = startTimeline - endTimeline;
  const eventRatio = yearsComparedToStart / timeSpanYearEquivalent;
  if (!totalDistance) return "please enter a valid distance";
  return isNaN(eventRatio * totalDistance)
    ? "-"
    : `${eventRatio * totalDistance}m`;
};
document
  .querySelectorAll(".require-js input")
  .forEach((input) => input.addEventListener("input", populateCustomDistance));
