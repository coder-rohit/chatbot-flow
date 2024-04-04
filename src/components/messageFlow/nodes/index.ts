import type { Node, NodeTypes } from "reactflow";
import NodeTypeA from "./NodeTypes/TypeA";

export const initialNodes = [
  {
    id: "a",
    type: "nodeTypeA",
    position: { x: 0, y: 0 },
    data: { label: "wixsre" },
  },
] satisfies Node[];

export const nodeTypes = {
  "nodeTypeA": NodeTypeA,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
