import React from "react";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import AppBreadcrumbs from "@/components/layouts/Breadcrumbs";

export default function SettingsPage() {
  const crumbs = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Settings' }];

  return (
    <>
      <Head>
        <title>Settings — Analytics Dashboard</title>
        <meta name="description" content="Application settings and preferences." />
      </Head>

      <Box>
        <AppBreadcrumbs crumbs={crumbs} />
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Typography>
          Placeholder for app settings. Add account and dashboard preferences here.
        </Typography>
      </Box>
    </>
  );
}