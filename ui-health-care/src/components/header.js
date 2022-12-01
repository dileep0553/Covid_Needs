import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logohome from "../image/logo.jpg"
import "../css/homestyle.css"

function Header() {
  return (
    <div class="nav-bg" style={{boxShadow:'2px 2px 10px'}}> 
     <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand href="/">
        <img src= {logohome} style={{    width: "100px",
    height: "100px"}} />
         <span style={{ paddingLeft: "400px",fontSize: "48px",color: "blue"}}> Co-Needs</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>

  );
}

export default Header;