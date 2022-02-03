/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Menu } from 'antd'
import { withRouter, useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import TlUploadPage from 'components/views/Timeline/UploadPage/TlUploadPage'
import ApiService from '../../../../module/ApiService'
import Toggle from 'components/utils/Toggle'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { useSnackbar } from 'notistack'
import { MenuMode } from 'antd/lib/menu'
import { userSelector } from 'module/redux/user'
import { MUser } from 'model/index'

interface IProps {
  mode: MenuMode
  handleClose: () => void
}

function RightMenu(props:IProps) {
  const user : MUser = useSelector(userSelector)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const history = useHistory()
  const handleSnackbar = () => {
    const message = '해당 기능은 PC 환경을 이용해주세요!'
    const snackbarKey = enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000,
      onClick: () => closeSnackbar(snackbarKey)
    })
  }

  const logoutHandler = async() => {
    handleOnClose()
    const res = await ApiService.logoutUser()
    history.push("/login")
    // if (res.status === 200) {
    // } else {
    //   alert('Log Out Failed')
    // }
  }

  const handleOnClose = () => {
    props.handleClose()
  }

  const handleEditPage = () => {
    if(isMobile){
      handleSnackbar()
      history.push("/")
    } else {
      handleOnClose()
      history.push("/timelineEdit")
    }
  }
  

  //로그인이 안된 상태
  if (user && user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          {/* <a href="/login">Signin</a> */}
          <Link to="/login" onClick={handleOnClose}>Singin</Link>
        </Menu.Item>

        <Menu.Item key="app">
          {/* <a href="/register">Signup</a> */}
          <Link to="/register" onClick={handleOnClose}>Signup</Link>
        </Menu.Item>

        <Menu.Item key="toggle">
          <Toggle/>
        </Menu.Item>
      </Menu>
    )
  } 
  //로그인이 된 상태
  else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="tlEdit">
          {/* <a href="/timelineEdit">Timeline Edit</a> */}
          <div onClick={handleEditPage}>Timeline Edit</div>
        </Menu.Item>

        <Menu.Item key="tlUpload">
          {/* <a href="/timelineUpload">Timeline Upload</a> */}
          <TlUploadPage
            onClick={handleOnClose}
            user={user && user.userData}
            />
        </Menu.Item>

        {/* <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item> */}

        {/* <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item> */}

        {/* <Menu.Item key="cart" style={{ paddingBottom: 3}}>
          <Badge count={user.userData && user.userData.cart.length} >
          <a href="/user/cart" className="head-example" style={{marginRight: -22, color: '#667777'}}>
            <Icon type="shopping-cart" style={{fontSize: 30, marginBottom: 3}} />
          </a>
          </Badge>
        </Menu.Item> */}

        <Menu.Item key="logout">
          {/* <a onClick={logoutHandler}>Logout</a> */}
          <Link to="/" onClick={logoutHandler}>Logout</Link>
        </Menu.Item>

        <Menu.Item key="toggle">
          <Toggle/>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu