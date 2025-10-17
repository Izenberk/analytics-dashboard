'use client';

import {
  Box,
  Typography,
  Chip,
  Stack
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

export function DashboardHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <DashboardIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant='h4' component='h1' fontWeight="bold">
              Analytics Dashboard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Real-time business intelligence overview
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
            icon={<TrendingUpIcon />}
            label='Live Data'
            color='success'
            variant='outlined'
            size='small'
          />
          <Chip
            label='Updated 2 min ago'
            variant='outlined'
            size='small'
          />
        </Stack>
      </Stack>
    </Box>
  )
}