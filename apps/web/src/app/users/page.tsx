import React from "react";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import AppBreadcrumbs from "@/components/layouts/Breadcrumbs";

export default function UsersPage() {
  const crumbs = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Users' }];

  return (
    <>
      <Head>
        <title>Users — Analytics Dashboard</title>
        <meta name="description" content="User management and roles." />
      </Head>

      <Box>
        <AppBreadcrumbs crumbs={crumbs} />
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>

        <Typography>
          Placeholder for user list and role management UI.
        </Typography>
      </Box>
    </>
  );
}