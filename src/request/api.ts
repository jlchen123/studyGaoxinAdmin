import {requestLogin,request,requestJson} from "./request";

export const loginApi = (data: any): any =>
requestLogin.post("/api/login", data);

export const getLog = (): any =>
request.get("/api/getLog");

export const getLogFile = (data: any): any =>
request.post("/api/getLogFile", data);

export const getAccountsByContent = (data: any): any =>
request.post("/api/getAccountsByContent", data);
export const getAccountsByUsername = (data: any): any =>
request.post("/api/getAccountsByUsername", data);
export const getDepartment = (): any =>
request.get("/api/getDepartment");
export const getUnit = (): any =>
request.get("/api/getUnit");
export const getAccountsByDepartment = (data: any): any =>
request.post("/api/getAccountsByDepartment", data);
export const getAccountsByRole = (data: any): any =>
request.post("/api/getAccountsByRole", data);

export const updateAccounts = (data: any): any =>
requestJson.post("/api/updateAccounts", data);

export const delAccount = (data: any): any =>
request.post("/api/delAccount", data);

export const updateFileList = ():any =>
request.post("api/updateFileList");
export const getUserOline = (): any =>
request.get("api/getOnlineUser");
