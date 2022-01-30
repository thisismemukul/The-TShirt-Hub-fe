import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon sx={{ color: '#eeeeee' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon sx={{ color: '#eeeeee' }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon sx={{ color: '#eeeeee' }} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon sx={{ color: '#eeeeee' }} />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon sx={{ color: '#eeeeee' }} />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <NavLink className='link' to='/admin/create/category'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#eeeeee' }} />
                </ListItemIcon>
                <ListItemText primary="Create Category" />
            </ListItem>
        </NavLink>
        <NavLink className='link' to='/admin/categories'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#eeeeee' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Category" />
            </ListItem>
        </NavLink>
        <NavLink className='link' to='/admin/create/product'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#eeeeee' }} />
                </ListItemIcon>
                <ListItemText primary="Create Product" />
            </ListItem>
        </NavLink>
        <NavLink className='link' to='/admin/products'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#eeeeee' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Products" />
            </ListItem>
        </NavLink>
        <NavLink className='link' to='/admin/orders'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon sx={{ color: '#eeeeee' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Orders" />
            </ListItem>
        </NavLink>
    </div>
);