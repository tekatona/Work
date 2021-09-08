import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import EarthImage from "../../../app/layout/images/earth.jpg";
import FlowerImage from "../../../app/layout/images/flower.jpg";
import TreeImage from "../../../app/layout/images/tree.jpg";

export default class ToDoStore{

    constructor(){
        makeAutoObservable(this);
    }

    getImageById(id:number){
        
    }
}