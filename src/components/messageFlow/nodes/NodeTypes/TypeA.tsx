import type { NodeProps } from "reactflow";
import { Handle, Position, useNodeId } from "reactflow";
import style from "./style.module.css"
import { useDispatch } from "react-redux";
import { changeData } from "../../../../redux/reducer/nodesSlice";
import { useState } from "react";

function NodeTypeA({
  data,
}: NodeProps<any>) {
  
  // getting node id
  const nodeId = useNodeId();

  const dispatch = useDispatch()

  function handleNodeClick() {
    // sending data to redux store to let application know which node is clicked
    // opening setting panel for that particular node 
    dispatch(changeData({
      showSettingPanel: true,
      nodeID: nodeId,
      nodeName: data.label
    }))
  }

  // saving new edges here also
  const [sourceEdges, setSourceEdges] = useState<any>([]);

  const checkConn = (c: any) => {
    setSourceEdges([...sourceEdges, c.source]);
    // check to make sure source handle do not have any existing target assigned to it, because a source handle can have only one edge originating from it
    if (sourceEdges.includes(c.source)) {
      return false
    } else {
      return true
    }
  }

  return (
    <div onClick={handleNodeClick} className={`react-flow__node-default ${style.customNoteTypeA}`}>
      <div className={style.nodeTitleaBar}>Send Message</div>
      {data.label && <div className={style.nodeLabel}>{data.label}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source"
        position={Position.Right}
        isValidConnection={(connection) => checkConn(connection)}
      />
    </div>
  );
}

export default NodeTypeA