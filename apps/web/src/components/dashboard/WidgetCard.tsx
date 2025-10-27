'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type WidgetCardProps = {
  id: string;
  title?: string;
  children?: React.ReactNode;
  onConfigureClick?: (widgetId: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

export const WidgetCard: React.FC<WidgetCardProps> = ({
  id,
  title = '',
  children,
  onConfigureClick,
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isHovered, setIsHovered] = React.useState(false);

  const showSettings = isMobile || isHovered;

  return (
    <Card
      className={`widget-card ${className}`}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-widget-id={id}
    >
      <CardHeader
        title={title}
        sx={{ pb: 1 }}
        action={
          onConfigureClick && (
            <IconButton
              aria-label={`Configure ${title || id}`}
              size="small"
              onClick={() => onConfigureClick(id)}
              sx={{
                opacity: showSettings ? 1 : 0,
                transition: 'opacity 160ms ease-in-out',
                visibility: 'visible',
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
          )
        }
      />
      <CardContent sx={{ flex: 1, pt: 0 }}>{children}</CardContent>
    </Card>
  );
};

export default WidgetCard;