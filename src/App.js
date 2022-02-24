import React, { Component } from 'react'
import './App.css';
import Navbar from './componets/Navbar';
import Main from './componets/Main';
import Web3 from 'web3'

class App extends Component {

    //  Call a function
    async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
  }

  async loadWeb3() {
      if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
      }
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
      }
      else{
          window.alert('Non-Ethereum browser detected')
      }
  }

  async loadBlockchainData() {
      const web3 = window.web3
      //  load account
      const  accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0]}) // it fetch the first account 
      // console.log(accounts)
  }

  constructor(props) {
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
