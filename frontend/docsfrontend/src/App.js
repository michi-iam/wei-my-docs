import './App.css';
import React from 'react';
import MyLogin from './components/MyLogin';
import Main from './components/docs/Main';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function setToken(userToken, userRefreshToken) {
  console.log("userToken")
  console.log(userToken)
  userToken = "Bearer " + userToken;
  sessionStorage.setItem('token', userToken);
  sessionStorage.setItem("refreshtoken", userRefreshToken)

}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = tokenString;
  console.log("usertoken erhalten")
  console.log(userToken);
  return userToken
}




function App() {
  var token = getToken();

    return (
      <Router>
        { token ? <Switch>
                    <Route path="/login" component={ MyLogin }>
                          <MyLogin setToken={ setToken } /> 
                        </Route>
                    <Route path="/">
                        <Main token={ token } />      
                    </Route>
                  </Switch> 
        : <MyLogin setToken={ setToken} /> }
      </Router>
    );




}

export default App;
