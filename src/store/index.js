import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        count: 1,
        session: []
    }),
    getters: {
        // automatically infers the return type as a number
        doubleCount(state) {
        return state.count * 2;
        },
        getSession(state) {
            return state.session
        }
    },

    actions: {
        // since we rely on `this`, we cannot use an arrow function
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
        },
        updateSession(data){
            this.session = data
        }
    },
});
