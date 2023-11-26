import { defineStore } from 'pinia';
import { authorize } from '@/global/authorize';
export const useFile = defineStore('file', {
	state: () => {
		return {
			headers:{
                token:authorize.loginInfo.token,
                filePath:encodeURIComponent('材料综合性能分析技术-3D超景深三维显微镜')
            }
		};
	},
	getters: {},
	actions: {



	}
});
