import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, FormInput, FormTextArea, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ToDoDetails(){

    const {toDoStore} = useStore();

    const[newTaskToDo, setTaskToDo] = useState(toDoStore.selectedToDoTask);


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        if (!newTaskToDo) return;
        const {name, value} = event.target;
        setTaskToDo({...newTaskToDo, [name] : value});
    }

    if (!newTaskToDo) return null;

    return(
        <Segment >
            <Form  autoComplete='off'>
                <FormInput  value = {newTaskToDo.headerText} name='headerText' onChange={handleInputChange} />
                <FormTextArea value = {newTaskToDo.innerText} name='innerText'onChange={handleInputChange} />
                <Button onClick = { () => toDoStore.updateTaskToDo(newTaskToDo) }  color='green' content='Save' />
                <Button onClick = { toDoStore.unSelectTaskToDo } floated='right' color='grey' content='Cancel' />
                <Button onClick = { () => toDoStore.deleteTaskToDo(newTaskToDo.id) } floated='right' color='red' content='Delete' />           
            </Form>
        </Segment>
    )
})