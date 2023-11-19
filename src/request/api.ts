import {requestLogin,request} from "./request";

export const loginApi = (data: any): any =>
requestLogin.post("/api/login", data);

export const getLog = (): any =>
request.get("/api/getLog");

export const getLogFile = (data: any): any =>
request.post("/api/getLogFile", data);