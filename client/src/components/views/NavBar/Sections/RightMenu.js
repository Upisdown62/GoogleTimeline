/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import TlUploadPage from '../../Timeline/UploadPage/TlUploadPage'
import ApiService from '../../../../module/ApiService'
import Toggle from '../../../utils/Toggle'
import { Link } from 'react-router-dom'

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = async() => {
    const res = await ApiService.logoutUser()
    if (res.status === 200) {
      props.history.push("/login");
    } else {
      alert('Log Out Failed')
    }
  };
  

  //로그인이 안된 상태
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          {/* <a href="/login">Signin</a> */}
          <Link to="/login">Singin</Link>
        </Menu.Item>

        <Menu.Item key="app">
          {/* <a href="/register">Signup</a> */}
          <Link to="/register">Signup</Link>
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
          <Link to="/timelineEdit">Timeline Edit</Link>
        </Menu.Item>

        <Menu.Item key="tlUpload">
          {/* <a href="/timelineUpload">Timeline Upload</a> */}
          <TlUploadPage
            user={user.userData}
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

        <Toggle/>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

