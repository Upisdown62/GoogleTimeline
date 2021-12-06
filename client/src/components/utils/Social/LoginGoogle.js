import React, { useRef } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { useHistory } from "react-router";


function LoginGoogle(){
    const clientId = useRef(process.env.REACT_APP_GOOGLE_API_KEY)
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
                clientId={clientId.current}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    )
}

export default LoginGoogle