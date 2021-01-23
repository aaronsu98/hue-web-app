import React from 'react';

class Light extends React.Component {
    constructor(props) {
        super(props);
        this.state = {on: false};
        this.switchLight = this.switchLight.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights/' + this.props.lightId);
        const json = await response.json();
        const lightOn = json["state"].on;
        this.setState({on: lightOn})
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
        this.setState({on: !this.state.on});
    }

    render() {
        return (
            <>
                <h2>Light #{this.props.lightId}: {this.props.lightName} is {this.state.on ? "on" : "off"}</h2>
                <button type="reset" onClick={this.switchLight}>Switch light</button>
            </>   
        )
    }
}

export default Light;