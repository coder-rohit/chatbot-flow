import { useDispatch } from 'react-redux';
import './App.css';
import MainComponent from "./components/messageFlow"
import { addNewNode } from './redux/reducer/nodesSlice';


function App() {
  const dispatch = useDispatch()
  dispatch(addNewNode({
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "wixsre" },
  }))
  return (
    <>
      <MainComponent />

    </>
  );
}

export default App;
