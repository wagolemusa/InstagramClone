import React, { Component } from 'react';
import Identicon from 'identicon.js';

import Web3 from 'web3'

class Main extends Component {
 


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

        console.log(accounts)
    }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h1 className="d-4">Edit this file in App.js!</h1>
                
                {/* Code ... */}

              <p>&nbsp;</p>
                
                {/* Code ... */}

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;