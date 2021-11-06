import React from 'react';
import postDataWithAxios from "../../axios/MyPostAxios"; 
import getDataWithAxios from "../../axios/MyGetAxios";
import Entry from "./Entry";

const URL_ADD_NEW_ENTRY = process.env.REACT_APP_URL_ADD_NEW_ENTRY;
const URL_GET_ALL_TAGS = process.env.REACT_APP_URL_GET_ALL_TAGS;

class TagButton extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
          tag: this.props.tag,
          addFunction: this.props.addFunction,
          removeFunction: this.props.removeFunction,
          selected: false, 
  
        }
        this.selectTag = this.selectTag.bind(this);
        this.addFunction = this.props.addFunction.bind(this);
        this.removeFunction = this.props.removeFunction.bind(this);
      }

      selectTag() {
          console.log("SELECT TAG")
        var selected = this.state.selected;
        if(selected){
            this.setState({ selected: false })
            this.removeFunction(this.state.tag.id)
        }
        else{
            this.setState({ selected: true })
            this.addFunction(this.state.tag.id)
        }
      }

    render(){
        const tag = this.state.tag;
        const selectTag = this.selectTag;
        var selected = this.state.selected;
        return(
        <button onClick={() => selectTag() } className={ selected ? "btn btn-success" : "btn btn-danger text-success fw-bolder"}>{ tag.name }</button>
        )
    }
}


const addNewEntryForm = (handleChange, handleSubmit, addFunction, removeFunction, allTags) => {
    return <div className="bg-warning p-5">
        <div className="row text-center">
            <h4 className="myPageTitle">Neuer Eintrag</h4>
        </div>
        <div className="row text-center">
            <h6>Tags auswählen</h6>
        </div>
        <div className="row bg-light p-3 rounded justify-content-center">
                 {Object.keys(allTags).map(function(keyName, keyIndex){
                  return <div className="col-auto m-2" key={ keyIndex }>
                      { <TagButton tag={ allTags[keyName] } addFunction={ addFunction } removeFunction={ removeFunction } /> }
                    </div>
                })}
        </div>
        <form onSubmit={ event => handleSubmit(event) } className="mt-5">
            <input onChange={ event => handleChange(event )} type="text" name="title" placeholder="Titel" className="form-control bg-light" />
            <textarea onChange={ event => handleChange(event )} name="desc" cols="50" rows="40" className="form-control bg-light mt-3" placeholder="Beschreibung"></textarea>
            <div className="row justify-content-end">
                <div className="col-auto mt-3">
                    <button className="btn btn-success" type="submit">eintragen</button>
                </div>
            </div>


        </form>
    </div>
}


class NewEntry extends React.Component {
    
    constructor(props){
        super(props)
        
        this.state = {
          allTags: [], // mount -> all tags to choose from

          // New Item
          entry: null, // entry added after submit
          tags: [], // selected tags
          title: "",
          desc: "",
  
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        
      }

      componentDidMount() {
            var self = this;
            getDataWithAxios(URL_GET_ALL_TAGS, function(data){
                self.setState({ allTags: data.allTags });
            });
      }


      handleChange(event) {    
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value    });
    }

    addTag(id){
        var tags = this.state.tags;
        tags.push(id)
        this.setState({ tags: tags })
    }

    removeTag(id){
        var tags = this.state.tags;
        this.setState({tags: tags.filter(function(tagId) { 
            return tagId !== id
        })});
    }


    handleSubmit(event){
        event.preventDefault();
        var tags = this.state.tags;
        var title = this.state.title;
        var desc = this.state.desc;
        
        var self = this;
        postDataWithAxios(URL_ADD_NEW_ENTRY, {
            tags: tags,
            title: title,
            desc: desc,
        }, null, function(data){
            self.setState({ entry: data.entry })
        }, null)


    }

    render(){
        var allTags = this.state.allTags;
        var entry = this.state.entry;
      
        return(
            entry ? <Entry entry={ entry } /> :
            addNewEntryForm(this.handleChange, this.handleSubmit, this.addTag, this.removeTag, allTags)
        )
    }

    }



export default NewEntry