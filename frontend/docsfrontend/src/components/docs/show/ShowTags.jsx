import React from 'react';


import postDataWithAxios from '../../axios/MyPostAxios';
import getDataWithAxios from "../../axios/MyGetAxios";
import NewTag from "./NewTag";


const URL_ADD_NEW_TAG = process.env.REACT_APP_URL_ADD_NEW_TAG
const URL_GET_ALL_TAGS = process.env.REACT_APP_URL_GET_ALL_TAGS;


class ShowTags extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          addOne: false, // add new Tag or show tags
          allTags: "",
          // new Tag
          newTagName: "",
          
        }
        this.newTagForm = this.newTagForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
       

      componentDidMount() {
        // Add new Tag
        if(this.props.addOne){
          this.setState({ addOne: true })
        }

        // tags to show
        var self = this;
          getDataWithAxios(URL_GET_ALL_TAGS, function(data){
              self.setState({ allTags: data.allTags });
          });
    }


      newTagForm() {
        this.setState({ addOne: true })
      }

      handleChange(event) {    
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value    });
    }

    handleSubmit(event) {
      event.preventDefault();
      var newTagName = this.state.newTagName;
 
      var self = this;
      postDataWithAxios(URL_ADD_NEW_TAG, { name: newTagName }, null, function(data){
        self.setState({ allTags: data.allTags })
        self.setState({ addOne: false })
      }, null)
    }

      render(){
        var addOne = this.state.addOne; // add new / show existing
        var allTags = this.state.allTags; // tags to select
        var selectTagFunc = this.props.selectTagFunc; // add tag in Main.jsx
        var handleChange = this.handleChange;
        var handleSubmit = this.handleSubmit;
        return(
          <div className="container">
            { addOne ? <NewTag handleChange={handleChange} handleSubmit={handleSubmit} /> 
            : <div className="row">
                {Object.keys(allTags).map(function(keyName, keyIndex){
                  return <div className="col-auto m-2 " key={ keyIndex }>
                      <button onClick={() => selectTagFunc(allTags[keyName]) } className="btn btn-info">{ allTags[keyName].name }</button>
                    </div>
                })}
              </div>}
          </div>
        )
      }


}

export default ShowTags;