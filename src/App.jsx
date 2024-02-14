
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer'
import { useCol } from 'react-bootstrap/esm/Col'
import { useContext } from 'react'
import { tokenAuthContext } from './Context/TokenAuth'



function App() {
const{isAuthorized,setIsAuthorized}=useContext(tokenAuthContext)

  return (
    <>
    
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login'element={<Auth></Auth>}></Route>
      <Route path='/register' element={<Auth insideRegister></Auth>}></Route>
      <Route path='/dashboard' element={isAuthorized?<Dashboard></Dashboard>:<Home></Home>}></Route>
      <Route path='/projects' element={isAuthorized?<Projects></Projects>:<Home></Home>}></Route>
      <Route path='/*' element={<Navigate to={'/'}/>}></Route>
 </Routes>
 <Footer></Footer>
    </>
  )
}

export default App
