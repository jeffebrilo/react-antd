  
import { useSelector, useDispatch } from 'react-redux';
import {
  getBoardSize,
  getInitialPos,
  getPos,
  isBusy,
  getChecked,
  setChecked,
} from './slice';

function Tile(props) {
  const dispatch = useDispatch();
 
  const ready = !useSelector(isBusy);
  const initialPos = useSelector(getInitialPos);
  const pos = useSelector(getPos);
  const _pos = {x: props.x, y: props.y}
  const checked = useSelector(getChecked);

  const onClick = () => () => {
    dispatch(setChecked(_pos)); 
  }

  return (

    <div 
      style={{
        "width": parseInt(100 / useSelector(getBoardSize).x).toString() + "%", 
        "height": parseInt(100 / useSelector(getBoardSize).y).toString() + "%", 
      }} 
      className={`tile ${JSON.stringify(_pos) === JSON.stringify(pos) ? 'current' : ''} ${JSON.stringify(_pos) === JSON.stringify(initialPos) ? 'initial' : ''} ${checked.filter(cPos => JSON.stringify(cPos) === JSON.stringify(_pos)).length ? 'checked' : ''}`} 
      onClick={ready ? onClick() : undefined} 
    />          
  );
  
}

  
export default Tile;