export function countDown (timeLast) {
  let hour = 0
  let minute = 0
  let second = 0 // 时间默认值
  hour = Math.floor(timeLast / 60 / 60)
  minute = Math.floor(timeLast % (60 * 60) / 60)
  second = Math.floor(timeLast % 60)
  if (hour <= 9) hour = '0' + hour
  if (minute <= 9) minute = '0' + minute
  if (second <= 9) second = '0' + second
  return `${hour}:${minute}:${second}`
}
