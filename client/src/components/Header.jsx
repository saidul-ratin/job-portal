import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>JobPortal</Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`mobile-nav-wrapper ${menuOpen ? 'open' : ''}`}>
          <nav className="nav-menu">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/jobs" onClick={closeMenu}>Jobs</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </nav>

          <div className="header-auth">
            {userInfo ? (
              <>
                <Link to="/dashboard" onClick={closeMenu}>{userInfo.name}</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;