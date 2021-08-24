export function friendlyDate(dateStr) {
  let dateObj = typeof dateStr === "object" ? dateStr : new Date(dateStr);
  let time = dateObj.getTime();
  let now = Date.now();
  let timeInterval = now - time;
  let str = "";

  switch (true) {
    case timeInterval < 60000:
      str = "刚刚";
      break;
    case timeInterval < 1000 * 3600:
      str = Math.floor(timeInterval / 60000) + "分钟前";
      break;
    case timeInterval < 1000 * 3600 * 24:
      str = Math.floor(timeInterval / (1000 * 3600)) + "小时前";
      break;
    default:
      str = Math.floor(timeInterval / (1000 * 3600 * 24)) + "天前";
  }
  return str;
}
