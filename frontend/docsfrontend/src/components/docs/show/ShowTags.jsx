import React from 'react';
import postDataWithAxios from '../../axios/MyPostAxios';


const URL_ADD_NEW_TAG = process.env.REACT_APP_URL_ADD_NEW_TAG


const addTagForm = (handleChange, handleSubmit) => {
  return <div className="row">
    <div className="row">
      <h4>neuer Tag</h4>
    </div>
    <div className="row">
      <form onSubmit={event => handleSubmit(event) }>
        <input type="text" name="newTagName" onChange={event => handleChange(event)} />
        <button type="submit">eintragen</button>
      </form>
    </div>
  </div>
}


class ShowTags extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          addOne: false,
          allTags: "",
          newTagName: "",
          
        }
        this.newTagForm = this.newTagForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
       

      componentDidMount(){
        this.setState({ allTags: this.props.allTags })
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
      console.log(newTagName)
      var self = this;
      postDataWithAxios(URL_ADD_NEW_TAG, { name: newTagName }, this.props.token, function(data){
        self.setState({ allTags: data.allTags })
        self.setState({ addOne: false })
      }, null)
    }

      render(){
        var allTags = this.state.allTags;
        var selectTag = this.props.selectTag;
        var addOne = this.state.addOne;
        var newTagForm = this.newTagForm;
        var handleChange = this.handleChange;
        var handleSubmit = this.handleSubmit;
        return(
          <div className="row">
            <div className="row">
                <button onClick={() => newTagForm() }>neuer Tag</button>
            </div>
            { addOne ? addTagForm(handleChange, handleSubmit)
            : <div className="row">
                {Object.keys(allTags).map(function(keyName, keyIndex){
                  return <div className="col-auto m-2 " key={ keyIndex }>
                      <button onClick={() => selectTag(allTags[keyName]) } className="btn btn-info">{ allTags[keyName].name }</button>
                    </div>
                })}
              </div>}
          </div>
        )
      }


}

export default ShowTags;