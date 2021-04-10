const boardSize = {
    x: 3, 
    y: 3
}; 

const tiles = [];

for (const [y] of [...Array(boardSize.y).keys()].entries()) {
    const row = [];
    for (const [x] of [...Array(boardSize.x).keys()].entries()) {
        row.push(<div className="tile" key={x.toString() + '-' + y.toString()} title={x.toString() + '-' + y.toString()} />)
    }
    tiles.push(<div className="row" key={y.toString()} title={y.toString()}>{row}</div>)
}


function Lab() {

    return (
      <>
      Lab
      <div className="tiles">
        {tiles}
      </div>
      </>
    );
  
  }

  
export default Lab;