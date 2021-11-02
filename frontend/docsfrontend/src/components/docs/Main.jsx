import React from 'react';
import axios from "axios";


import ShowTags from './show/ShowTags';
import { Redirect } from 'react-router';

const URL_GET_MAIN_CONTEXT = process.env.REACT_APP_URL_GET_MAIN_CONTEXT;
const URL_GET_ENTRIES_BY_TAGS = process.env.REACT_APP_URL_GET_ENTRIES_BY_TAGS;


// Tags anzeigen, die ausgewählt wurden 
// Such-Button
const showSelectedTags = (selectedTags, removeSelectedTag, getEntriesByTags) => {
    console.log("show")
    console.log(selectedTags)
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


const showEntriesToShow = ( entriesToShow ) => {
  return Object.keys(entriesToShow).map(function(keyName, keyIndex){
    return <p key={ keyIndex }>{ entriesToShow[keyName].title }</p>
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
    console.log("main hat token")
    console.log(this.state.token)

    axios.get(URL_GET_MAIN_CONTEXT)
    .then(res => {
      const data = res.data;
      console.log("data Mount Main");
      console.log(data);
      this.setState({ allEntries: data.allEntries });
      this.setState({ allTags: data.allTags });
      this.setState({ contextReady: true })
    })
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
  }

  getEntriesByTags(selectedTags){
    console.log("this.state.token")
    console.log(this.state.token)
      var self = this;
        axios.defaults.headers.common["Authorization"] = this.state.token; 
        axios.post(URL_GET_ENTRIES_BY_TAGS, {
          selectedTags: selectedTags
  
        })
        .then(function (response) {
          console.log("entriesToShow")
          console.log(response.data.entriesToShow)
          self.setState({ entriesToShow: response.data.entriesToShow })
    
    
        })
        .catch(function (error) {
          console.log("error ist: ")
          if(error.response.status === 401){
            console.log("hier")
            self.setState({ loggedIn: false })
          }
          console.log(error);
        });

  }

    render () {
     var contextReady = this.state.contextReady;
     var selectedTags = this.state.selectedTags;
     var entriesToShow = this.state.entriesToShow;
     var loggedIn = this.state.loggedIn;

      return loggedIn ? <div className='container'>
                            <h1>Main</h1>
                            { contextReady ? <ShowTags allTags={ this.state.allTags } selectTag={ this.selectTag } /> 
                            : "" }
                            { showSelectedTags(selectedTags, this.removeSelectedTag, this.getEntriesByTags) }
                            { showEntriesToShow(entriesToShow) }
                          </div>  
    : <Redirect to="/login" />
    }

    
  }

export default Main;
  