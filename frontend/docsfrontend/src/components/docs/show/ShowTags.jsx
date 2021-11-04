import React from 'react';



class ShowTags extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          allTags: "",
          
        }
    
      }
       
      componentDidMount(){
        this.setState({ allTags: this.props.allTags })
      }

      render(){
        var allTags = this.state.allTags;
        var selectTag = this.props.selectTag;
        return(
          <div className="row">
            {Object.keys(allTags).map(function(keyName, keyIndex){
              return <div className="col-auto m-2 " key={ keyIndex }>
                  <button onClick={() => selectTag(allTags[keyName]) } className="btn btn-info">{ allTags[keyName].name }</button>
                </div>
            })}
          </div>
        )
      }


}

export default ShowTags;