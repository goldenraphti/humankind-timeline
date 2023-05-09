export type ITimelineSpan = "day" | "year";

if (!CSS.supports("selector(:has(input))")) {
  const adjustTimeline = () => {
    const timelineUnit = document?.querySelector(
      'form.time-unit-selection input[type="radio"]:checked'
    )?.value;

    console.log(timelineUnit);
    if (!timelineUnit) return false;

    const timelineStart = document?.querySelector(
      'form.starting-point-selection input[type="radio"]:checked'
    )?.value;

    document
      .querySelectorAll("section.timeline ul > li span")
      .forEach((spanElmt) => {
        if (
          spanElmt?.dataset.start === timelineStart &&
          spanElmt.dataset.unit === timelineUnit
        ) {
          spanElmt.style.display = "block";
        } else {
          spanElmt.style.display = "none";
        }
      });

    hideAllEventsAnteriorStartpointChosen();
  };
  const hideAllEventsAnteriorStartpointChosen = () => {
    const startpoint = document?.querySelector(
      'form.starting-point-selection input[type="radio"]:checked'
    )?.value;
    document.querySelectorAll("ul > li").forEach((eventEl) => {
      if (
        (startpoint === "daily usage of fire" &&
          eventEl.dataset.startFireCompatible === undefined) ||
        (startpoint === "homo sapiens" &&
          eventEl.dataset.startSapiensCompatible === undefined)
      ) {
        eventEl.style.display = "none";
      } else {
        eventEl.style.display = "flex";
      }
    });
  };

  const listenToTimelineInputChange = () => {
    document.querySelectorAll("form input").forEach((input) => {
      input.addEventListener("input", adjustTimeline);
    });
  };
  listenToTimelineInputChange();
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

import { startPointsDates, timeline } from "../utils/timeline";

const convertTimedRatioedOverCustomNumber = (
  yearsBeforePresent: number,
  totalDistance: number
) => {
  const startTimeline =
    startPointsDates[
      document.querySelector(
        'form.starting-point-selection input[type="radio"]:checked'
      )?.value
    ];
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
  .querySelectorAll("form input")
  .forEach((input) => input.addEventListener("input", populateCustomDistance));
