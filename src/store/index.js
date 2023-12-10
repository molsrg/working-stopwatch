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
            this.session = data
        }, 
        updateSessionSegment(data){
            this.session.segments.push(data)
            // Вычисление общей длительности всех сегментов
            const totalSessionTime = this.session.segments.reduce((total, segment) => {
                return total + segment.totalTime;
            }, 0)
            this.session.totalTime = totalSessionTime
        }, 
        updateSessionTimeBreak(data) {
            this.session.segments[data.count].breakTime = data.breakTime
        }, 
        updateSessionComments(data) {
            this.session.comments = data
        }, 

        updateSessions(){
            this.sessions.push(this.session)
            this.currentTime = {
                hours: "00",
                minutes: "00",
                seconds: "00",
            },
            this.session = []
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
        }, 
        updateTimerInterval(data){
            this.timerInterval = data
        }, 
        clearIntervalTimer(){
            clearInterval(this.timerInterval)
        }
    },
});
