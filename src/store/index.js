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

        openDialog: false,
        timerRun: false
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
        isTimerRun(state) {
            return state.timerRun
        },
        getCurrentTime(state) {
            return state.currentTime
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
        updateTimerRun() {
            this.timerRun = !this.timerRun
        },
        updateCurrentTime(data){
            this.currentTime = data
        }
    },
});
