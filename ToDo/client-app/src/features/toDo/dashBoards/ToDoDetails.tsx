import { url } from "inspector";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Divider, Dropdown, Form, FormInput, FormTextArea, Grid, GridColumn, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Image from "../../../app/layout/images/flower.jpg";

export default observer (function ToDoDetails(){

    const {toDoStore} = useStore();

    const[newTaskToDo, setTaskToDo] = useState(toDoStore.selectedToDoTask);

    if (!newTaskToDo) return null;

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        if (!newTaskToDo) return null;
        const {name, value} = event.target;
        setTaskToDo({...newTaskToDo, [name] : value});
    }

    function handleMultiLineInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        if (!newTaskToDo) return null;
        const {name, value} = event.target;

        var textArray = toDoStore.divideText(newTaskToDo?.innerText)
        textArray[parseInt(name,10)] = value;
        var text = textArray.join('\n');

        setTaskToDo({...newTaskToDo, ['innerText'] : text});   
    }

    function AddTaskToList(){
        if (!newTaskToDo) return null;
        setTaskToDo({...newTaskToDo, ['innerText'] : newTaskToDo?.innerText + '\n'});
    }
    
    function deleteTaskFromList(index: number){
        if (!newTaskToDo) return null;
        
        var textArray = toDoStore.divideText(newTaskToDo?.innerText)
        textArray.splice(index, 1);
        var text = textArray.join('\n');
        setTaskToDo({...newTaskToDo, ['innerText'] : text});  
    }

    return(
        <Segment style={{backgroundImage:`url(${Image})`}}>
            <Form autoComplete = 'off' >
                <FormInput  value = {newTaskToDo.headerText} name='headerText' onChange={handleInputChange} />
                <Divider hidden />
                { !toDoStore.selectedToDoTask?.isList &&
                    <FormTextArea value = {newTaskToDo.innerText} name = 'innerText' onChange={handleInputChange} />
                }

                { toDoStore.selectedToDoTask?.isList &&
                     toDoStore.divideText(newTaskToDo?.innerText).map((task, index) => (
                        <Grid >
                            <GridColumn width = '14'>
                                <FormInput value = {task} name = {index} onChange={handleMultiLineInputChange} />
                            </GridColumn>
                            <GridColumn width = '2'>
                                <Button icon>
                                    <Icon name='delete' onClick = { () => deleteTaskFromList(index) }/>
                                </Button> 
                            </GridColumn>
                        </Grid> 
                     ))
                }
                <Divider hidden />

                <Dropdown icon='bars'  button className='icon'>
                    <Dropdown.Menu >
                        <Dropdown.Item  >
                            <Button style={{width:'100%'}} onClick = { () => toDoStore.setUnsetList(newTaskToDo) }  color='twitter' content='To list' />
                        </Dropdown.Item>

                        <Dropdown.Item >
                            <Button style={{width:'100%'}} onClick = { () => toDoStore.updateTaskToDo(newTaskToDo) }  color='green' content='Save' />
                        </Dropdown.Item>

                        <Dropdown.Item >
                            <Button style={{width:'100%'}} onClick = { () => toDoStore.deleteTaskToDo(newTaskToDo.id) } color='red' content='Delete' />
                        </Dropdown.Item>

                        <Dropdown.Item >

                            <Dropdown button text='' icon='images' style={{width:'100%'}} >
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button style={{width:'100%'}} color='teal' content='Earth' />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button style={{width:'100%'}} color='yellow' content='Flower' />
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button style={{width:'100%'}} color='green' content='Tree' />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

                <Button onClick = { toDoStore.unSelectTaskToDo } floated='right' color='grey' content='Cancel' />
                <Button onClick = { AddTaskToList } floated='right' color='green' content='Add Task' />
            </Form>
        </Segment>
    )
})