export const formatDate = (date, config) => {
  const defaultOptions = { date: "numeric", month: "long", year: "numeric" };
  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};
