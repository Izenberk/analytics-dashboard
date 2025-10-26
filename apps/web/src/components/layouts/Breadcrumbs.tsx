import React from "react";
import Link from "next/link";
import { Breadcrumbs, Typography, Box } from "@mui/material";

type Crumb = { href?: string; label: string };

export const AppBreadcrumbs: React.FC<{ crumbs: Crumb[] }> = ({ crumbs }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((c, idx) =>
          c.href && idx < crumbs.length - 1 ? (
            <Link key={c.label + idx} href={c.href}>
              <Typography
                component="span"
                sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'none' }}
              >
                {c.label}
              </Typography>
            </Link>
          ) : (
            <Typography key={c.label + idx} color="text.primary">
              {c.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default AppBreadcrumbs;