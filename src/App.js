import React, { useState } from 'react';
import './App.css';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import Tree from 'rc-tree';

const { Header, Sider, Content } = Layout;

const fetchChildren = async key => {
  //    console.log('load data...');
      return new Promise(resolve => {
        fetch("https://2020.classictours.me/api.php", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: key }),
        })
        .then( 
          (res) => {
            return res.json(); 
          }
        )
        .then(
          (result) => {
            resolve(result.tree);
          },
          (error) => {
            console.log(error);
          }
        )
        //}, 500);
      });
};
  

const setChildren = (treeData, key, children) => {
  treeData.forEach(item => {
    if (item.key == key) item.children = children;
    else if (item.children) setChildren(item.children, key, children);
  })

}


class TreeDemo extends React.Component {
  state = {
    treeData: [],
    checkedKeys: [],
  };

  async componentDidMount() {

    let tree = await fetchChildren(1);
    //console.log(test);

    
      this.setState({
        treeData: tree,
        //checkedKeys: ['0-0'],
        //expandedKeys: ['0-3'],
      });
    
  }


  onSelect = info => {
    //console.log('selected', info);
  };

  onCheck = checkedKeys => {
    //console.log(checkedKeys);
    this.setState({
      checkedKeys,
    });
  };

  onExpand = expandedKeys => {
    //console.log(expandedKeys);
    this.setState({
      expandedKeys,
    });
  };

  loadData = async treeNode => {
    
    let children = await fetchChildren(treeNode.props.eventKey);
    //console.log(children);

    return new Promise(resolve => {
      //setTimeout(() => {
        const treeData = [...this.state.treeData];
//        const treeData = this.state.treeData;
        //console.log(treeNode.props);
        //getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        console.log(children);
        setChildren(treeData, treeNode.props.eventKey, children);
        this.setState({ treeData });
        resolve();
      //}, 500);
    });
  };

  render() {
    const { treeData } = this.state;

    return (
      <div
        className="ant-layout"
      >
        
        <Tree
          onSelect={this.onSelect}
          checkable
          onCheck={this.onCheck}
          onExpand={this.onExpand}
          checkedKeys={this.state.checkedKeys}
          expandedKeys={this.state.expandedKeys}
          loadData={this.loadData}
          treeData={treeData}
        />
      </div>
    );
  }
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    margin: 350
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      margin: this.state.margin == 350 ? 80 : 350,
    });
  };

  render() {
    return (
      <Layout className="site-layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
          <div className="logo" />

          <TreeDemo />
          
          {/* 

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
          <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
   
          </Menu>
          */}
          
        </Sider>
        <Layout className="site-layout" style={{ 
          marginLeft: this.state.margin,
          transition: "all 0.2s",
        }}>
          <Header className="site-layout-background" style={{ 
            padding: 0 
          }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
            Content<br />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
 
function App() {

//  const [collapsed, setCollapsed] = useState(false);

  return (
    <SiderDemo />
  );

}

export default App;
