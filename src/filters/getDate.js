export default function (num) {
  const d = new Date(num * 1000);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const dt = d.getDate();
  const day = `${y}/${m}/${dt}`;
  return day;
}
