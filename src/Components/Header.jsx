import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../Context/TokenAuth'

function Header({insideDashboard}) {
const{isAuthorized,setIsAuthorized}=useContext(tokenAuthContext)
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }
  return (
 
    <Navbar className="" style={{backgroundColor:'rgb(144, 238, 144)',width:"100%",position:'fixed',zIndex:5,top:'0px'}} >
          <Container >
          <Navbar.Brand >  <Link to={'/'} style={{textDecoration:'none'}}>
             <h4 ><i style={{height:'25px'}} className="fa-solid fa-hands-holding-circle fa-flip me-2"></i><b><span style={{color:'#FAF9F6'}}>P</span>roject <span style={{color:'#FAF9F6'}} >F</span>air</b></h4>
              </Link></Navbar.Brand>
{
  insideDashboard&&
  <div className="ms-auto">
    <button onClick={handleLogout} style={{textDecoration:'none'}} className='btn btn-link text-light fw-bolder'><i className='fa-solid fa-gear me-2'></i>Logout</button>
  </div>

}
          </Container>
        </Navbar>
  )
}

export default Header