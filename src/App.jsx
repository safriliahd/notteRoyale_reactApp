import './App.css'
// import BasicButtonPrimary from './component/button-component/basic-button/view'
import { primary } from './theme/color'
import SidebarApp from './component/sidebar/view'
import RouterAdmin from './router/routerAdmin/view'


function App() {

  return (
    <>
      {/* <h1>hello notte royale</h1>
      <h1 style={{ color: primary[100] }}>hello notte royale</h1> */}
      {/* <p>tes repo</p>
      <h1>tes repo 2</h1>
      <h1>tes aulia</h1>
      <P>ninun</P> */}
      <RouterAdmin />
      {/* <BasicButtonPrimary /> */}
    
      {/* <SidebarApp /> */}
    </>
  )
}

export default App
