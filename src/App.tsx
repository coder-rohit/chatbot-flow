import { useSelector } from 'react-redux';
import './App.css';
import MainComponent from "./components/messageFlow"
import { RootState } from './redux/store';
import NodesPanel from './components/nodesPanel';
import Header from './components/header';
import NodeSettingsPanel from './components/nodeSettings';
import { initialNodes } from './components/messageFlow/nodes';
import { useEdgesState, useNodesState } from 'reactflow';
import { initialEdges } from './components/messageFlow/edges';

function App() {
  const noteSettingData = useSelector((state: RootState) => state.nodeReducer)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <>
    <Header/>
      <div className="playArea"> 
        <MainComponent nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} edges={edges} setEdges={setEdges} onEdgesChange={onEdgesChange}/>
        {
          (noteSettingData.showSettingPanel)?
          <NodeSettingsPanel nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}/>
          :
          <NodesPanel />
        }
      </div>
    </>
  );
}

export default App;
