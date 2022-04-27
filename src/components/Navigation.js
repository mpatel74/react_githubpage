import React from 'react';
import {Link} from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation(props){
    return(
        <header className={classes.header}>
        <div>
            <nav>
                <ul>
                    <li><Link to='/' >About</Link></li>
                    <li><Link to='/my-projects'>My Projects</Link></li>

                </ul>
            </nav>
        </div>
        </header>

    );
}

export default Navigation;