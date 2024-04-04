import type { OnConnect } from "reactflow";
import { useCallback, useRef, useState } from "react";
import { ReactFlow, addEdge, useNodesState, useEdgesState, Background, ReactFlowProvider, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import style from "./style.module.css"

export default function MainComponent({nodes, setNodes, onNodesChange}:any) {

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log(edges)

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const updatedEdges = edges.map(edge => ({
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed }
      }));
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
      data: { label: "New Message" },
    };
    setNodes((nds: string | any[]) => nds.concat(newNode));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <ReactFlowProvider>
      <div
        className={style.reactFlowMainClass}
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={handleDragOver}
      >
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
