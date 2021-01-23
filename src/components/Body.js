import React from 'react';
import ReactDOM from 'react-dom';
import Light from './Light.js'

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lights: []
        };
    }

    async componentDidMount() {
        const response = await fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights');
        const json = await response.json();
        for (const key of Object.keys(json)) {
            const light = {"id": key, "lightName": json[key].name};
            this.setState({lights: [...this.state.lights, light]})
        }
    }

    render() {
        const lightItems = this.state.lights.map((light) =>
            <Light key={light.id} lightId={light.id} lightName={light.lightName} />
        )
        if (lightItems === undefined || lightItems.length === 0) {
            return <h1>No Lights </h1>;
        }
        return (
            <ul>
                {lightItems}
            </ul>
        );
    }
}

export default Body;