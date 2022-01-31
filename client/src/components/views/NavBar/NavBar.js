import React, { useState } from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'
import { Drawer, Button, Icon } from 'antd'
import './Sections/Navbar.scss'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { useTheme } from 'hooks/useTheme'


function NavBar() {
  const { isDarkMode } = useTheme()
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div className={cx(isDarkMode ? 'menu__dark' : 'menu')} style={{ position: 'fixed', zIndex: 5, width: '100%', height: '69px'}}>
      <div className="menu__logo">
        {/* <a href="/">Logo</a> */}
        <Link to="/">Logo</Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" handleClose={onClose}/>
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className={cx(isDarkMode ? 'menu_drawer__dark' : 'menu_drawer')}
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" handleClose={onClose}/>
        </Drawer>
      </div>
    </div>
  )
}

export default NavBar