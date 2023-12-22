
function updateTimer(time) {
    const now = Date.now();
    const timeHasPassed = now - time;

    const hours = Math.floor(timeHasPassed / (1000 * 60 * 60));
    const minutes = Math.floor((timeHasPassed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeHasPassed % (1000 * 60)) / 1000);

    const currentTime = {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
    };

    return currentTime
}

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time.toString();
};

export default updateTimer; // Экспорт по умолчанию

