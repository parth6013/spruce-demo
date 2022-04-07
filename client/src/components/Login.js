import React from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import '../App.css';
import enterIcon from '../assets/enter-icon.png';
function Login(props){

    const{
        twitterId,
        setTwitterId,
        password,
        setPassword,
        _id,
        setID,
        verified,
        setVerified
    } = props;

    let history = useHistory();

    const signIn = async(e)=>{
        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/login",
                {
                    password : password,
                    twitter_id : twitterId,
                }
            )
            console.log(response);
            localStorage.setItem("_id",response.data.user._id);
            localStorage.setItem("verified",response.data.user.verification);
            setID(response.data.user._id);
            setVerified(response.data.user.verification);
            history.push("/");
        }catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            <input type="text" id="lname" value={twitterId} onChange={(e)=>setTwitterId(e.target.value)} name="lname" placeholder="Twitter Id" className="input-field" />
                <br></br>
                <br></br>
                <input type="password" id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} name="lname" placeholder="Password" className="input-field" />
                <br></br>
                <br></br>
                <button class="primary-button" onClick={signIn}>
                        <div class="button-text">Login</div>
                        <img src={enterIcon} alt="enter" class="button-icon" />
                    </button>
        </div>
    )
}

export default Login;