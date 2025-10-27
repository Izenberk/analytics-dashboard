'use client';

import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  Settings as ConfigureIcon,
  GetApp as ExportIcon,
  Fullscreen as FullscreenIcon,
  VisibilityOff as RemoveIcon,
} from '@mui/icons-material';

import { WidgetActionProps } from '@/types/widget-actions';

export const WidgetActions: React.FC<WidgetActionProps> = ({
  onRefresh,
  onConfigure,
  onExport,
  onFullscreen,
  onRemove,
  widgetId,
  widgetTitle = 'Widget',
  showOnHover = false, // default to visible (improves discoverability)
  size = 'small',
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const open = Boolean(anchorEl);

  // Memoized action list
  const availableActions = React.useMemo(() => {
    const actions: Array<{
      type: string;
      label: string;
      icon: React.ReactNode;
      onClick: () => void;
    }> = [];

    if (onRefresh) {
      actions.push({
        type: 'refresh',
        label: 'Refresh Data',
        icon: <RefreshIcon fontSize='small' />,
        onClick: onRefresh,
      });
    }

    if (onConfigure) {
      actions.push({
        type: 'configure',
        label: 'Configure',
        icon: <ConfigureIcon fontSize='small' />,
        onClick: onConfigure,
      });
    }

    if (onExport) {
      actions.push({
        type: 'export',
        label: 'Export Data',
        icon: <ExportIcon fontSize="small" />,
        onClick: onExport,
      });
    }

    if (onFullscreen) {
      actions.push({
        type: 'fullscreen',
        label: 'Fullscreen',
        icon: <FullscreenIcon fontSize="small" />,
        onClick: onFullscreen,
      });
    }

    if (onRemove) {
      actions.push({
        type: 'remove',
        label: 'Remove Widget',
        icon: <RemoveIcon fontSize="small" />,
        onClick: onRemove,
      });
    }

    return actions;
  }, [onRefresh, onConfigure, onExport, onFullscreen, onRemove]);

  // Early return for no actions
  if (availableActions.length === 0) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: typeof availableActions[0]) => {
    // Logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎬 Widget Action Executed:`, {
        widgetId,
        widgetTitle,
        actionType: action.type,
        timestamp: new Date().toISOString(),
      });
    }

    try {
      action.onClick();
    } catch (err) {
      // Keep UI responsive even if callback throws
      console.error('Widget action handler threw:', err);
    }

    handleClose();
  };

  // Decide whether to show the icon: if showOnHover is true, only show on hover; otherwise always show.
  const shouldShow = !showOnHover || isHovered;

  return (
    <Stack
      direction="row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <Tooltip title={`${widgetTitle} actions`}>
          <IconButton
            onClick={handleClick}
            size={size}
            sx={{
              // Visible by default for better discovery. If showOnHover is true, slightly dim until hovered.
              opacity: showOnHover ? (isHovered ? 1 : 0.9) : 1,
              transition: 'transform 120ms ease, opacity 120ms ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              '&:hover': { transform: 'scale(1.06)' },
            }}
            aria-label={`Actions for ${widgetTitle}`}
          >
            <MoreIcon fontSize={size === 'small' ? 'small' : 'medium'} />
          </IconButton>
        </Tooltip>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 180,
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {availableActions.map((action) => (
          <MenuItem
            key={action.type}
            onClick={() => handleActionClick(action)}
          >
            <ListItemIcon>
              {action.icon}
            </ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default WidgetActions;