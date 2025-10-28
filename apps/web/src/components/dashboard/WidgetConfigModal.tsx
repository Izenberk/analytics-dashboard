'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from '@mui/material';
import useWidgetConfigStore, { WidgetConfig } from '@/lib/stores/useWidgetConfigStore';

type WidgetConfigModalProps = {
  widgetId: string | null;
  open: boolean;
  onClose: () => void;
};

const DEFAULT_REFRESH_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: 'Off', value: null },
  { label: '30 seconds', value: 30 },
  { label: '1 minute', value: 60 },
  { label: '5 minutes', value: 300 },
];

export const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({ widgetId, open, onClose }) => {
  const getConfig = useWidgetConfigStore((s) => s.getConfig);
  const setConfig = useWidgetConfigStore((s) => s.setConfig);

  const [title, setTitle] = useState('');
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState<{ title?: string }>({});

  // When modal opens or widgetId changes, load current config
  useEffect(() => {
    if (!widgetId) return;
    const cfg = getConfig(widgetId) ?? ({} as WidgetConfig);
    setTitle(cfg.title ?? '');
    setRefreshInterval(cfg.refreshInterval ?? null);
    setVisible(cfg.visible ?? true);
    setErrors({});
  }, [widgetId, getConfig, open]);

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (title.trim().length === 0) {
      next.title = 'Title is required';
    } else if (title.length > 100) {
      next.title = 'Title is too long';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!widgetId) return;
    if (!validate()) return;
    setConfig(widgetId, { title: title.trim(), refreshInterval, visible });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="widget-config-dialog">
      <DialogTitle id="widget-config-dialog">Configure widget</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title}
            fullWidth
            inputProps={{ maxLength: 100 }}
          />

          <FormControl fullWidth>
            <InputLabel id="refresh-interval-label">Auto Refresh</InputLabel>
            <Select
              labelId="refresh-interval-label"
              value={refreshInterval === null ? '' : String(refreshInterval)}
              label="Auto Refresh"
              onChange={(e) => {
                const v = e.target.value === '' ? null : Number(e.target.value);
                setRefreshInterval(v);
              }}
            >
              {DEFAULT_REFRESH_OPTIONS.map((opt) => (
                <MenuItem key={String(opt.value)} value={opt.value === null ? '' : String(opt.value)}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              Choose how frequently the widget should refresh automatically.
            </Typography>
          </FormControl>

          <FormControlLabel
            control={<Switch checked={visible} onChange={(e) => setVisible(e.target.checked)} />}
            label="Visible"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetConfigModal;