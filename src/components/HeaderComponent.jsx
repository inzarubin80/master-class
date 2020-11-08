import { Component } from "react";
import { Link } from "react-router-dom";
import React from "react";
class HeaderComponent extends Component {
    render() {


        return (
            
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/classes">Мастер классы</Link></li>
                    </ul>


                    <ul className="nav navbar-nav nav-flex-icons ml-auto">
                         <li><Link className="nav-link" to="/login">Профиль</Link></li>
                    </ul>

                </nav>
            </header>
        )
    }
}

export default HeaderComponent
