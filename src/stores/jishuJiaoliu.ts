import { defineStore } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
import {  insertPlate, getPlate,getTopicList,delTopic } from "../request/api";


// 导入进度条

const router = useRouter();
export const useJishuJiaoliu = defineStore('jishuJiaoliu', {
    state: () => {
        return {
            topic:
            {
                sId: '',//主贴板块编号
                uId: '',//主贴用户编号
                tTopic: '',//主贴标题
                tContents: '',//主贴内容
                images: [''],//文章中的图片base64
                tFilesPath: '',
                tickcet: {
                    description: '',
                    multi: true,
                    start_Time: '',
                    end_Time: '',
                    options: [{
                        name: '',
                        description: '',
                    }],
                }
            },
            imagesSrc: [''],
            loading: false,
            dialog: false,
            topicFlag: false,
            commentDialog: false,
            replyDialog: false,
            sId: '*',
            plateContent1: '',
            plateContent2: '',
            plateContent3: '',
            getTopicResult: true,
            //  imageSrc: '',
            //  imageP: false,
            // imagek: 0,
            //  elimage: ref(),
            responseMessage: {
                messageClass: '',
                message: '',
                result: false,
            },
            topicList: [
                {
                    tid: '',//主贴编号
                    sid: '',//主贴板块编号
                    uid: '',//主贴用户编号
                    treplyCount: '',//主贴回复次数
                    timagesPath: '',//主贴图片路径
                    ttopic: '',//主贴标题
                    tcontents: '',//主贴内容
                    ttime: '',//主贴时间
                    tclickCount: '',//主贴点击次数
                    tlastClick: '',//主贴最后点击时间
                    thumbnails: [''],//缩略图
                    profileImage: '',//楼主头像
                    userName: '',//楼主名字
                    department: '',//楼主部门
                }
            ],
            navList: [{
                uid: '',
                tid: '',
                treplyCount: '',
                ttopic: '',
                profileImage: '',
                userName: '',
                department: '',
                ttime: '',
                tcontents: '',
                thumbnails: [''],
                tlastClick: '',
            }],
            topicRes:
            {
                tid: '',//主贴编号
                sid: '',//主贴板块编号
                uid: '',//主贴用户编号
                treplyCount: '',//主贴回复次数
                timagesPath: '',//主贴图片路径
                ttopic: '',//主贴标题
                tcontents: '',//主贴内容
                ttime: '',//主贴时间
                tclickCount: '',//主贴点击次数
                tlastClick: '',//主贴最后点击时间
                thumbnails: [''],//缩略图
                profileImage: '',//楼主头像
                userName: '',//楼主名字
                department: '',//楼主部门
                tfilesPath: '',
                fileCount: 0,
                comments: [{
                    department: '',
                    images: [''],
                    imagesSrc: [''],
                    profileImage: '',
                    rclickCount: '',
                    rcontents: '',
                    rid: '',
                    rl: '',
                    rtime: '',
                    rtoptic: '',
                    tid: "",
                    tuid: '',
                    uid: '',
                    userName: '',
                    tagName: [{
                        p: '',
                        contents: '',
                        imageIndex: 0,
                    }],
                    replyRes: [{
                        id: '',
                        tid: '',// 主贴id
                        rid: '',// 主回复id
                        uid: '',// 回复人id
                        uuid: '',// 被回复人id
                        rtime: '',// 回复时间
                        rconents: '',// 回复内容
                        images: [''],// 内容中的图片地址
                        imagesSrc: [''],
                        uusername: '',// 回复人姓名
                        uuUsername: '',// 被回复人姓名
                        rl: '',//是否为根评论，0是根评论，1是对用户回复
                        tagName: [{
                            p: '',
                            contents: '',
                            imageIndex: 0,
                        }],
                    }],
                }],
            },

            tagName: [{
                p: '',
                contents: '',
                style: "",
                imageIndex: 0,
            }],
            comment: {
                tID: '',//	回帖主题帖子编号
                uID: '',//	回帖用户编号
                rToptic: '',//	回帖标题
                rContents: '',//	回贴内容
                rl: '',//	回复楼层
                tuID: '',//	对方id
                images: [''],
            },
            reply: {
                tId: '',// 主贴id
                rId: '',// 主回复id
                uId: '',// 回复人id
                uuId: '',// 被回复人id
                rConents: '',// 回复内容
                uUsername: '',// 回复人姓名
                uuUsername: '',// 被回复人姓名
                images: [''],
                rL: '',
            },
            plate: {
                sId: '',
                sContent: '',
                sUserId: '',
                sUserName: '',
            },
            plateRes: {
                id: '',
                sid: '',
                stime: '',
                scontent: '',
                suserId: '',
                suserName: '',
            }



        };
    },
    getters: {
       

    },
    actions: {

      
        async UpDateTopicList() {
            // this.getPlate();
            let res = await getTopicList('sId=' + this.sId);

            this.topicList = [];
            //  console.log(res)
            this.topicList = res
            // console.log(JSON.stringify(this.topicList))
            this.navList = [];
            this.topicList.forEach(element => {
                let item = {
                    uid: '',
                    tid: '',
                    treplyCount: '',
                    ttopic: '',
                    profileImage: '',
                    userName: '',
                    department: '',
                    ttime: '',
                    tcontents: '',
                    thumbnails: [''],
                    tlastClick: '',
                }
                item.uid = element.uid;
                item.tid = element.tid;
                item.treplyCount = element.treplyCount;
                item.ttopic = element.ttopic;
                item.profileImage = element.profileImage;
                item.userName = element.userName;
                item.department = element.department
                item.ttime = element.ttime;
                // item.tcontents=element.tcontents;


                let div = document.createElement('div');
                div.innerHTML = element.tcontents;
                item.tcontents = div.textContent!
                item.thumbnails = element.thumbnails;
                item.tlastClick = element.tlastClick;
                this.navList.push(item);
            });



        },
        async delTopic(index:number) {
            let tId=this.navList[index].tid;
            this.responseMessage = await delTopic("tId=" + tId);
            if (this.responseMessage.result == false) {
                ElMessage.error(this.responseMessage.message);
            } else if (this.responseMessage.result == true) {
                ElMessage.success(this.responseMessage.message);
                this.UpDateTopicList();
            }
        },
        async insertPlate() {
            this.responseMessage = await insertPlate(this.plate);
            if (this.responseMessage.result == false) {
                ElMessage.error(this.responseMessage.message);
            } else if (this.responseMessage.result == true) {
                ElMessage.success(this.responseMessage.message);
                this.UpDateTopicList();
            }
        },
        async getPlate(sid:String) {
            this.plateRes = await getPlate("sId=" + sid);
            if(sid=='1'){
                this.plateContent1 = this.plateRes.scontent;
            }
            if(sid=='2'){
                this.plateContent2 = this.plateRes.scontent;
            }
            if(sid=='3'){
                this.plateContent3 = this.plateRes.scontent;
            }
        }
    }

});
