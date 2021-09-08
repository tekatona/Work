import React, { ChangeEvent, useState } from "react";
import { Button, Form, FormInput, FormTextArea, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default function ToDoCreate(){

    const {toDoStore} = useStore();

    const initialTask = {
        id: 0,
        headerText : '',
        innerText : '',
        user_id : 0,
        checked: false,
        isList: false
    }

    const[newTaskToDo, setTaskToDo] = useState(initialTask);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setTaskToDo({...newTaskToDo, [name] : value});
    }

    return(
        <Segment>
            <Form autoComplete='off'>
                <FormInput placeholder='Title' name='headerText' onChange={handleInputChange} />
                <FormTextArea placeholder='Text' name='innerText' onChange={handleInputChange} />
                <Button onClick = { () => toDoStore.createTaskToDo(newTaskToDo) } color='green' content='Save' />
                <Button onClick = { () => toDoStore.unSetCreatingMode() } floated='right' color='grey' content='Cancel' />
            </Form>
        </Segment>
    )
}