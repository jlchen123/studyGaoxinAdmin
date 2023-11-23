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
			data: {
				value: 0,
				name: '在线人数'
			},
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
			option : {
				tooltip: {
					formatter: '{a} <br/>{b} : {c}人'
				},
				series: [
					{
						name: '压力',
						type: 'gauge',
						progress: {
							show: true
						},
						detail: {
							valueAnimation: true,
							formatter: '{value}'
						},
						data: [
							{
								value:0,
								name: '在线人数'
							}
						]
					}
				]
			},
			myChart: {}
		};
	},
	getters: {},
	actions: {



	}
});
