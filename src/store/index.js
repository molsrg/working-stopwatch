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
        openAddTaskDialog: false,
        timerRun: false, 
        timerInterval: null, 
        onBreak: false
    }),
    getters: {

        getSession(state) {
            return state.session
        }, 
        getSessions(state) {
            return state.sessions
        }, 
        getCurrentTime(state) {
            return state.currentTime
        },
        getTimerInterval(state) {
            return state.timerInterval
        },


        // Application
        isOpenDialog(state) {
            return state.openDialog
        },
        isOpenStartDialog(state) {
            return state.openStartDialog
        },
        isOpenAddTaskDialog(state) {
            return state.openAddTaskDialog
        },
        isTimerRun(state) {
            return state.timerRun
        }, 
        isOnBreak(state){
            return state.onBreak
        }
    },

    actions: {
        createSession(data){
            this.session = data.value
            localStorage.setItem("SESSION", JSON.stringify(data.value));
        }, 
        updateSession(data){
            this.session = data
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
        updateSessions(){
            this.session.totalTime = formatMilliseconds(this.session.totalTime)
            this.sessions.push(this.session)
            this.currentTime = {
                hours: "00",
                minutes: "00",
                seconds: "00",
            },
            this.session = []
            this.onBreak = false
            localStorage.setItem("SESSIONS", JSON.stringify(this.sessions));
            localStorage.removeItem("SESSION")
        },
        downoloadSessions(data){
            this.sessions = data
        },
        updateSegmentComments(data){
            // обработать утром 
            if(localStorage.getItem("SESSION") && localStorage.getItem("TOTAL_TIME")){
                this.session.segments[data.index].comments = data.comments

                const commentIndex = this.session.tasks.findIndex(task => task === data.comments);
                if (commentIndex !== -1) {
                    this.session.tasks.splice(commentIndex, 1);
                }
                
            }
            else{
                for (let i = 0; i < this.sessions.length; i++) {
                    if (this.sessions[i].startTime === data.session) {
                        this.sessions[i].segments[data.index].comments = data.comments;
                
                        const commentIndex = this.sessions[i].tasks.findIndex(task => task === data.comments);
                        if (commentIndex !== -1) {
                            this.sessions[i].tasks.splice(commentIndex, 1);
                        }
                    }
                }
                localStorage.setItem("SESSION", JSON.stringify(this.session));
                localStorage.setItem("SESSIONS", JSON.stringify(this.sessions));
            }
            
        },
        updateTaskSession(data){
            this.session.tasks.push(data)
        },


        // Application
        updateOpenDialog() {
            this.openDialog = !this.openDialog
        }, 
        updateOpenStartDialog() {
            this.openStartDialog = !this.openStartDialog
        }, 
        updateAddTaskOpenDialog(){
            this.openAddTaskDialog = !this.openAddTaskDialog
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
        updateOnBreak(){
            this.onBreak = !this.onBreak
        }
        
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