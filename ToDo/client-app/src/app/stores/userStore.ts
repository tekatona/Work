import { makeAutoObservable } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User } from "../models/user";

export default class UserStore{
    user: User | undefined;

    constructor(){
        makeAutoObservable(this)
    }

    createUser = async(user: User) => {
        var u = await agent.Users.create(user);
        if(u.id !== undefined){
            alert("Now Login");
            this.user = u;
            history.push('/');
        }

        else{
            alert("Login already exists");
        }
    }

    loginUser = async(user: User) => {
        var u =  await agent.Users.login(user);

        if(u.id !== undefined){
            alert("Welcome");
            this.user = u ;
            history.push('/tasksToDo');
        }

        else{
            alert("Incorrect");
        }
    }
}