import React from 'react';
import {Slider} from '@material-ui/core';

class Light extends React.Component {
    constructor(props) {
        super(props);
        this.state = {on: false, brightness: 1};
        this.switchLight = this.switchLight.bind(this);
        this.tuneLight = this.tuneLight.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights/' + this.props.lightId);
        const json = await response.json();
        const lightOn = json["state"].on;
        this.setState({on: lightOn});

        const brightnessResponse = await fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights/' + this.props.lightId);
        const brightnessJson = await brightnessResponse.json();
        const lightBrightness = brightnessJson["state"].bri;
        this.setState({brightness: lightBrightness});
    }

    switchLight() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({on: !this.state.on})
        };
        fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights/' + this.props.lightId + '/state', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        // TODO: Add error handling
        this.setState({on: !this.state.on});
    }

    tuneLight = (event, newValue) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bri: newValue})
        };
        fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights/' + this.props.lightId + '/state', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        // TODO: Add error handling
        this.setState({brightness: newValue})
    }

    render() {
        let slide;
        if (this.state.on) {
            slide = <Slider 
                        value={this.state.brightness}
                        step={5}
                        min={1}
                        max={254}
                        onChangeCommitted={this.tuneLight}
                    />
        } else {
            slide = null;
        }
        return (
            <>
                <h2>Light #{this.props.lightId}: {this.props.lightName} is {this.state.on ? "on" : "off"}</h2>
                <button type="reset" onClick={this.switchLight}>Switch light</button>
                {slide} 
            </>   
        )
    }
}

export default Light;