import { defineStore } from 'pinia';

export const useProperties = defineStore('properties', {
    state: () => {
        return {
            mode:{
                mode: "text/javascript",
                theme: '3024-day',
            },
           loading:false
        };
    },
    getters: {
       
    },
    actions: {
    
       
    }
});

