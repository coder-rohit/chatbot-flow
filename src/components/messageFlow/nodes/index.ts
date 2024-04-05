import type { Node, NodeTypes } from "reactflow";
import NodeTypeA from "./NodeTypes/TypeA";

export const initialNodes = [
  {
    id: "a",
    type: "nodeTypeA",
    position: { x: 200, y: 0 },
    data: { label: "First Node" },
  },
] satisfies Node[];

export const nodeTypes = {
  "nodeTypeA": NodeTypeA,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
