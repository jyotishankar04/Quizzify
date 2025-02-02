import moment from "moment";

const getNormalMMdoYYformat = (date: string) => {
  return moment(date).format("MMM Do, YYYY");
};

const getFormatedTimeFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return {
    minutes: minutes,
    seconds: secondsRemaining,
  };
};
const getDisplayTimeFromSeconds = (seconds: number) => {
  const time = getFormatedTimeFromSeconds(seconds);
  return ` ${
    time.minutes > 0 ? time.minutes.toString().padStart(2, "0") + ":" : ""
  } ${time.seconds.toString().padStart(2, "0")} ${
    time.minutes > 0 ? "mins" : "sec"
  }`;
};

export {
  getNormalMMdoYYformat,
  getFormatedTimeFromSeconds,
  getDisplayTimeFromSeconds,
};
