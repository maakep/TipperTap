import * as React from "react"; 
import * as io from "socket.io-client";

const socket = io();

interface IStateType {
    buttonText: string;
}

export default class Game extends React.Component<{}, IStateType> {
    constructor(props: {}) {
        super(props);

        this.state = {
            buttonText: "Don't click the button",
        };

        socket.on("server:click", () => {
            console.log("Someone clicked");
            this.setState({buttonText: "Someone clicked the button :("});
            setTimeout(() => {
                this.setState({buttonText: "Don't click the button"});
            }, 5000);
        });
      
    }

    clickHandler() {
        socket.emit("client:click");
    }

    render() {
        return (
            <div>
                <button onClick={this.clickHandler}>{this.state.buttonText}</button>
            </div>
        );
    }
}