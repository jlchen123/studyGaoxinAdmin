import { defineStore } from 'pinia';

export const useProperties = defineStore('properties', {
    state: () => {
        return {
            
          
            mode:{
                mode: "text/javascript",
                theme: 'ayu-mirage',
            }
        };
    },
    getters: {
       
    },
    actions: {
    
       
    }
});

