import style from './style.module.css'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { IconContext } from 'react-icons';
import { changeData } from '../../redux/reducer/nodesSlice';

function NodeSettingsPanel({ nodes, setNodes }: any) {

  // get node data from redux store
  const nodeSettingData = useSelector((state: RootState) => state.nodeReducer)
  const dispatch = useDispatch()

  const [newNodeName, setNewNodeName] = useState<string>(nodeSettingData.nodeName)

  const handleNodeChange = (newLabel: string) => {
    setNewNodeName(newLabel)
    // changing node data (label on node)
    const updatedArray = nodes.map((item: any) => {
      if (item.id === nodeSettingData.nodeID) {
        return { ...item, data: { label: newLabel } };
      }
      return item;
    })
    // setting updated node to node state
    setNodes(updatedArray)
  }

  function handleBackButtonClick() {
    // sending data to redux store to toggle between node panel and node settings 
    dispatch(changeData({
      showSettingPanel: false,
      nodeID: 0,
      nodeName: ""
    }))
  }

  // setting initial node label for input tag
  useEffect(() => {
    setNewNodeName(nodeSettingData.nodeName)
  }, [nodeSettingData.nodeName])

  return (
    <div className={style.nodeSettingPanelMain}>
      <div className={style.nodeTitle}>
        <IconContext.Provider value={{ color: "grey", size: "24px", className: "global-class-name" }}>
          <IoArrowBackSharp onClick={handleBackButtonClick} />
        </IconContext.Provider>
        <div>
          Node Setting
        </div>
        <div>
        </div>
      </div>
      <div className={style.textArea}>
        <label>Text</label>
        <textarea value={newNodeName} onChange={(e) => handleNodeChange(e.target.value)} />
      </div>
    </div>
  )
}

export default NodeSettingsPanel