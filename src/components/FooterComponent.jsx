import { Component } from "react";
import React from "react";

class FooterComponent extends Component {
    constructor(props) {

        super(props);
    }

    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2018 SLAVA</span>
            </footer>
        )
    }
}

export default FooterComponent;