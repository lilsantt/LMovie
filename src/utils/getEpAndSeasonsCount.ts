export const getEpAndSeasonsCount = (seasonsCount: number, epCount: number) => {
  return `${seasonsCount} сезон${
    seasonsCount > 1 && seasonsCount < 5 ? "а" : seasonsCount >= 5 ? "ов" : ""
  }, ${epCount} серий`;
};
