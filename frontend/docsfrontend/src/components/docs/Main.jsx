import React from 'react';


import { Redirect } from 'react-router';


import getDataWithAxios from "../axios/MyGetAxios";
import postDataWithAxios from "../axios/MyPostAxios";
import ShowTags from './show/ShowTags';
import Entry from "./entries/Entry";



const URL_GET_MAIN_CONTEXT = process.env.REACT_APP_URL_GET_MAIN_CONTEXT;
const URL_GET_ENTRIES_BY_TAGS = process.env.REACT_APP_URL_GET_ENTRIES_BY_TAGS;


// Tags anzeigen, die ausgewählt wurden 
// Such-Button
const showSelectedTags = (selectedTags, removeSelectedTag, getEntriesByTags) => {
    return selectedTags.length > 0 ? <div className="row">
   { selectedTags.map((tag, i) => { return <div key={ i } className="col-auto">
            <button onClick={() => removeSelectedTag(tag) } className="btn btn-success">{ tag.name }</button>
        </div> } ) } <div className="row justify-content-center">
          <div className="col-8">
            <div className="row">
              <button className="btn btn-warning mt-2" onClick={() => getEntriesByTags(selectedTags) }>suchen</button>
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

    render () {
     var contextReady = this.state.contextReady;
     var selectedTags = this.state.selectedTags;
     var entriesToShow = this.state.entriesToShow;
     var loggedIn = this.state.loggedIn;
     const token = this.state.token;

      return loggedIn ? <div className='container'>
                            <h1>Main</h1>
                            { contextReady ? <ShowTags allTags={ this.state.allTags } selectTag={ this.selectTag } /> 
                            : "" }
                            { showSelectedTags(selectedTags, this.removeSelectedTag, this.getEntriesByTags) }
                            { showEntriesToShow(entriesToShow, token) }
                          </div>  
    : <Redirect to="/login" />
    }

    
  }

export default Main;
  