import React from 'react';
import {  Container,  } from 'semantic-ui-react';
import ToDoDashBoard from '../../features/toDo/dashBoards/ToDoDashBoard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import LoginPage from '../../features/home/LoginPage';
import RegistrationPage from '../../features/home/RegistrationPage';

function App() {
  return (
    <>
      <Container style={{marginTop : "7%" }}>
          <Route exact path='/' component = {LoginPage}/>
          <Route path='/Register' component = {RegistrationPage} />
          <Route path='/tasksToDo' component = {ToDoDashBoard}/>
      </Container>
    </>
  );
}
export default observer(App);
