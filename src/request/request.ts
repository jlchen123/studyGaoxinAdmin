import axios from 'axios'
import router from '../router'
import { ipConfig } from '../global/ipConfig'
import { ElMessage } from 'element-plus'
import { authorize } from '../global/authorize'
import { authItemName } from '../global/ipConfig'



// 创建axios实例
const request = axios.create({
    baseURL: ipConfig,// 所有的请求地址前缀部分(没有后端请求不用写)
    timeout: 80000, // 请求超时时间(毫秒)
    // withCredentials: true,// 异步请求携带cookie
    // let token=getToken(),
    headers: {
        // 设置后端需要的传参类型
        // 'Content-Type': 'application/json',
        //'token': getToken(),//一开始就要token
        // 'X-Requested-With': 'XMLHttpRequest',
    },
})

function getToken(): string {
    let str = localStorage.getItem(authItemName);
    if (!str) return 'null'
    let authObj = JSON.parse(str)
    return authObj.token;
}
// request拦截器
request.interceptors.request.use(
    config => {
        // 如果你要去localStor获取token,(如果你有)
        const token = getToken()
        if (token != 'null') {
            config.headers = config.headers || {}  // 初始化 headers 为空对象
            config.headers['token'] = token
            return config
        }

        return config
    },
    error => {
    }
)
request.interceptors.response.use(
    response => {

        // 对响应数据做点什么
        return response.data
    },
    error => {
        switch (error.response.status) {
            case 404:
                router.push('/404');
                break;
            case 403:
                router.push('/403');
                break;
            case 401:
                localStorage.removeItem(authItemName)
                ElMessage("登录过期，请重新登录")
                router.push('/login');
                break;
            case 500:
                ElMessage("服务器错误");
                break;
        }
    }
)
//返回图片
const requestImage = axios.create({
    baseURL: ipConfig,// 所有的请求地址前缀部分(没有后端请求不用写)
    timeout: 80000, // 请求超时时间(毫秒)
    // withCredentials: true,// 异步请求携带cookie
    // let token=getToken(),
    responseType: "blob",
    headers: {
        "type": 'image',
        // 设置后端需要的传参类型
        // 'Content-Type': 'application/json',
        //'token': getToken(),//一开始就要token
        // 'X-Requested-With': 'XMLHttpRequest',
    },
})
requestImage.interceptors.request.use(
    config => {
        // 如果你要去localStor获取token,(如果你有)
        //  loading.show=true;
        const token = getToken()
        if (token != 'null') {
            config.headers = config.headers || {}  // 初始化 headers 为空对象
            config.headers['token'] = token
            return config
        }

        return config
    },
    error => {
    }
)
requestImage.interceptors.response.use(
    response => {

        return response.data
    },
    error => {
        switch (error.response.status) {
            case 404:
                router.push('/404');
                break;
            case 403:
                router.push('/403');
                break;
            case 401:
                localStorage.removeItem(authItemName)
                ElMessage("登录过期，请重新登录")
                router.push('/login');
                break;
            case 500:
                ElMessage("服务器错误");
                break;
        }
    }
)


//Json作为参数请求
const requestJson = axios.create({
    baseURL: ipConfig,// 所有的请求地址前缀部分(没有后端请求不用写)
    timeout: 80000, // 请求超时时间(毫秒)
    responseType: "blob",
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
    },
})
requestJson.interceptors.request.use(
    config => {
        const token = getToken()
        if (token != 'null') {
            config.headers = config.headers || {}  // 初始化 headers 为空对象
            config.headers['token'] = token
            return config
        }
        return config
    },
    error => {
    }
)
requestJson.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        switch (error.response.status) {
            case 404:
                router.push('/404');
                break;
            case 403:
                router.push('/403');
                break;
            case 401:
                localStorage.removeItem(authItemName)
                ElMessage("登录过期，请重新登录")
                router.push('/login');
                break;
            case 500:
                ElMessage("服务器错误");
                break;
        }
    }
)

const requestLogin = axios.create({
    baseURL: ipConfig,// 所有的请求地址前缀部分(没有后端请求不用写)
    timeout: 80000, // 请求超时时间(毫秒)
    headers: {
    },
})
requestLogin.interceptors.response.use(
    response => {
        authorize.loginInfo = response.data
        const str = JSON.stringify(authorize.loginInfo)
        localStorage.setItem(authItemName, str)
        // 对响应数据做点什么
        return response.data
    },
    error => {
        switch (error.response.status) {
            case 404:
                router.push('/404');
                break;
            case 403:
                router.push('/403');
                break;
            case 401:
                router.push('/login');
                break;
            case 500:
                ElMessage.error("服务器错误");
                break;
        }
    }
)




export { request, requestImage, requestJson, requestLogin }