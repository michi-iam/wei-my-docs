import React from "react";


class MyButton extends React.Component {

       
    constructor(props){
        super(props)
        
        this.state = {
          clicked: false, 
          clickFunction: null,
          params: null,
          when: 1,
          
          timesClicked: 0,
          texts: [],
          classNames: [],
          currentText: "",
          currentClassName: "",

          optionDisable: false,
          isDisabled: false, 

          optionDisapear: false,
          isGone: false,





        }
       this.handleClick = this.handleClick.bind(this);
    }
    

    componentDidMount(){

        var clickFunction = this.props.clickFunction;
        if(clickFunction){ 
            this.setState({ clickFunction: clickFunction })
            var params = this.props.params;
            if(params){ this.setState({ params:params }) }
        }
    
        var texts = this.props.texts;
        if(texts){
            console.log(texts)
            this.setState({
                texts: texts,
                currentText: texts[0],
            })
        }
        

       
        var classNames = this.props.classNames;
        if(classNames){
            this.setState({
                classNames: classNames,
                currentClassName:classNames[0],
            })
        }

        var optionDisable = this.props.optionDisable;
        if(optionDisable){
            this.setState({ optionDisable: true })
        }
        var optionDisapear = this.props.optionDisapear;
        if(optionDisapear){
            this.setState({ optionDisapear: true })
        }

        var when = this.props.when;
        if(when){
            this.setState({ when: when })
        }
  
    }
    
    handleClick() {
        var tC = this.state.timesClicked;


        var when = this.state.when;
        if(tC === when){
            this.state.clickFunction(this.state.params)
            if(this.state.optionDisable){
                this.setState({ isDisabled: true })
            }
            if(this.state.optionDisapear){
                this.setState({ isGone: true })
            }
        }

        if(tC === 0){
            console.log("0")
            this.setState({
                timesClicked: tC+1,
                currentText: this.state.texts[1],
                currentClassName: this.state.classNames[1]
            })
        }
        if(tC === 1){
            console.log("1")
            this.setState({
                timesClicked: tC+1,
                currentText: this.state.texts[2],
                currentClassName: this.state.classNames[2]
            })

        }




        console.log(this.state.currentClassName)
        console.log(this.state.currentText)
    }


    render() {
        var currentClassName=this.state.currentClassName;
        var currentText = this.state.currentText;
        var isDisabled = this.state.isDisabled;
        var isGone = this.state.isGone;
        return (
            isGone ? ""
            : <div>
                <button type="button" onClick={() => this.handleClick() } className={ currentClassName } 
                disabled={ isDisabled } >{ currentText }</button>
            </div>
        )
    }
}

export default MyButton;