export const formatDate = (date: string) => {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = days[dateObj.getDay()];
  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}（${dayOfWeek}）`;
};
