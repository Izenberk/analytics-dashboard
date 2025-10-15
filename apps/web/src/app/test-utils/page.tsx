'use client'

import { Container, Typography, Box, Card, CardContent } from "@mui/material"
import { calculateTrend, validateTrendInputs } from "@/lib/trend-calculator"

export default function TestUtilsPage() {
  // Test cases - this is how pros verify their utilities
  const testCases = [
    { current: 120, previous: 100, description: "20% increase" },
    { current: 100, previous: 120, description: "16.7% decrease" },
    { current: 100, previous: 100, description: "No change" },
    { current: 100, previous: 0, description: "From zero" },
    { current: 0, previous: 100, description: "To zero" },
    { current: -50, previous: -100, description: "Negative improvement" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧪 Utility Testing Page
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Professional developers test their utilities before building components.
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, mt: 4 }}>
        {testCases.map((testCase, index) => {
          const result = calculateTrend(testCase.current, testCase.previous);

          return (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6">
                  {testCase.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current: {testCase.current}, Previous: {testCase.previous}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Direction:</strong> {result.direction} | 
                  <strong> Change:</strong> {result.formattedChange} | 
                  <strong> Significant:</strong> {result.isSignificant ? 'Yes' : 'No'}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}