import { defineStore } from 'pinia';
import axios from "axios"
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { getUserInfo } from '@/request/api'
export const useUser = defineStore('user', {
	state: () => {
		return {
			items:
			{
				todayDuration: '',
				yearDuration: '',
				videoDuration: '',
				documentDuration: '',
				technicalDuration: [''],
				warehouseDurationProportion: [''],
				userDuration: [''],
			},

			options4: {
				type: 'pie',
				legend: {
					position: 'left',
				},
				bgColor: '#fbfbfb',
				labels: ['基础资料库%', '案例及图谱库%', '能力提升库%'],
				datasets: [
					{
						data: [0]
						// data: [500, 500, 14]
					}
				]
			},
			schartFlag: false,
			flag: false,
			loading: false,
			personalMessage: '',
		};
	},
	getters: {},
	actions: {
		async asyncGetInfo() {
			this.items = await getUserInfo()
			this.options4.datasets[0].data = [];
			for (let i = 0; i < this.items.warehouseDurationProportion.length; i++) {
				this.options4.datasets[0].data.push(parseFloat(this.items.warehouseDurationProportion[i]));
			}
			if (this.items.warehouseDurationProportion.length > 0) {
				this.schartFlag = true;
			}
			if (this.items.technicalDuration.length > 0) {
				this.flag = true;
			}
			this.loading = false;
		}
	}
});
