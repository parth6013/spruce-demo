import React from "react";
import {useHistory, Link} from "react-router-dom";
import axios from "axios";

function Register(props){

    const{
        name,
        setName,
        twitterId,
        setTwitterId,
        password,
        setPassword,
        _id,
        setID
    } = props;

    let history = useHistory();

    const signUp = async(e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/register",
                {
                    password : password,
                    name : name,
                    twitter_id : twitterId,
                }
            )
            console.log(response.data.user._id);
            localStorage.setItem("_id",response.data.user._id);
            setID(response.data.user._id);
            history.push("/");
        }catch(e){
            console.log(e);
        }
    }

    return(
        <div>
             <form>
                <label for="fname">Name:</label><br></br>
                <input type="text" value = {name} onChange ={(e)=>setName(e.target.value)} id="fname" name="fname"/><br></br>
                <label for="lname">Twitter_Id</label><br></br>
                <input type="text" id="lname" value={twitterId} onChange={(e)=>setTwitterId(e.target.value)} name="lname"/>
                <label for="Password">Password</label><br></br>
                <input type="password" id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} name="lname"/>
                <button onClick={signUp}>Register.</button>
                <Link to={"/login"}><button>Login</button></Link>
            </form> 
        </div>
    )
}

export default Register;