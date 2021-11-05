import React from "react";


const addTagForm = (handleChange, handleSubmit) => {
    return <div className="bg-warning mt-5 p-3 pt-5">
      <div className="row justify-content-center">
            <div className="col-8 text-center">
              <h4 className="myPageTitle">Neuer Tag</h4>
            </div>
        </div>
      <div className="row">
        <form onSubmit={event => handleSubmit(event) }>
       
            <input type="text" name="newTagName" onChange={event => handleChange(event)} placeholder="Name" className="form-control bg-light"/>
         <div className="row justify-content-end mt-3">
          <div className="col-auto">
          <button className="btn btn-success" type="submit">eintragen</button>  
          </div>
         </div>
      
        </form>
      </div>
    </div>
  }


class NewTag extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          handleChange: this.props.handleChange,
          handleSubmit: this.props.handleSubmit,
          
        }
        this.handleChange = this.state.handleChange.bind(this);
        this.handleSubmit = this.state.handleSubmit.bind(this);
      }

    render() {
        return(
            addTagForm(this.handleChange, this.handleSubmit)
        )
    }
    
}

export default NewTag

