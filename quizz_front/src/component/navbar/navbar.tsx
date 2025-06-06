import '../../assets/template/assets/css/nucleo-icons.css';

import '../../assets/template/assets/css/nucleo-svg.css';
import '../../assets/template/assets/css/font-awesome.css';
import '../../assets/template/assets/css/argon-design-system.css';
import logo from '../../assets/template/assets/img/brand/blue.png' ;
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../utils/AuthContext/AuthContext';

import { logOut } from '../../features/userLogique/userCridentials';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';
import { Menu, MenuItem, IconButton } from '@mui/material';
import React from 'react';
export default function Navbar() {
  const user = useContext(AuthContext) ;
  const dispatch = useAppDispatch() ;
  const navigate = useNavigate() ;

  const logOutFrom = () =>{
    dispatch(logOut());
    if(!localStorage.getItem('authTokens')){
        toast.success('Logged out ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigate('/');
    }

}
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

const handleClick = (event:React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
  const location = useLocation();
  const isTransparent = location.pathname === '/login' || location.pathname === '/register';
  const navbarClass = isTransparent
    ? 'navbar navbar-main navbar-expand-lg navbar-transparent navbar-light py-2'
    : 'navbar navbar-main navbar-expand-lg bg-white navbar-light position-sticky top-0 shadow py-2';
  return (
    <nav className={navbarClass}>
      <div className="container">
        <a className="navbar-brand mr-lg-5" href="./index.html">
          <img src={logo} alt="brand" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar_global">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="col-6 collapse-brand">
                <a href="./index.html">
                  <img src="./assets/img/brand/blue.png" alt="brand" />
                </a>
              </div>
              <div className="col-6 collapse-close">
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
            <li className="nav-item dropdown">
              <a href="#" className="nav-link" data-toggle="dropdown" role="button">
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Profile</span>
              </a>
              <div className="dropdown-menu dropdown-menu-xl">
                <div className="dropdown-menu-inner">
                  <a href="https://demos.creative-tim.com/argon-design-system/docs/getting-started/overview.html" className="media d-flex align-items-center">
                    <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                      <i className="ni ni-spaceship"></i>
                    </div>
                    <div className="media-body ml-3">
                      <h6 className="heading text-primary mb-md-1">Getting started</h6>
                      <p className="description d-none d-md-inline-block mb-0">Learn how to use compiling Scss, change brand colors and more.</p>
                    </div>
                  </a>
                  <a href="https://demos.creative-tim.com/argon-design-system/docs/foundation/colors.html" className="media d-flex align-items-center">
                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                      <i className="ni ni-palette"></i>
                    </div>
                    <div className="media-body ml-3">
                      <h6 className="heading text-primary mb-md-1">Foundation</h6>
                      <p className="description d-none d-md-inline-block mb-0">Learn more about colors, typography, icons and the grid system we used for .</p>
                    </div>
                  </a>

                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link" data-toggle="dropdown" role="button">
                <i className="ni ni-collection d-lg-none"></i>
                <span className="nav-link-inner--text">Quizz</span>
              </a>
              <div className="dropdown-menu">
                <a href="./examples/landing.html" className="dropdown-item">join room</a>
                <a href="./examples/profile.html" className="dropdown-item">create Quizz</a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav align-items-lg-center ml-lg-auto">

          {user.user.exist ? ( 
    <li className="nav-item">
    <IconButton onClick={handleClick}>
    <img 
  src={user.user.profile_picture} 
  alt="profile"
  style={{
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #1976d2', 
    objectFit: 'cover',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)',
  }}
/>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} component="a" href="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={() => { handleClose(); logOutFrom(); }}>
        Logout
      </MenuItem>
    </Menu>
  </li>

) : (
    <li className="nav-item d-none d-lg-block">
      <a href="/login" rel="noopener noreferrer" className="btn btn-primary btn-icon">
        <span className="nav-link-inner--text">Login</span>
      </a>
    </li>
)}

          </ul>
        </div>
      </div>
    </nav>
  );
}