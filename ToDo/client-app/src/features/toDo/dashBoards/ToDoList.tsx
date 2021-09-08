import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Checkbox, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer ( function ToDoList(){

    const {toDoStore} = useStore();

    return(
        <Segment>
            <Item.Group divided >
                {toDoStore.tasksToDo.slice().sort((a) => a.checked ? 1 : -1).map( task=>(
                    <Item key={task.id}>
                        <Item.Content >
                            <Button onClick={ () => toDoStore.selectTaskToDo(task.id)} content={task.headerText} />
                            { task.checked && 
                                <Checkbox fitted checked onClick={ () => toDoStore.setCheck(task)} />
                            }
                            { !task.checked &&
                                <Checkbox fitted onClick={ () => toDoStore.setCheck(task)} />
                            }
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})