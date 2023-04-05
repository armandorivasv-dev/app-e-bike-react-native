export const mountNormalize = (value) => {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(
    value
  );
};

export const sortArrayByDate = (array) => {
  return array.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
};

export const calcPrice = (price, discount) => {
  if (!discount) return price;
  const discountAmount = (price * discount) / 100;
  return price - discountAmount;
};
