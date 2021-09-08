import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { TaskToDo } from "../models/taskToDo"
import { store } from "./store";

export default class ToDoStore{

    tasksToDo: TaskToDo[] = [];
    selectedToDoTask: TaskToDo | undefined = undefined;
    creatingMode=false;

    constructor(){
        makeAutoObservable(this)
    }

    sortedByDoneTasks = () => {
        return this.tasksToDo.sort((a,b) => a.checked == b.checked ? 1 : -1);
    }

    loadTasksToDo = async () => {
        try{
            if(!store.userStore.user?.id) return

            const tasksToDo = await agent.TasksToDo.list(store.userStore.user?.id);
            
            runInAction(()=>{
                this.tasksToDo = tasksToDo;
            });
        }
        catch(error){
            console.log(error)
        }
    }

    createTaskToDo = async(taskToDo: TaskToDo) => {
        
        if(!store.userStore.user?.id) return

        taskToDo.user_id = store.userStore.user.id;
        
        await agent.TasksToDo.create(taskToDo);
        
        this.loadTasksToDo(); 
    }

    deleteTaskToDo = async(id: number) => {
        await agent.TasksToDo.delete(id)
        this.unSelectTaskToDo();
        this.loadTasksToDo();
    }

    updateTaskToDo = async(taskToDo: TaskToDo) => {
        await agent.TasksToDo.update(taskToDo);
        this.loadTasksToDo();
    }

    selectTaskToDo = (id: number) => {
        this.selectedToDoTask = this.tasksToDo.find(x=>x.id === id);
        console.log(this.selectedToDoTask?.headerText);
    }

    unSelectTaskToDo = () => {
        this.selectedToDoTask = undefined;
    }

    setCreatingMode = () => {
        this.creatingMode = true;
    }

    unSetCreatingMode = () => {
        this.creatingMode = false;
    }

    setCheck = (taskToDo: TaskToDo) => {
        if(taskToDo.checked){
            taskToDo.checked = false;
        }
        else{
            taskToDo.checked = true;
        }

        this.updateTaskToDo(taskToDo);
    }

    setUnsetList = (taskToDo: TaskToDo) => {
        if(taskToDo.isList){
            taskToDo.isList = false;
        }
        else{
            taskToDo.isList = true;
        }

        this.updateTaskToDo(taskToDo);
    }
    
    divideText = (text:string) =>{
        return text.split("\n");
    }   
}