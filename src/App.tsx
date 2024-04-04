import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainComponent from "./components/messageFlow"
import { addNewNode } from './redux/reducer/nodesSlice';
import { RootState } from './redux/store';
import NodesPanel from './components/nodesPanel';
import Header from './components/header';

function App() {
  const node = useSelector((state: RootState) => state.nodeReducer)
  console.log(node)
  const dispatch = useDispatch()
  dispatch(addNewNode({
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "wixsre" },
  }))
  return (
    <>
    <Header/>
      <div className="playArea"> 
        <MainComponent />
        <NodesPanel />
      </div>
    </>
  );
}

export default App;
