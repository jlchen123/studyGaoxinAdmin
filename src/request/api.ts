import {requestLogin} from "./request";

export const loginApi = (data: any): any =>
requestLogin.post("/api/login", data);