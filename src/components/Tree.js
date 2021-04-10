import React, { useState, useEffect } from 'react';

import Tree from 'rc-tree';



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
  });
};


function MyTree() {
  
  const [tree, setTree] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  
  const onSelect = info => {
    //console.log('selected', info);
  };

  const onCheck = _checkedKeys => {
    console.log(_checkedKeys);
    setCheckedKeys({
      _checkedKeys,
    });
  };

  const onExpand = _expandedKeys => {
    setExpandedKeys({
      _expandedKeys,
    });
  };

  const onLoad = async treeNode => {
    /*
    const children = await fetchChildren(treeNode.props.eventKey);
    
    const _tree = [...tree];
    
    return new Promise(resolve => {
      
      setChildren(_tree, treeNode.props.eventKey, children);
      setTree(_tree);
      resolve();
    });
    */
  };
  
  const setChildren = (_tree, key, children) => {
    _tree.forEach(item => {
      if (item.key == key) item.children = children;
      else if (item.children) setChildren(item.children, key, children);
    })
  
  }
 
  useEffect(() => {
    async function fetchRoot() {
      const _tree = await fetchChildren(1);
      setTree(_tree);
    }
    fetchRoot();
  }, []);

  return (
    <div className="ant-layout">          
      <Tree
        onSelect={onSelect}
        checkable
        onCheck={onCheck}
        onExpand={onExpand}
        checkedKeys={checkedKeys}
        expandedKeys={expandedKeys}
        loadData={onLoad}
        treeData={tree}
      /> 
    </div>
  );
}

export default MyTree; //withRouter(SiderDemo);

/*


class TreeDemo extends React.Component {
    state = {
      treeData: [],
      checkedKeys: [],
    };
  
    async componentDidMount() {
  
      let tree = await fetchChildren(1);
  
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
      this.setState({
        expandedKeys,
      });
    };
  
    loadData = async treeNode => {
      
      let children = await fetchChildren(treeNode.props.eventKey);
      //console.log(children);
  
      return new Promise(resolve => {
        const treeData = [...this.state.treeData];
        setChildren(treeData, treeNode.props.eventKey, children);
        this.setState({ treeData });
        resolve();
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
  

  export default TreeDemo;

  */