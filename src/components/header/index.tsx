import style from './style.module.css'

function Header() {
  return (
    <nav className={style.headerMain}>
      <div className={style.flowSide}>
        <button className={style.alertMessage}>Save Changes</button>
      </div>
      <div className={style.nodePanelSide}>
        <button className={style.saveButton}>Save Changes</button>
      </div>
    </nav>
  )
}

export default Header