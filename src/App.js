import React from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import { Route, Switch} from "react-router-dom";
import {useEffect, useState} from 'react';
import MyProjects from "./components/MyProjects";

function App() {
  const [name,setName] = useState('');
  // const [username, setUsername] =useState('');
  // const [followers, setFollowers] =useState('');
  // const [following, setFollowing] =useState('');
  // const [repos, setRepos] =useState('');
  const [avatar, setAvatar] =useState('');
  const [userInput, setUserInput] =useState('');
  const [userBio, setUserBio] = useState('');
  const [userLocation,setUserLocation] =useState('');
  const [repoUrl, setRepoUrl] =useState('');
  const [repoItems, setRepoItems] = useState([]);
  const [error, setError] =useState(null);



  useEffect(()=>{
    console.log("use effect called");
    fetch(`https://api.github.com/users/example`)
        .then(res => res.json())
        .then(data=>{setData(data);});
  },[]);

  useEffect( ()=>{
    fetch(`https://api.github.com/users/example/repos`)
        .then(response => response.json())
        .then(data => {
          setRepoItems(data);
        })
  },[]);


  const setData = ({name,avatar_url,bio,location,repos_url}) =>{
    // setUsername(login);
    // setFollowers(followers);
    // setFollowing(following);
    // setRepos(public_repos);
    setName(name);
    setAvatar(avatar_url);
    setUserBio(bio);
    setUserLocation(location);
    setRepoUrl(repos_url);
  }

  const handleSearch =(e) =>{
    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("first fetch calling ");
    fetch(`https://api.github.com/users/${userInput}`)
        .then(res => res.json())
        .then(data =>{
          if(data.message){
            setError(data.message)
            alert("No user found!!");
          }
          else{
            setData(data);
            setError(null);
          }
        })
    console.log(repoUrl);
    console.log("second fetch calling ");
    fetch(`https://api.github.com/users/${userInput}/repos`)
        .then(res => res.json())
        .then(data =>{setRepoItems(data);
        })
    console.log(repoItems);
    console.log("second fetch DONE ");
  }

  return (
      <>
        <img src={avatar} alt="No Image Found!"/>
        <h1 className="name">{name}</h1>

        <header id="header" className="headertemp">
          <a className="logo a" href="https://github.com/">GitHub</a>

          <form onSubmit={handleSubmit}>
            <div className="search">
              <input type="text" className="input" placeholder="Search any profile" onChange={handleSearch} />
              <button type="submit" className="button" >Search</button>
            </div>
          </form>
        </header>


        <Navigation/>
        <Switch>
          <Route exact path='/'>
            <section className="about">
              <h2>About</h2>
              <p>{userBio}</p>
              <p>I am based in {userLocation}</p>
            </section>
          </Route>
          <Route exact path='/my-projects'>
            <section className="about">
              <h2>My projects</h2>
              <MyProjects repos={repoItems}/>
            </section>
          </Route>
        </Switch>
      </>
  );
}

export default App;
