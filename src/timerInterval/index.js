

export function startTimer(startTime, updateTimer) {
    const timerInterval = setInterval(() => {
        updateTimer(startTime);
    }, 1000);

    return timerInterval;
}
