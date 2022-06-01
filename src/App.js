import { useState } from "react";
import "./App.css";
import CitiesList from "./component/citiesList/CitiesList";
import MainContainer from "./component/mainContainer/MainContainer";

function App() {
  const [country, setCountry] = useState();
  return (
    <div className="App">
      <h1>Welcome to Weather App</h1>
      <div className="wrapper">
        <MainContainer setCountry={setCountry} />
        <CitiesList country={country} />
      </div>
    </div>
  );
}

export default App;
