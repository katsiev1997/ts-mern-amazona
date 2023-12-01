import React from 'react'
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'
import { Link } from 'react-router-dom'

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = React.useContext(Store)

  React.useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }
  return (
    <div className="d-flex flex-column h-full vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Link to="/">
              <Navbar.Brand>TS Amazona</Navbar.Brand>
            </Link>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <Link to="signin" className="nav-link">
              Sign In
            </Link>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  )
}

export default App
