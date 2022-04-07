import React from "react";
import {useHistory, Link} from "react-router-dom";
import axios from "axios";
import '../App.css';
import enterIcon from '../assets/enter-icon.svg';
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
        console.log("signed up")
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
                <input type="text" value = {name} onChange ={(e)=>setName(e.target.value)} id="fname" name="fname" placeholder="Name" className="input-field" />
               <br></br>
               <br></br>
                <input type="text" id="lname" value={twitterId} onChange={(e)=>setTwitterId(e.target.value)} name="lname" placeholder="Twitter Id" className="input-field" />
                <br></br>
                <br></br>
                <input type="password" id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} name="lname" placeholder="Password" className="input-field" />
                <br></br>
                <br></br>
                <Link to={"/login"}><a className="redirect-link">Already have an account? Log in</a></Link>
                <br></br>
                <br></br>
                <button class="primary-button" onClick={signUp}>
                        <div class="button-text">Register</div>
                        <img src={enterIcon} alt="enter" class="button-icon" />
                    </button>
            </form> 
        </div>
    )
}

export default Register;