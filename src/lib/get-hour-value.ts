import moment from 'moment'

export function getHourValue(timeString: string, i: number, timezone: string) {
  // Parse the input time string and timezone using moment.tz.
  // The format 'hh:mm A' specifies that the input time string is in 12-hour format with AM/PM.

  const parsedTime = moment.tz(timeString, 'hh:mm A', timezone)

  // Add the difference in days to the parsed time.
  parsedTime.add(i, 'days')
  return parsedTime
}
