import { MResGoogleTry, MReqGoogleLogin } from 'model';
import React, { useRef } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from "react-router";
import ApiService from '../../../module/ApiService'

function LoginGoogle(){
    const clientId = useRef(process.env.REACT_APP_GOOGLE_API_KEY)
    const history = useHistory()
    
    const onSuccess = async(response:any) => {
    	//console.log(response);
        
        const result = response.profileObj
        const token = response.tokenId

        let body : MReqGoogleLogin = {
            data: {
                profile: result,
                tokenId: token
            }
        }
        const res = await ApiService.googleLogin(body)
        if (res.loginSuccess){
            window.localStorage.setItem('userId', res.userId)
            history.push("/")
        } else{
            //console.log(response.data)
            history.push({
                pathname: "/register",
                state: { 
                    email: res.email,
                    social: res.social
                }
            })
        }
    }

    const onFailure = (error:any) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogin
                clientId={clientId.current!}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    )
}

export default LoginGoogle