import './App.css';
import React from 'react';
import MyLogin from './components/MyLogin';
import Main from './components/docs/Main';
import MyNavbar from "./components/navbar/MyNavbar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import NewEntry from './components/docs/entries/NewEntry';
import ShowTags from './components/docs/show/ShowTags';


// tokens to sessionstorage
function setToken(userToken, userRefreshToken) {
  userToken = "Bearer " + userToken;
  sessionStorage.setItem('token', userToken);
  sessionStorage.setItem("refreshtoken", userRefreshToken)

}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = tokenString;
  return userToken
}




function App() {
  var token = getToken();

    return (
      <>
      <Router>
        { token ? <>
          <MyNavbar />
            <Switch>
              <Route path="/login" >
                <MyLogin setToken={ setToken } /> 
              </Route>
              <Route path="/newtag" >
                <ShowTags addOne={ true } />
              </Route>
              <Route path="/new"  >
                <NewEntry />
              </Route>
              <Route path="/">
                  <Main />      
              </Route>
            </Switch> 
        </>
        : <MyLogin setToken={ setToken} /> }
      </Router>
      </>
    );




}

export default App;
