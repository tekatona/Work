import { createContext, useContext } from "react";
import ToDoStore from "./toDoStore";
import UserStore from "./userStore";

interface Store{
    toDoStore: ToDoStore
    userStore: UserStore
}

export const store: Store = {
    toDoStore: new ToDoStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}