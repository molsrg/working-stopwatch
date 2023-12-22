import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        session: [], 
        sessions: [], 


        currentTime: {
            hours: "00",
            minutes: "00",
            seconds: "00",
        },

        openStartDialog: false,
        openDialog: false,
        timerRun: false, 
        timerInterval: null
    }),
    getters: {

        getSession(state) {
            return state.session
        }, 
        getSessions(state) {
            return state.sessions
        }, 

        isOpenDialog(state) {
            return state.openDialog
        },
        isOpenStartDialog(state) {
            return state.openStartDialog
        },
        isTimerRun(state) {
            return state.timerRun
        },
        getCurrentTime(state) {
            return state.currentTime
        },
        getTimerInterval(state) {
            return state.timerInterval
        }
    },

    actions: {
        createSession(data){
            this.session = data.value
            localStorage.setItem("SESSION", JSON.stringify(data.value));
        }, 
        addSessionSegment(data){
            this.session.segments.push(data)
            // Вычисление общей длительности всех сегментов
            this.session.totalTime = this.session.segments.reduce((total, segment) => {
                return total + segment.totalTime;
            }, 0)
            
            localStorage.setItem("SESSION", JSON.stringify(this.session));
        }, 
        updateSessionTimeBreak(data) {
            this.session.segments[data.count].breakTime = data.breakTime
        }, 
        updateSessionComments(data) {
            this.session.comments = data
        }, 

        updateSession(data){
            this.session = data
        },

        updateSessions(){
            this.session.totalTime = formatMilliseconds(this.session.totalTime)
            this.sessions.push(this.session)
            this.currentTime = {
                hours: "00",
                minutes: "00",
                seconds: "00",
            },
            this.session = []
            localStorage.setItem("SESSIONS", JSON.stringify(this.sessions));
            localStorage.removeItem("SESSION")
        },

        downoloadSessions(data){
            this.sessions = data
        },


        updateOpenDialog() {
            this.openDialog = !this.openDialog
        }, 
        
        updateOpenStartDialog() {
            this.openStartDialog = !this.openStartDialog
        }, 
        updateTimerRun() {
            this.timerRun = !this.timerRun
        },
        updateCurrentTime(data){
            this.currentTime = data
            localStorage.setItem("TOTAL_TIME", JSON.stringify(this.currentTime));
        }, 
        updateTimerInterval(data){
            this.timerInterval = data
        }, 
        clearIntervalTimer(){
            clearInterval(this.timerInterval)
        }, 
        updateSegmentComments(data){
            this.session.segments[data.index].comments = data.comments
            for(let i = 0; i < this.session.tasks.length; i++){
                if(this.session.tasks[i] == data.comments) {
                    this.session.tasks.splice(i,1)
                }
            }
        },


        updateTaskTimerStart(index){
            const task = this.session.tasks[index]
            task.timerStart = Date.now();
        }, 
        updateTaskTimerEnd(index){
            const task = this.session.tasks[index]
            task.timerEnd = Date.now();
        }, 
    },
});


function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
}