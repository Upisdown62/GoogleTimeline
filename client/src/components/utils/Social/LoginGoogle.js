import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { useHistory } from "react-router";


function LoginGoogle(){
    const clientId = "378319837757-k4cm4ghl2rmmg0klj0n3ke00ql4riubi.apps.googleusercontent.com"
    const history = useHistory()
    
    const onSuccess = async(response) => {
    	//console.log(response);
        
        const result = response.profileObj
        const token = response.tokenId

        let body = {
            data: {
                profile: result,
                tokenId: token
            }
        }

        axios.post('/api/google/login', body)
        .then(response =>{
            if (response.data.loginSuccess){
                window.localStorage.setItem('userId', response.data.userId)
                history.push("/")
            } else{
                //console.log(response.data)
                history.push({
                    pathname: "/register",
                    state: { 
                        email: response.data.email,
                        social: response.data.social
                    }
                })
            }
        })
        .catch(err => alert(err))
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    )
}

export default LoginGoogle