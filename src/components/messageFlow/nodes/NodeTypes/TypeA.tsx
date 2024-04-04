import type { NodeProps } from "reactflow";
import { Handle, Position, useNodeId } from "reactflow";
import style from "./style.module.css"
import { useDispatch } from "react-redux";
import { changeData } from "../../../../redux/reducer/nodesSlice";

function NodeTypeA({
  data,
}: NodeProps<any>) {
  const nodeId = useNodeId();
  const dispatch = useDispatch()

  function handleNodeClick() {
    dispatch(changeData({
      showSettingPanel: true,
      nodeID: nodeId,
      nodeName: data.label
    }))
  }

  const checkConn = (c: any) => {
    console.log(c)
    return true
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