import React, { useState } from 'react';
import {
  Switch,
  Route,
//  Link,
  useHistory,
//  withRouter
} from "react-router-dom";

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import TreeDemo from './Tree(Component)';
import Lab from './Lab';

const { Header, Sider, Content } = Layout;

function MySider() {
  
  const [collapsed, setCollapsed] = useState(false);
  const [margin, setMargin] = useState(350);
  let history = useHistory(); 

  const toggle = () => {
    setCollapsed(!collapsed);
    setMargin(margin === 350 ? 80 : 350);
  };
  
  const go = (param) => {
      //console.log(param);
      history.push(param.key);
  } 
 
  return (
    <Layout className="site-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
            <Menu.Item key="/" path="/" onClick={go}>
              Home
            </Menu.Item>                     
           <TreeDemo />      
            <Menu.Item key="/lab" path="/lab" /*icon={<UserOutlined />}*/ onClick={go}>
              Lab
            </Menu.Item>    
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ 
        marginLeft: margin,
        transition: "all 0.2s",
      }}>
        <Header className="site-layout-background" style={{ 
          padding: 0 
        }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
          }}
        >
          <Switch>
              <Route path="/lab">
                <Lab />
              </Route>
              <Route path="/">
                  <div></div>
              </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MySider; //withRouter(SiderDemo);