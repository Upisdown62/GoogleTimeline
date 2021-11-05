import React from 'react'
import KakaoLogin from 'react-kakao-login'

function LoginKakao() {
  const clientId = "eacba345d7e4815a3baa3b028e3f2de9"
    
    const onSuccess = async(response) => {
    	console.log(response);
    }

    const onFailure = (error) => {
      console.log(error);
  }

    return (
        <div>
              <KakaoLogin
                token={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                getProfile={true}
              >
                카카오로 로그인하기
              </KakaoLogin>
        </div>
    )
}

export default LoginKakao
