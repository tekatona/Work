import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, FormInput, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function LoginPage(){

    const {userStore} = useStore();

    const initialUser = {
        id: 0,
        login : '',
        password : ''
    }

    const[newUser, setUser] = useState(initialUser);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setUser({...newUser, [name] : value});
    }

    return(
        <Segment >
            <Form>
                <h1> Registration </h1> 
                <FormInput placeholder='Login'  name='login' onChange={handleInputChange} />
                <FormInput placeholder='Password' name='password'onChange={handleInputChange} />
                <Button onClick={ () => userStore.createUser(newUser) } color='twitter' content='Register' />
                <Button floated='right' as={NavLink} to ='/' color='twitter' content='Have account?' />
            </Form>
        </Segment>
    )
})