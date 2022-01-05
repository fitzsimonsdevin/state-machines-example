import { Link } from "react-router-dom";

import "./App.css";
import { PuppersProvider } from "./context/puppersContext";

function App() {
  return (
    <PuppersProvider>
      <h1>I'm just a router page so that we can have examples</h1>
      <div className="flex h-3/5 bg-gray-200 flex-col justify-around">
        <Link to="/dog">Dog</Link>
        <Link to="/dog2">Dog2</Link>
        <Link to="/main">Intro Examples</Link>
        <Link to="/testing">Testing with Context</Link>
      </div>
    </PuppersProvider>
  );
}

export default App;
