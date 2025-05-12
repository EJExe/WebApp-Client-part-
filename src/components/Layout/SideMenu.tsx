// SideMenu.tsx
// SideMenu.tsx
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  DirectionsCar as DirectionsCarIcon,
  Map as MapIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  Build as BuildIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Construction as ConstructionIcon
} from "@mui/icons-material";


interface SideMenuProps {
  open: boolean;
  onMenuItemClick: (path: string) => void;
  onClose: () => void;
}

// SideMenu.tsx
const SideMenu = ({ open, onMenuItemClick, onClose }: SideMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: open ? 240 : 56,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 56,
          bgcolor: '#1A3C6D',
          marginTop: '64px'
        },
      }}
    >
      <List>
        {/* Главная */}
        <ListItemButton 
          onClick={() => onMenuItemClick('/')}
          sx={{ minHeight: 48 }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
            <HomeIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Главная" 
            sx={{ color: 'white', opacity: open ? 1 : 0 }} 
          />
        </ListItemButton>

        {/* Каталог автомобилей */}
        <ListItemButton 
          onClick={() => onMenuItemClick('/cars')}
          sx={{ minHeight: 48 }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
            <DirectionsCarIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Автомобили" 
            sx={{ color: 'white', opacity: open ? 1 : 0 }} 
          />
        </ListItemButton>

        {/* Карта */}
        <ListItemButton 
          onClick={() => onMenuItemClick('/page2')}
          sx={{ minHeight: 48 }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
            <MapIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Карта" 
            sx={{ color: 'white', opacity: open ? 1 : 0 }} 
          />
        </ListItemButton>

        {/* Администраторские разделы */}
        {isAdmin && (
          <>
            <ListItemButton 
              onClick={() => onMenuItemClick('/admin/cars')}
              sx={{ minHeight: 48 }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                <ConstructionIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Управление авто" 
                sx={{ color: 'white', opacity: open ? 1 : 0 }} 
              />
            </ListItemButton>

            <ListItemButton 
              onClick={() => onMenuItemClick('/admin/cars/new')}
              sx={{ minHeight: 48 }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                <ConstructionIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Добавить Автомобиль" 
                sx={{ color: 'white', opacity: open ? 1 : 0 }} 
              />
            </ListItemButton>

            <ListItemButton 
              onClick={() => onMenuItemClick('/admin/order')}
              sx={{ minHeight: 48 }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                <ConstructionIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Управление заявками" 
                sx={{ color: 'white', opacity: open ? 1 : 0 }} 
              />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default SideMenu;