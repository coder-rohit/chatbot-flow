import { Bounce, toast } from 'react-toastify';
import style from './style.module.css'
import { addDataToEdgesTable, addDataToNodesTable, openDatabase } from '../../indexedDB';

function Header({ edges, nodes, db }: any) {

  const saveFlowCheck = async () => {
    let emptyTargetCount = 0
    for (let i = 0; i < nodes.length; i++) {
      let x = edges.findIndex((item: any) => item.target === nodes[i].id)
      if (x === -1) {
        emptyTargetCount++
      }
    }
    console.log(emptyTargetCount)
    return (emptyTargetCount > 1) ? false : true
  }

  const saveChanges = async () => {
    if (await saveFlowCheck()) {
      // let db = openDatabase()

      nodes.id = 0
      edges.id = 0
      await addDataToNodesTable(db, nodes)
      await addDataToEdgesTable(db, edges)


      toast.success('Flow Saved to Local Storage', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {

      toast.error('Cannot Save Flow', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  return (
    <nav className={style.headerMain}>
      <div className={style.flowSide}>
        {/* header area for toolbar or something else */}
      </div>
      <div className={style.nodePanelSide}>
        <button className={style.saveButton} onClick={saveChanges}>Save Changes</button>
      </div>
    </nav>
  )
}

export default Header