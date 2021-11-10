import React from 'react';


import postDataWithAxios from "../../axios/MyPostAxios";
import MyButton from '../../../helper/MyButton';
import TagButton from '../tags/TagButton';

const URL_UPDATE_ENTRY = process.env.REACT_APP_URL_UPDATE_ENTRY
const URL_DELETE_DATAFIELD = process.env.REACT_APP_URL_DELETE_DATAFIELD;
const URL_ADD_OR_REMOVE_TAG = process.env.REACT_APP_URL_ADD_OR_REMOVE_TAG;

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
    return <div className="container mt-5 mb-5 border border-1 border-dark">
        <div className="row justify-content-center bg-success p-2">
            <h1>{ entry.title }</h1>
        </div>
        <div className="row bg-warning pt-3">
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
        : <div className="row justify-content-end bg-secondary p-3 ">
            <div className="col-8 text-end">
                <button onClick={() => clickFunction() } className="btn btn-danger">edit</button>
                </div>
            </div>
            }
    </div>
}


// form to edit entry
const showEntryForm = (allTags, entry, entryData, submitFunction, handleChangeFunction, handleDataChangeFunction, addDataField, deleteDataField, addFunction, removeFunction) => {

    return <div key={ entry.id } className="container bg-warning rounded mt-5 p-5" >
        <div className="row" >
            <h1 className="bg-success p-3 rounded">Eintrag bearbeiten</h1>
        </div>
        <div className="row">
            { Object.keys(allTags).map(function(keyName, keyIndex){
                return <div className="col-auto">
                    <TagButton key={ keyIndex } entry={ entry } tag={ allTags[keyName] } addFunction={ addFunction } removeFunction={ removeFunction } />
                </div>
            })}
        </div>
        <div className="row">
            <form onSubmit={event => submitFunction(event)}>
                <div className="row ">
                    <label htmlFor="title" className="form-label mb-2 mt-5">Titel</label>
                    <input onChange={event => handleChangeFunction(event) } type="text" name="title" defaultValue={ entry.title } className="form-control bg-light" autoFocus/>
                    <label htmlFor="desc" className="form-label mb-2 mt-5">Description</label>
                    <textarea rows="40" onChange={event => handleChangeFunction(event) } type="text" name="desc" defaultValue={ entry.desc } className="form-control bg-light" />
                    <div className="row mt-2">
                    {entryData ? <div> {Object.keys(entryData).map(function(keyName, keyIndex){
                        return <div key={keyIndex} className="row p-1 mt-2">
                            <div className="col-5">
                                <input name={ keyName } onChange={ event => handleDataChangeFunction(event, "key", keyName) } type="text" defaultValue={ keyName } className="form-control bg-light"/>
                            </div>
                            <div className="col-6">
                                <input name={ keyName } onChange={ event => handleDataChangeFunction(event, "value", keyName) } type="text" defaultValue={ entryData[keyName] } className="form-control bg-light"/>
                            </div>
                            <div className="col-1 text-end">
                                <MyButton key={ keyIndex } 
                                clickFunction={() => deleteDataField } params={ keyName } when={ 0 }
                                texts={[ "x", "wirklich löschen?", "gelöscht"]} classNames={ ["btn btn-success", "btn btn-danger", "btn btn-info"]} 
                                optionDisable={ true } />
                            </div>
                        </div>
                    })} </div>: ""}
                    <div className="row justify-content-center ">
                        <div className="col-8 text-center">
                            <button type="button" onClick={() => addDataField() } className="btn btn-info mt-3">add Datafield</button>
                        </div>
                    </div>
                    <div className="mt-5 text-end">
                        <button className="btn btn-success" type="submit">Eintrag ändern</button>
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
          //token: this.props.token,
          
          allTags: this.props.allTags,
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
        this.addTagFunc = this.addTagFunc.bind(this);
        this.remTagFunc = this.remTagFunc.bind(this);

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
          console.log(keyName)
          var id = this.state.entry.id;
          postDataWithAxios(URL_DELETE_DATAFIELD,{
              id:id,
              keyName:keyName,
          }, null, function(data){
              console.log(data)
          }, null)
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
            postDataWithAxios(URL_UPDATE_ENTRY, entryData,null, function(data){
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

      addTagFunc(tagId){
        console.log("entry add tag " + tagId)
        var entryId = this.state.entry.id;
        var self = this;
        postDataWithAxios(URL_ADD_OR_REMOVE_TAG, {
            entryId: entryId,
            tagId:tagId,
            removeFrom:0,
        }, null, function(data){
            self.setState({ entry: data.entry })
        }, null)

        
    }
    remTagFunc(tagId){
        console.log("entry remove " + tagId)
          var entryId = this.state.entry.id;
          var self = this;
          postDataWithAxios(URL_ADD_OR_REMOVE_TAG, {
              entryId: entryId,
              tagId: tagId,
              removeFrom:1,
          }, null, function(data){
              self.setState({ entry:data.entry })
          }, null)

      }

      render(){
          var allTags= this.state.allTags;
        var entry = this.state.entry;
        var entryData = this.state.data;
        var edit = this.state.edit;
        var toggleEdit = this.toggleEdit;
        var submitFunction = this.handleSubmit;
        var handleChangeFunction = this.handleChange;
        var handleDataChange = this.handleDataChange;
        var addDataField = this.addDataField;
        var deleteDataField = this.deleteDataField;
        var addTagFunc = this.addTagFunc;
        var remTagFunc = this.remTagFunc;

        return(
            edit ? showEntryForm(allTags,entry, entryData, submitFunction, handleChangeFunction, handleDataChange, addDataField, deleteDataField, addTagFunc, remTagFunc) 
            : showEntry(entry, entryData, toggleEdit)
        )
      }


}

export default Entry;