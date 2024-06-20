import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
  return (
    <div className="container">
      <div class="navbar">
       <img id="logo-main" src="./logo.png" width="60"  alt="Logo Thing main logo"></img>
    <div class="navbar-brand">
      HAIIIII
    </div>
    <div class="navbar-links">
        <button>Home</button>
        <button>About</button>
        <button>Contact</button>
    </div>
</div>

      <div className="body"><h2><b>This is React</b></h2></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

 
