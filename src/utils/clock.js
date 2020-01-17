export let getTime = () => {
  let date = new Date();
  let year, month, day, hour, minute, second, nowTime;
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  hour = date.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  nowTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
  return nowTime;
}