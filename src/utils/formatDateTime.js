export default function timeFormat(hour, minute, seconds) {
    let hourReturn = hour
    let minuteReturn = minute
    let secondsReturn = seconds ? seconds : '00'
    
    if (hour < 10) {
        hourReturn = `0${hour}`
    }
    if (minute < 10) {
        minuteReturn = `0${minute}`
    }
    if (seconds < 10) {
        secondsReturn = `0${seconds}`
    }

    return `${hourReturn}:${minuteReturn}:${secondsReturn}`
}