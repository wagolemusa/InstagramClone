import React, { Component } from "react";
import Identicon from 'identicon.js';


class Navbar extends Component {

    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <a class="navbar-brand mt-2 mt-lg-0" href="#">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                            height="15"
                            alt="MDB Logo"
                            loading="lazy"
                        />
                    </a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Team</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Projects</a>
                        </li>
                    </ul>
                </div>

                <div class="d-flex align-items-center">
                 
                    <small className="text-secandary">
                        <small id="account">{'0x0'}</small>

                    </small>
                    { this.props.account
                        ?<img
                            className="ml-2"
                            width='30'
                            height='40'
                            src={`data: image/png;base64,${new Identicon(this.props.account, 30).toString}`}
                        />
                        :<span></span>
                    }
                </div>
            </div>
        </nav>
        )
    }
}

export default Navbar;

