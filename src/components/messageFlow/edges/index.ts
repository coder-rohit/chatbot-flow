import { MarkerType, type Edge, type EdgeTypes } from "reactflow";

const customEdge = {
  // ... other properties
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

export const initialEdges = [

] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
