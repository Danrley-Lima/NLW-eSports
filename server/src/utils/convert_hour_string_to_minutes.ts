/**
 * 10:00 -> 1000
 */
export default function convertHourStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutesAmount = (hours * 60) + minutes

    return minutesAmount
}