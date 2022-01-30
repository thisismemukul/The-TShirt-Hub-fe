import React from 'react';
import { NavLink } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Badge from '@mui/material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { isAuthenticated } from '../auth/helper';
import { loadCart,loadWishlist } from './helper/Carthelper';

const useStyles = makeStyles((theme) => ({
  bottomNavBar: {
    backgroundColor: "#1c1c1c",

  },
}));

const BopttomMenuBar = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
      <BottomNavigation className={classes.bottomNavBar} sx={{ width: "100%" }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value="home"
          icon={<NavLink className="nav" exact="true" activeclassname="active" to="/"><HomeRoundedIcon /> </NavLink >}
        />

        <BottomNavigationAction
          value="profile"
          icon={<NavLink className="nav" to="/wishlist">
            <Badge badgeContent={(loadWishlist() ? loadWishlist().length : 0)} color="info">
              <FavoriteIcon />
            </Badge>
          </NavLink>}
        />
        {!isAuthenticated() && (<BottomNavigationAction value="favorites" icon={<NavLink className="nav" to="/user/dashboard"><DashboardIcon /></NavLink>} />)}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <BottomNavigationAction
            value="favorites"
            icon={<NavLink className="nav" to="/user/dashboard"><DashboardIcon /></NavLink>}
          />
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <BottomNavigationAction
            value="favorites"
            icon={<NavLink className="nav" to="/admin/dashboard"><DashboardIcon /></NavLink>}
          />
        )}

        <BottomNavigationAction
          value="cart"
          icon={<NavLink className="nav" to="/cart">
            <Badge badgeContent={(loadCart() ? loadCart().length : 0)} color="info">
              <ShoppingBagRoundedIcon />
            </Badge>
          </NavLink>}
        />
        <BottomNavigationAction
          value="profile"
          icon={<NavLink className="nav" to="/profile"><AccountBoxRoundedIcon /></NavLink>}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BopttomMenuBar;
