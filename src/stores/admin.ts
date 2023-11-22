import { defineStore } from 'pinia';

export const useAdmin = defineStore('admin', {
    state: () => {
        return {
            userOnline: [{
				uId: '',
				unit: '',
				userDepartment: '',
				username: '',
			}],
            authObj: {
				userId: '',
				userDepartment: '',
				username: '',
				role: '',
				token: '',
				expire: '',
				message: '',
				base64Image: '',
				personalMessage: '',
			},
        };
    },
    getters: {},
    actions: {
       


    }
});
