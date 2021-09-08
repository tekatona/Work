import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import NavBar from "../navBar/navBar";
import ToDoCreate from "./ToDoCreate";
import ToDoDetails from "./ToDoDetails";
import ToDoList from "./ToDoList";


export default observer (function ToDoDashBoard(){

    useEffect( () => {
        toDoStore.loadTasksToDo();
    }, [])
    
    const {userStore} = useStore();
    const {toDoStore} = useStore();

    return(
        <Grid>
            {console.log(userStore.user?.id + "!!!!")}
            <NavBar />
            <Grid.Column width={6}>
                <ToDoList />
            </Grid.Column>
            <Grid.Column width={10}>
                {toDoStore.selectedToDoTask &&
                <ToDoDetails />}
                {toDoStore.creatingMode &&
                <ToDoCreate />}
            </Grid.Column>
        </Grid>
    )
})