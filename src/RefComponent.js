import React, {Component}  from "react";


class RefComponent extends Component{
    // constructor(){
    //     super();
    //     this.textInput = React.createRef();
    // }

    showRefValue = () => {
        console.log(this.textInput.value);
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="text here"
                    ref = {(input) => this.textInput = input}
                />
                <button
                    onClick = {this.showRefValue}
                >Get Ref</button>
            </div>
        );
    }
}

export default RefComponent;