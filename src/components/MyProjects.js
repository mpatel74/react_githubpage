import React from "react";
import classes from "./MyProjects.module.css";
function MyProjects({repos}){

    const listRepo = repos.map((item) => {
        return(
        <tr>
            <td ><a href={item.html_url}> {item.name}</a></td>
            <td >{item.language}</td>
            <td >{item.forks}</td>
            <td >{item.watchers}</td>
        </tr>)
    })
    return(
        <table>
            <tr>
                <th>Name</th>
                <th >Language</th>
                <th >Forks</th>
                <th>Watchers</th>
            </tr>
           {listRepo}
        </table>

    );
}

export default MyProjects;