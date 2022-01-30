import React from 'react';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { signout, isAuthenticated } from '../auth/helper';
import { useNavigate } from 'react-router-dom';

const pages = ['SignUp', 'Signin'];
const settings = ['Profile', 'Account', 'Dashboard'];

const MenuBar = () => {
  const navigate = useNavigate();
  const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar color='transparent' elevation={0} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <h2 className='navHead'>
            T-Shirt Hub
          </h2>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {isAuthenticated() && (<Avatar >{isAuthenticated().user.name.slice(0,1)}</Avatar>)}
                {!isAuthenticated() && (<MenuRoundedIcon className='navHead' />)}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {!isAuthenticated() && (<>
                {pages.map((pages) => (
                  <MenuItem key={pages} onClick={handleCloseNavMenu}>
                    <NavLink className="navTop" to={pages.toLowerCase()}><Typography textAlign="center">{pages}</Typography></NavLink>
                  </MenuItem>
                ))}
              </>)}

              {isAuthenticated() && (
                <>
                  {settings.map((settings) => (
                    <MenuItem key={settings} onClick={handleCloseNavMenu}>
                      <NavLink className="navTop" to={settings.toLowerCase()}><Typography textAlign="center">{settings}</Typography></NavLink>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={() => {
                    signout(() => {
                      return navigate('/');
                    })
                  }}>
                    <Typography textAlign="center">logout</Typography>
                  </MenuItem>
                </>
              )};

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default MenuBar;
