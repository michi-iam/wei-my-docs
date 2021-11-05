import React from 'react';


import postDataWithAxios from "../../axios/MyPostAxios";


const URL_UPDATE_ENTRY = process.env.REACT_APP_URL_UPDATE_ENTRY


const renameObjectKey = (object, oldName, newName) => {
    const updatedObject = {}
    for(let key in object) {
        if (key === oldName) {
            updatedObject[newName] = object[key]
        } else {
            updatedObject[key] = object[key]
        }
    }
    object = updatedObject
    return object
  }


// show entrys (no edit)
const showEntry = (entry, entryData, clickFunction) => {
    return <div className="container mt-3">
        <div className="row justify-content-center bg-danger">
            <h1>{ entry.title }</h1>
        </div>
        <div className="row bg-warning">
            { entry.desc ? <p style={{ whiteSpace: "pre" }}>{ entry.desc }</p> : "" }
        </div>
        {entryData ? Object.keys(entryData).map(function(keyName, keyIndex){
            return <div key={ keyIndex } className="row bg-info">
                <div className="col-6">
                    <p>{ keyName }</p>
                </div>
                <div className="col-6">
                    <p>{ entryData[keyName] }</p>
                </div>
                </div>
        }) : ""}
        { entry.title === "nichts gefunden" ? "" 
        : <div className="row justify-content-center">
            <div className="col-8">
                <button onClick={() => clickFunction() } className="btn btn-warning">edit</button>
                </div>
            </div>
            }
    </div>
}


// form to edit entry
const showEntryForm = (entry, entryData, submitFunction, handleChangeFunction, handleDataChangeFunction, addDataField, deleteDataField) => {
    return <div className="container bg-danger p-5" >
        <div className="row" >
            <h1>Eintrag bearbeiten</h1>
        </div>
        <div className="row">
            <form onSubmit={event => submitFunction(event)}>
                <div className="row ">
                    <label htmlFor="title" className="form-label">Titel</label>
                    <input onChange={event => handleChangeFunction(event) } type="text" name="title" defaultValue={ entry.title } className="form-control" autoFocus/>
                    <label htmlFor="desc" className="form-label">Description</label>
                    <textarea onChange={event => handleChangeFunction(event) } type="text" name="desc" defaultValue={ entry.desc } className="form-control" />
                    <div className="row mt-2">
                    {entryData ? <div> {Object.keys(entryData).map(function(keyName, keyIndex){
                        return <div key={keyIndex} className="row bg-info p-1 mt-2">
                            <div className="col-5">
                                <input name={ keyName } onChange={ event => handleDataChangeFunction(event, "key", keyName) } type="text" defaultValue={ keyName } className="form-control"/>
                            </div>
                            <div className="col-6">
                                <input name={ keyName } onChange={ event => handleDataChangeFunction(event, "value", keyName) } type="text" defaultValue={ entryData[keyName] } className="form-control"/>
                            </div>
                            <div className="col-1">
                                <button onClick={() => deleteDataField(keyName) } className="btn btn-danger">X</button>
                            </div>
                        </div>
                    })} </div>: ""}
                    <div>
                        <button type="button" onClick={() => addDataField() }>add</button>
                    </div>
                    <div>
                        <button type="submit">ändern</button>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
}


class Entry extends React.Component {
    
    constructor(props){
        super(props)
        
        this.state = {
          edit: false, // 0: showEntry or 1: showEntryForm  
          token: this.props.token,
          
          entry: this.props.entry,

          id: this.props.entry.id,
          title: this.props.entry.title,
          desc: this.props.entry.desc,
          data: this.props.entry.data,
        }

        this.toggleEdit = this.toggleEdit.bind(this); // edit or show
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this); // handle change for entry.data 
        this.addDataField = this.addDataField.bind(this);
        this.deleteDataField = this.deleteDataField.bind(this);

      }

      // add field to entry.data
      addDataField() {
          var data = this.state.data;
          if(data){
              data[""] = "";
          }
          else {
              data = {"":""}
          }
          this.setState({ data: data });

      }

      deleteDataField(keyName) {
          console.log(this.state.data)
          var data = this.state.data;
          delete(data[keyName])
          console.log(data)

      }

      toggleEdit() {
          this.state.edit ? this.setState({ edit: false }) : this.setState({ edit: true });
      }


      handleChange(event) {    
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value    });
    }

    handleDataChange(event, keyOrValue, keyName) {
        var value = event.target.value;
        var data = {...this.state.data};

        if(keyOrValue === "value"){
            data[keyName] = value;
            this.setState({ data: data })
        }
        if(keyOrValue === "key") {
            data = renameObjectKey(data, keyName, value)
            this.setState({ data: data})
        }
    }



      handleSubmit(event) {
        event.preventDefault();
          console.log("starte submit")
            var entryData = {
                "id": this.state.entry.id,
                "title": this.state.title,
                "desc": this.state.desc,
                "data": this.state.data,
            }

            var self = this;
            postDataWithAxios(URL_UPDATE_ENTRY, entryData,this.state.token, function(data){
                self.setState({ entry: data.entry })
                self.setState({ title: data.entry.title })
                self.setState({ desc: data.entry.desc })
                self.setState({ data: data.entry.data })
                self.setState({ edit: false})
                console.log("data vong server")
                console.log(data)
            }, function(){
                console.log("fail")
            })
      }

      render(){
        var entry = this.state.entry;
        var entryData = this.state.data;
        var edit = this.state.edit;
        var toggleEdit = this.toggleEdit;
        var submitFunction = this.handleSubmit;
        var handleChangeFunction = this.handleChange;
        var handleDataChange = this.handleDataChange;
        var addDataField = this.addDataField;
        var deleteDataField = this.deleteDataField;
        return(
            edit ? showEntryForm(entry, entryData, submitFunction, handleChangeFunction, handleDataChange, addDataField, deleteDataField) 
            : showEntry(entry, entryData, toggleEdit)
        )
      }


}

export default Entry;