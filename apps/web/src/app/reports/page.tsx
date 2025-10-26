import React from "react";
import Head from "next/head";
import { Box, Typography, } from "@mui/material";
import AppBreadcrumbs from "@/components/layouts/Breadcrumbs";

export default function ReportsPage() {
  const crumbs = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Reports' }];

  return (
    <>
      <Head>
        <title>Reports — Analytics Dashboard</title>
        <meta name="description" content="Reports and exports for analytics." />
      </Head>

      <Box>
        <AppBreadcrumbs crumbs={crumbs} />
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>

        <Typography>
          Placeholder for reports listing and export controls. Add filters and export actions here.
        </Typography>
      </Box>
    </>
  );
}