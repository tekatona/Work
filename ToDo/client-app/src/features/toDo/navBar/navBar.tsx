import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default function NavBar() {

    const{toDoStore} = useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    Teka Keep
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => toDoStore.setCreatingMode() } positive content='New task'/>
                    <Button style={{marginLeft : "600%" }} as = {NavLink} to='/' color='twitter' content='LogOut' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}