export const convertLocalDate = function (dateString) {
  const date = new Date(dateString); // Tarih stringini Date nesnesine çevir
  const formatter = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatter.format(date); // Biçimlendirilmiş tarihi döndür
};
