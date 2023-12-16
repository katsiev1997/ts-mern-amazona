import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Badge,
  NavDropdown,
} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Store } from './Store';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = React.useContext(Store);

  React.useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentInfo');
    window.location.href = '/signin';
  };
  return (
    <div className='d-flex flex-column h-full vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>TS Amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Link to='/cart' className='nav-link'>
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <Link
                  className='dropdown-item'
                  to='#signout'
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className='nav-link' to='/signin'>
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className='text-center'>All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
