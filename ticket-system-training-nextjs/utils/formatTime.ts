export const formatTime = (dateTime: string) => {
  const dateObj = new Date(dateTime);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
