import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { MenuMode } from 'antd/lib/menu'
//const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;
interface IProps {
  mode: MenuMode
}

function LeftMenu(props:IProps) {
  return (
    <Menu mode={props.mode}>
      {/* <Menu.Item key="mail">
        <Link to="/">Home</Link>
      </Menu.Item> */}

      <Menu.Item key="tlGuide">
          <Link to="/guide">Test Page</Link>
        </Menu.Item>
      {/* <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
    </Menu>
  )
}

export default LeftMenu