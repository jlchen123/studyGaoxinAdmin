import { defineStore } from 'pinia';
import { ip } from './ipConfig'

import { getUserOline } from '../request/api'
import { useAdmin } from "../stores/admin";
import { authorize } from '@/global/authorize'
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css'
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
                }else if(this.messageRes.messageClass == 'onlineUser'){
                    ElMessage.success(this.messageRes.message)
                    getOnlineUserList()
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
        },
        
    }
});

async function getOnlineUserList() {
    useAdmin().userOnline =await getUserOline();
    
    useAdmin().option.series[0].data[0].value=useAdmin().userOnline.length;
    (useAdmin().myChart as any).setOption(useAdmin().option);
  }