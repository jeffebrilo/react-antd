import React, { useState } from 'react';
import './App.css';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Tree from 'rc-tree';

const { Header, Sider, Content } = Layout;



function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i += 1) {
    arr.push({ title: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach(item => {
      if (
        item.key.length > curKey.length
          ? item.key.indexOf(curKey) !== 0
          : curKey.indexOf(item.key) !== 0
      ) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        // eslint-disable-next-line no-param-reassign
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = data => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach(item => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          // eslint-disable-next-line no-param-reassign
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

class TreeDemo extends React.Component {
  state = {
    treeData: [],
    checkedKeys: [],
  };

  /*
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { title: 'pNode 01', key: '0-0' },
          { title: 'pNode 02', key: '0-1' },
          { title: 'pNode 03', key: '0-2', isLeaf: true },
          { title: 'pNode 03', key: '0-3', children: [
            { title: 'pNode 01', key: '0-3-0' },
            { title: 'pNode 02', key: '0-3-1' }, ] 
          },
        ],
        checkedKeys: ['0-0'],
        expandedKeys: ['0-3'],
      });
    }, 3000);
  }
  */

  componentDidMount() {
    
    fetch("https://rc.blogs2day.net/api")
      .then( 
        (res) => {
          console.log(res);
          return res.json() 
        }
      )
      .then(
        (result) => {
          console.log(result);
          this.setState({
            treeData: result,
            checkedKeys: ['0-0'],
            expandedKeys: ['0-3'],
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  }


  onSelect = info => {
    console.log('selected', info);
  };

  onCheck = checkedKeys => {
    console.log(checkedKeys);
    this.setState({
      checkedKeys,
    });
  };

  onExpand = expandedKeys => {
    console.log(expandedKeys);
    this.setState({
      expandedKeys,
    });
  };

  onLoadData = treeNode => {
    console.log('load data...');
    return new Promise(resolve => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        this.setState({ treeData });
        resolve();
      }, 500);
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
          loadData={this.onLoadData}
          treeData={treeData}
        />
      </div>
    );
  }
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    margin: 200
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      margin: this.state.margin == 200 ? 80 : 200,
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
