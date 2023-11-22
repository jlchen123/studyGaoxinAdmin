//开发环境

const ip='192.168.31.104:8082'

//生产环境
// const ip='172.10.23.238:8082'


// const pdfjsPath = "src/assets/pdfjs/web/viewer.html?file="
const ipConfig = 'http://'+ip+'/'
const pdfjsPath = "/pdfjs/web/viewer.html?file="
const videoPlayer = ipConfig + 'video/player'
const downLoadUrl = ipConfig + "api/getOtherFile"
const authItemName = "authorizeAdmin"

export {ipConfig,pdfjsPath,videoPlayer,downLoadUrl,ip,authItemName}