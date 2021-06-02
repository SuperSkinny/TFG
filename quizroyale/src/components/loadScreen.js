import React, { Component } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class LoadScreen extends Component {

    render() {
        const { handleGameStart } = this.props
        
        return (
            <div className="content" style={ { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Countdown 
                     onComplete={handleGameStart}
                     date={Date.now() + 3000}
                     renderer={props => <div className="countdown">{zeroPad(props.seconds, 1)}</div>}
                />
            </div>
        );
    }
}
