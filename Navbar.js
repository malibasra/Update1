import React from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const loginStatus = localStorage.getItem('loginStatus');

  function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('loginStatus');
    navigate('/');
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">V CART</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/">Features</Link>
            <Link className="nav-link" to="/about">About</Link>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ACCOUNT
              </a>
              <ul className="dropdown-menu">
              {loginStatus === 'Login Successfully' ? (
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                  </>
                )}
              </ul>
            </li>
          </div>
          <form className="d-flex ms-auto" role="search">
            {loginStatus === 'Login Successfully' && (
              <div className="navbar-greeting" style={{ color: 'lightgray', position: 'absolute', top: '10px', right: '310px' }}>
                <h2>Hello, {username}!</h2>
              </div>
            )}
            <input className="form-control me-2 bg-light text-dark" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    </>
  )
}