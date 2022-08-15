export const watchStopViewMin = (time: any): string | number => {
  const minutes = Math.floor(time / 60);
  if (minutes > 9) {
    return minutes;
  }
  return "0" + minutes;
};
export const watchStopViewSec = (time: number): number | string => {
  const seconds = time - Math.floor(time / 60) * 60;
  if (seconds > 9) {
    return seconds;
  }
  return "0" + seconds;
};
export const handleChangeTime = (
  e: React.SyntheticEvent,
  timeSetter: React.Dispatch<React.SetStateAction<number>>
): void => {
  e.preventDefault();
  const { value } = e.target as HTMLInputElement;
  timeSetter(parseInt(value));
};

export const handleSubmitTime = (
  e: React.SyntheticEvent,
  time: number,
  timeSetter: React.Dispatch<React.SetStateAction<number>>
): void => {
  e.preventDefault();
  timeSetter(time);
};
