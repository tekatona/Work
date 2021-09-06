import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer ( function ToDoList(){

    const {toDoStore} = useStore();

    return(
        <Segment>
            <Item.Group divided >
                {toDoStore.tasksToDo.map( task=>( 
                    <Item key={task.id}>
                        <Item.Content>
                            <Button onClick={ () => toDoStore.selectTaskToDo(task.id)} content={task.headerText} />
                            {task.checked && 
                                <Button onClick={ () => toDoStore.setCheck(task)} content='UnDone' color='red'/>
                            }
                            {!task.checked && 
                                <Button onClick={ () => toDoStore.setCheck(task)} content='Done' color='green'/>
                            }
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})