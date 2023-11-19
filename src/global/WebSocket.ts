import { defineStore } from 'pinia';
import { ip } from './ipConfig'
import { ElMessage, ElNotification } from 'element-plus';


import router from '../router'
import { authorize } from '@/global/authorize'
export const useWebsocket = defineStore('websocket', {
    state: () => {
        return {
            socket: {

            },
            flag:true,
          line:'',
            messageRes: {
                messageClass: '',
                message: '',
                result: false,
                senderId: '',
                senderUnit: '',
                senderDepartment: '',
                senderUsername: '',
                senderRole: '',
                sendTime: '',
                TId: '',
            },
        };
    },
    getters: {
        setup() {
           
            let socket = new WebSocket('ws://' + ip + '/websocket?token=' + authorize.loginInfo.token);
            socket.onerror = err => {
                // console.log(err);
            };
            socket.onopen = event => {
                // console.log(event);
            };

            socket.onmessage = mess => {
                this.messageRes = JSON.parse(mess.data);
               
                if ( this.messageRes.messageClass == 'admin') {
                    this.line=this.line+ this.messageRes.message+"\n"
                   
                }
            };
            socket.onclose = () => {
              //  console.log("连接关闭");
            };
            this.socket = socket;

        },
     
    },
    actions: {
    
        closeWebSocket() {
            this.socket = {};
        },
        getSetup(){
         //   console.log("getsetup")
            this.setup;
        }
    }
});

