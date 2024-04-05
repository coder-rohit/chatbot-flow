import type { OnConnect } from "reactflow";
import { useCallback, useRef, useState } from "react";
import { ReactFlow, addEdge, Background, ReactFlowProvider, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import style from "./style.module.css"

export default function MainComponent({ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }: any) {

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect: OnConnect = useCallback(
    (connection: any) => {
      const updatedEdges = edges.map((edge: any) => ({
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed }
      }));
      connection.markerEnd = { type: MarkerType.ArrowClosed }
      setEdges(addEdge(connection, updatedEdges));
    },
    [edges, setEdges]
  );
  const reactFlowWrapper = useRef<any>(null);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type: string = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode: any = {
      id: `${type}-${Date.now()}`,
      type: "nodeTypeA",
      position: position,
      data: { label: "Click to edit" },
    };
    setNodes((nds: string | any[]) => nds.concat(newNode));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const clearNodes = () => {
    setNodes([])
    setEdges([])
  }

  return (
    <ReactFlowProvider>
      <div
        className={style.reactFlowMainClass}
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={handleDragOver}
      >
        <div onClick={clearNodes} className={style.clearAllDiv}>Clear All</div>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          onInit={setReactFlowInstance}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
