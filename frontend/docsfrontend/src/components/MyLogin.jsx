import React from 'react';


import { Redirect } from 'react-router';


import postDataWithAxios from "./axios/MyPostAxios";



const URL_OBTAIN_TOKEN = process.env.REACT_APP_URL_OBTAIN_TOKEN;


class MyLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            loggedIn: this.props.loggedIn,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      handleChange(event) {    
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value    });
    }

    // get tokens
    handleSubmit(event) {
        event.preventDefault();
        var username = this.state.username;
        var password = this.state.password;
        console.log(username)
        console.log(password)

        var self = this;
        postDataWithAxios(URL_OBTAIN_TOKEN, {
          username: username,
          password: password,
        }, null, function(data){
          self.props.setToken(data.access, data.refresh) // pass to app.js
          self.setState({ loggedIn: true })
          window.location.reload(false);
        }, function(){
          self.setState({ loggedIn: false })
        })
  
      }

      render(){
          return(
             this.state.loggedIn ? <Redirect to="/" /> :
             <div>
             <form onSubmit={ this.handleSubmit }>
                 <input onChange={ this.handleChange } name="username" type="text" placeholder="username" />
                 <input onChange={ this.handleChange } name="password" type="password" placeholder="passwort" />
                 <button type="submit">login</button>
             </form>
         </div>
          )
      }
}


export default MyLogin;