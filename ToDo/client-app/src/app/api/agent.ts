import axios, { AxiosResponse } from "axios";
import { TaskToDo } from "../models/taskToDo";
import { User } from "../models/user";

axios.defaults.baseURL ='https://localhost:44379/api'

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

axios.interceptors.response.use( async responce => {
    await delay(200);
    return responce;
})

const responceBody = <T> (responce : AxiosResponse<T>) => responce.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responceBody),
    post: <T>(url: string , body: {}) => axios.post<T>(url, body).then(responceBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responceBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responceBody),
}

const authorizationRequests = {
    get: <T>(url: string, body: {}) => axios.get<T>(url, body).then(responceBody),
    post: <T>(url: string , body: {}) => axios.post<T>(url, body).then(responceBody),
}

const TasksToDo = {
    list: (id: number) => requests.get<TaskToDo[]>('/ToDo/' + id),
    details: (id: number) => requests.get<TaskToDo>('/ToDo/user/' + id),
    create: (taskToDo: TaskToDo) => requests.post<void>('/ToDo', taskToDo),
    update: (taskToDo: TaskToDo) => requests.put<void>(`/ToDo/?id=${taskToDo.id}`,taskToDo ),
    delete: (id: number) => requests.del<void>(`/ToDo/${id}`)
}

const Users = {
    login: (user: User) => authorizationRequests.post<User>(`/Authorization/Login`, user),
    create: (user: User) => authorizationRequests.post<User>('/Authorization/Register', user),
}

const agent = {
    TasksToDo ,
    Users
}

export default agent;