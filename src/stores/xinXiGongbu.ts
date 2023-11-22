import { defineStore } from 'pinia';
import axios from "axios"
import { ipConfig,authItemName } from '../global/ipConfig'

export const useXinXiGongBu = defineStore('xinXiGongBu', {
	state: () => {
		return {
			items:
			{
				technicalDuration: [''],
				departmentDuration: [''],
				planList: [''],
				planStatistics:['']
			},
			data1: [{}],
			data2: {
				name: [''],
				value: [0]
			},
			data3: {
				name: [''],
				path: [''],
				isWant: [''],
			},
			plant: {
				userId: '',
				fileName: '',
			},
			responseMessage: {
				messageClass: '',
				message: '',
				result: false,
			},
			data4: [{
				name:'',
				value:0,
			}],
			index: 0,
			loading: false,
			key:0,
			width:'',
			radius:[0,0],
		}
	},
	getters: {},
	actions: {
		asyncGetInfo() {
			axios({
				method: "get",
				url: ipConfig + "api/getXinXiGongBu",
				headers: {
					"token": getToken(),
				},
			}).then(res => {
				this.data1 = [];
				this.data2 = {
					name: [],
					value: []
				};
				this.data3 = {
					name: [],
					path: [],
					isWant: [],
				}
				this.data4 = [];
				this.items = res.data;
				for (let i = 0; i < this.items.technicalDuration.length; i++) {
					let data = {
						value: Number(this.items.technicalDuration[i][1]), name: this.items.technicalDuration[i][0]
					}
					this.data1.push(data);
				}
				for (let i = 0; i < this.items.departmentDuration.length; i++) {
					this.data2.name.push(this.items.departmentDuration[i][0]);
					this.data2.value.push(Number(this.items.departmentDuration[i][1]))
				}
				for (let i = 0; i < this.items.planList.length; i++) {
					this.data3.name.push(this.items.planList[i][0]);
					this.data3.path.push(this.items.planList[i][1])
					this.data3.isWant.push(this.items.planList[i][2])
				}
				for (let i = 0; i < this.items.planStatistics.length; i++) {
					let data = {
						value: Number(this.items.planStatistics[i][1]), name: this.items.planStatistics[i][0]
					}
					this.data4.push(data);
				}
				//console.log(this.data4);
				this.loading = false;
			})
		},

	}



});

function getToken(): string {
	let str = localStorage.getItem(authItemName);
	if (!str) return 'null'

	let authObj = JSON.parse(str)
	return authObj.token;
}