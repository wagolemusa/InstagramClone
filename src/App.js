import React, { Component } from 'react'
import './App.css';
import Navbar from './componets/Navbar';
import Main from './componets/Main';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      account: '',
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          :<Main
            // code 
          />
        }
      </div>
    );
  }
  
}

export default App;
