import React from 'react';


import { Redirect } from 'react-router';


import getDataWithAxios from "../axios/MyGetAxios";
import postDataWithAxios from "../axios/MyPostAxios";
import ShowTags from './show/ShowTags';
import Entry from "./entries/Entry";
import NewEntry from './entries/NewEntry';



const URL_GET_MAIN_CONTEXT = process.env.REACT_APP_URL_GET_MAIN_CONTEXT;
const URL_GET_ENTRIES_BY_TAGS = process.env.REACT_APP_URL_GET_ENTRIES_BY_TAGS;


// Tags anzeigen, die ausgewählt wurden 
// Such-Button
const showSelectedTags = (selectedTags, removeSelectedTag, getEntriesByTags) => {
    return selectedTags.length > 0 ? <div className="row mt-3">
      <div className="row justify-content-center">
        <div className="col-8 text-center">
          <h3 className="myPageTitle">ausgewählte Tags</h3>
        </div>
      </div>
        <div className="row justify-content-center">
    { selectedTags.map((tag, i) => { return <div key={ i } className="col-auto">
              <button onClick={() => removeSelectedTag(tag) } className="btn btn-success">{ tag.name }</button>
          </div> } ) } <div className="row justify-content-center">
            <div className="col-8">
              <div className="row mt-2">
                <button className="btn btn-warning mt-2" onClick={() => getEntriesByTags(selectedTags) }>suchen</button>
              </div>
            </div>
          </div>
      </div>
    </div>
    :
    <div></div> 
}


const showEntriesToShow = ( entriesToShow, token ) => {
  return Object.keys(entriesToShow).map(function(keyName, keyIndex){
    return <Entry key={ keyIndex } entry={ entriesToShow[keyName] } token={ token } />
  })
}


class Main extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        addNewEntry: false, // get form to add new entry
        token: this.props.token,
        loggedIn: true,
        contextReady: false,
        allEntries: [],
        allTags: [],
        selectedTags: [],
        entriesToShow: [],
    }
    this.selectTag = this.selectTag.bind(this);
    this.removeSelectedTag = this.removeSelectedTag.bind(this);
    this.getEntriesByTags = this.getEntriesByTags.bind(this);
    this.addNewEntryForm = this.addNewEntryForm.bind(this);
  
  }


  componentDidMount() {
    var self = this;
    getDataWithAxios(URL_GET_MAIN_CONTEXT, function(data){
       self.setState({ allEntries: data.allEntries });
       self.setState({ allTags: data.allTags });
       self.setState({ contextReady: true })
     });


  }

  // Tags in ShowTags.jsx auswählen
  selectTag(tag){
    this.setState({ selectedTags: [...this.state.selectedTags, tag ] }) 
  }

  // Tags in showSelectedTags() entfernen
  removeSelectedTag(tag){
      this.setState({ selectedTags: this.state.selectedTags.filter(function(selectedTag){
        return selectedTag !== tag
    })})
    this.setState({ entriesToShow: []})
  }

  getEntriesByTags(selectedTags){
      var self = this;

      postDataWithAxios(URL_GET_ENTRIES_BY_TAGS,{selectedTags: selectedTags}, this.state.token,
        function(data){
          self.setState({ entriesToShow: data.entriesToShow })
        }, function(){
          self.setState({ loggedIn: false })
        })
  }

  addNewEntryForm() {
    this.setState({ addNewEntry: true })
  }

    render () {
     var contextReady = this.state.contextReady;
     var selectedTags = this.state.selectedTags;
     var entriesToShow = this.state.entriesToShow;
     var loggedIn = this.state.loggedIn;
     const addNewEntryForm = this.addNewEntryForm;
     var addNewEntry = this.state.addNewEntry;
     const token = this.state.token;
     var allTags = this.state.allTags

      return loggedIn ? <div className='container'>
                        { addNewEntry ? <NewEntry token={ token } allTags={ allTags }/>
                        : <div> 
                            <div className="row text-center mt-5">
                              <h1 className="myPageTitle">Suchen</h1>
                            </div>
                            { contextReady ? <ShowTags allTags={ this.state.allTags } selectTag={ this.selectTag } token={ token } /> 
                            : "" }
                            { showSelectedTags(selectedTags, this.removeSelectedTag, this.getEntriesByTags) }
                            { showEntriesToShow(entriesToShow, token) }

                            {/* <button onClick={() => addNewEntryForm() }>neuer Eintrag</button> */}
                          </div>}
                          </div>  
    : <Redirect to="/login" />
    }

    
  }

export default Main;
  