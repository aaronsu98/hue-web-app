import './App.css';
import React, {useEffect, useReducer} from "react"; // useState is an array with [state value, function to update state] 

function Header({ name }) { // object destructuring, takes apart props and gets the name from it
  return (
    <header>
      <h1>{name} Smart Home Control</h1>
    </header>
  )
}

// reducer functions: take in current state, produce new state
/*
function Main(props) {
  return (
    <section>
      <img src={smarthome} height={200} alt="Smart home"/>
      <ul style={{textAlign:"left"}}>
        {props.lights.map((light) => (
          <li key={light.id}>{light.title}</li>
        ))}
      </ul>
    </section>
  )
}
*/

function NoneComponent() {
  return( 
    <h1>No lights</h1>
  )
}

function Footer() {
  return( 
    <footer>
      <p>Made by Aaron Su</p>
    </footer>
  )
}

function Light(props) {
  const [on, toggle] = useReducer(
    (on) => !on,
    false
  );

  useEffect(() => {
    console.log(`Logging in useEffect is for doing something else with state not related to rendering, like setting ${on}`);
  }, [on]); // the 2nd parameter is an array of the states you want to do the effect on if they change... so log will only be done when on changes


  return(
    <>
      <h1>Light {props.lightName} (id: ) is currently {on ? "on" : "off"}</h1>
      <input 
        type="checkbox"
        onClick={toggle}>
      </input>
    </>
  );
}


function App() {
  // Curly braces used for lights since its a variable
  //{lightComponents.length > 0 ? lightComponents : <NoneComponent /> }
  let lights = [];
  const result = async () => {
    const response = await fetch('http://192.168.0.166/api/wC9MnPPGCU0T1mprTLxPRAFDSbg6VTBB8vq94uVX/lights');
    const json = await response.json();
    for (const key of Object.keys(json)) {
        const light = {"id": key, "lightName": json[key].name};
        lights.push(<Light lightId={light.id} lightName={light.lightName}/>);
    }
  } 

  result();

  //const lightComps = lights.map(light => <Light lightId={light.id} lightName={light["lightName"]}/>);
  // between footer and header, I am not sure what I need to do to make the lights show up. It seems
  // react isn't built for me to fetch the lights and then render, I should put a component(s) there 
  // and then when I get the result from the fetch, I can render the components then when the state changes
  // That would make sense for "reacting" to things changes, especially asynchronously. Tomorrow look into
  // getting that to work, I think you can make a wrapper component that will add the lights as they come in
  console.log(lights);
  return (
    <div className="App">
      <Header name="Aaron" />

      <Footer />
    </div>
  );
}

export default App;
