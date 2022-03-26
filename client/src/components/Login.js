import React from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

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
                <label for="lname">Twitter_Id</label><br></br>
                <input type="text" id="lname" value={twitterId} onChange={(e)=>setTwitterId(e.target.value)} name="lname"/>
                <label for="Password">Password</label><br></br>
                <input type="password" id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} name="lname"/>
                <button onClick={signIn}>Login.</button>
        </div>
    )
}

export default Login;