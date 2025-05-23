export const formatNumberToLocal = function (value, minFrac, maxFrac) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'decimal',
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  }).format(value);
};
