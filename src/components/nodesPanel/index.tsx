import style from "./style.module.css"
import { AiOutlineMessage } from "react-icons/ai";
import { IconContext } from 'react-icons';

function NodesPanel() {
  interface nodeTypeType {
    id: number,
    nodeName: string,
    attribute: string,
    icon: any,
    active: boolean
  }

  let nodeTypes: nodeTypeType[] = [
    {
      id: 1,
      nodeName: "Message",
      attribute: "",
      active: true,
      icon: <AiOutlineMessage />
    },
    {
      id: 2,
      nodeName: "Lorem Ipsum",
      attribute: "",
      active: false,
      icon: <AiOutlineMessage />
    },
    {
      id: 3,
      nodeName: "Lorem Ipsum",
      attribute: "",
      active: false,
      icon: <AiOutlineMessage />
    },
    {
      id: 4,
      nodeName: "Lorem Ipsum",
      attribute: "",
      active: false,
      icon: <AiOutlineMessage />
    },
    {
      id: 4,
      nodeName: "Lorem Ipsum",
      attribute: "",
      active: false,
      icon: <AiOutlineMessage />
    },
  ]

  const handleDragStart = (e: any, nodeName:string) => {
    e.dataTransfer.setData('application/reactflow', nodeName);
    e.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div className={style.nodePanelMain}>
      <div className={style.nodeTitle}>Nodes Panel</div>
      <div className={style.nodesStack}>
        {
          nodeTypes.map((item: nodeTypeType, key: number) => {
            return (
              <div key={key} className={`${style.nodeBox} ${(!item.active) && "deactivateNode"}`} draggable={(item.active)?true:false} onDragStart={(e)=>handleDragStart(e, item.nodeName)}>
                <IconContext.Provider value={{ color: (item.active)?"blue":"grey", size: "26px", className: "global-class-name" }}>
                  {item.icon}
                </IconContext.Provider>
                <span style={{color: (item.active)?"blue":"grey", marginTop: "10px"}}>{item.nodeName}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NodesPanel