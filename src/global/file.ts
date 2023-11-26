export const FileList = {
    technicalClass: '',
    technicalName: '',
    warehouseName:'',
}
export const BBSTopicShow = {
    tId: '',
    flag:false,
}
export const technical = {
    technicalClass: '',
    technicalName: '',
}
export const fileShow = {
    filePath: '',
    fileName: '',
    warehouseName:'',
    technicalName:'',
    pageClass:''
}
export const loading={
    show:false
}
export function getFileType(filePath: string) {

    //获取最后一个.的位置
    var index = filePath.lastIndexOf(".");
    var a = filePath.lastIndexOf("\\");

    //获取后缀
    var ext = filePath.substr(index + 1);
    if (isAssetTypeAnImage(ext)) {
        return 'image';
    } else if (isAssetTypeAnPdf(ext)) {
        return 'pdf';
    } else if (isAssetTypeAnVideo(ext)) {
        return 'video';
    } else {
        return 'other';
    }
}

function isAssetTypeAnImage(ext: string) {
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
        indexOf(ext.toLowerCase()) !== -1;
}

function isAssetTypeAnPdf(ext: string) {
    return ['pdf'].
        indexOf(ext.toLowerCase()) !== -1;
}
function isAssetTypeAnVideo(ext: string) {
    return ['mp4', 'avi', 'mov', 'rmvb', 'rm', 'flv', '3gp', 'mpg', 'mpeg4'].
        indexOf(ext.toLowerCase()) !== -1;
}

export   const getAssetsFile = (url: string) => {
    return new URL(`../assets/${url}`, import.meta.url).href
 }

export function isFile(filePath: string){
   if(filePath.lastIndexOf(".")==-1) {
    return true
   }else{
    return false
   }
}


