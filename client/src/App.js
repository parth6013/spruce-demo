import React,{useState} from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import axios from "axios";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import logo from './assets/logo.png';
import passport from "./assets/passport-icon.png";
import metaversity from "./assets/metaversity-icon.png";
import mapIcon from "./assets/map-icon.png";
import helpIcon from "./assets/help-icon.png";
import verifiedIcon from "./assets/verified.png";
function App() {

  const [_id,setID] = useState("");
  const [ twitterId , setTwitterId ] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState("");

  function onLogout(){

    localStorage.removeItem("_id");
    localStorage.removeItem("verified");
    setVerified("");
    setID("");
  }

  const verification =async(e)=>{

    try{
      const response = await axios.post(
        "http://localhost:3003/api/user/getVc",
        {
          twitter_id:twitterId,
        }
      )
      console.log(response);
    }catch(e){
      console.log(e);
    }

    try{
      const response1 = await axios.post(
        "http://localhost:3003/api/user/try2",
        {
          twitter_id : twitterId,
        }
      )
      console.log(response1);
      localStorage.setItem("verified",response1.data.user2.verification);
      setVerified(response1.data.user2.verification);
    }catch(e){
      console.log(e);
    }
  }

  return (


    <div>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet" />
      </head>
      <body>
      <div className="website-container">
        <section className="sidebar">
            <img src={logo} alt="Saraverse" className="logo" />
            <div className="navigation-container">
                <div className="navigation-button">
                    <img src={passport} alt="passport" sizes="32" />
                </div>
                <div className="navigation-button">
                    <img src={metaversity} alt="passport" sizes="32" />
                </div>
                <div className="navigation-button">
                    <img src={mapIcon} alt="passport" sizes="32" />
                </div>
                <div className="navigation-button">
                    <img src={helpIcon} alt="passport" sizes="32" />
                </div>
            </div>
            <div className="expand">x</div>
        </section>
        <section className="body-container">
          <h1 className="main-heading">Welcome to Saraverse</h1>
          <div className="content-container">
      <BrowserRouter>
          <Switch>
            {_id!==""?(
              <>
              {/*Logged in. */}
                {/* <h3>Spruce Demo.</h3> */}
                <h4 className="sub-heading" style={{fontSize:'21px'}} >Hello <span className="highlight">{_id}</span>!</h4>
                {verified==="1"?(
                  <div style={{display:"flex", flexDirection:'row', alignItems: 'center'}}>
                  <h4 className="sub-heading">
                    You're Verified
                  </h4>
                  <img src={verifiedIcon} style={{height: "25px", width:'48px'}}></img>
                  </div>
                ):(
                  <div>
                  <h4 className="sub-heading">
                    You're Yet to be Verified.
                  </h4>
                  <button class="primary-button" onClick={verification} style={{background:"#EA86D8"}} >
                        <div class="button-text" style={{color:"#302b0c"}} >Get Verified</div>
                    </button>

                    </div>
                )}
                <br></br>
                <button class="primary-button" onClick={onLogout}>
                        <div class="button-text">Logout</div>
                    </button>
              </>
            ):(
              <>
              {/*Logged out. */}
                <Route path = "/" exact>
                  <Register name={name} setName = {setName} twitterId = {twitterId}
                  setTwitterId = {setTwitterId} password = {password} setPassword = {setPassword}
                  _id={_id} setID={setID} />
                </Route>
                <Route path="/login" exact>
                  <Login twitterId={twitterId} setTwitterId = {setTwitterId}
                  password={password} setPassword = {setPassword} _id = {_id} setID = {setID}
                  verified = {verified} setVerified = {setVerified} />
                </Route>
              </>
            )}
          </Switch>
      </BrowserRouter>
      </div>
      </section>
        </div>
        </body>
    </div>
  );
}

export default App;
