export default function (num) {
  const n = Number(num);
  return `$${(n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
