export const formatCurrency = (value, digits = 2) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: digits,
  }).format(number);
};

export const formatCompactCurrency = (value, digits = 2) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: digits,
  }).format(number);
};
