import {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import {Link} from "react-router-dom";
import React from "react";

class HeaderComponent extends Component {
    render() {

        const isUserLoggedin = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedin);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://nposlava.com/" className="navbar-brand">SLAVA</a></div>
                    <ul className="navbar-nav">
                        
                        <li><Link className="nav-link" to="/welcome/SLAVA">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Todos</Link></li>

                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/signup">Signup</Link></li>
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent
