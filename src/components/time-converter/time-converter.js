function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

export default function convertTime(unix_time) {
    const date = new Date(unix_time*1000);
    const converted = {
        day: getZero(date.getDate()),
        mounth: getZero(date.getMonth() + 1),
        year: date.getFullYear(),
        hours: getZero(date.getHours()),
        minutes: getZero(date.getMinutes())
    }

    return `${converted.day}.${converted.mounth}.${converted.year} ${converted.hours}:${converted.minutes}`;
}
