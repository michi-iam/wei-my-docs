import React from "react";

function entryExists(tags, tag) {
    return tags.some(function(el) {
      return el.name === tag.name;
    }); 
  }

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

      componentDidMount(){
          var entry = this.props.entry;
          if(entry){
              console.log("ENTRY : " + entry.tag)
            if(entry.tag){
                console.log(entry.tag)
                console.log(this.state.tag)
                if(entryExists(entry.tag, this.state.tag)){
                    this.setState({ selected: true })
                }
            }
          }
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

export default TagButton;