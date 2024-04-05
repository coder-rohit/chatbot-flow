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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getDataFromEdgesTable, getDataFromNodesTable, openDatabase } from './indexedDB';

function App() {
  const noteSettingData = useSelector((state: RootState) => state.nodeReducer)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [db, setDB] = useState<any>(null);

  useEffect(()=>{
    if(db){

      async function getAllDataFromLocal(){
        let nodes = await getDataFromNodesTable(db)
        let edges = await getDataFromEdgesTable(db)
        delete nodes[0].id;
        delete edges[0].id;
        setNodes(nodes[0])
        setEdges(edges[0])
      }
      getAllDataFromLocal()
    }
      
  }, [db, setNodes, setEdges])

  useEffect(() => {
    async function connectToDB() {
      let db:any = await openDatabase()
      setDB(db)
    }
    if(db === null){

      connectToDB()
    }
    return () => {
      if (db) {
        db.close();
      }
    };
  
  }, [])// eslint-disable-line

  return (
    <>
      <ToastContainer />

      <Header nodes={nodes} edges={edges} db={db}/>
      <div className="playArea">
        <MainComponent nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} edges={edges} setEdges={setEdges} onEdgesChange={onEdgesChange} />
        {
          (noteSettingData.showSettingPanel) ?
            <NodeSettingsPanel nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} />
            :
            <NodesPanel />
        }
      </div>
    </>
  );
}

export default App;
