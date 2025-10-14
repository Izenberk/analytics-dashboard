import { formatNumber, formatCurrency, calculatePercentageChange, cn } from "./utils";

// Test utility functions
console.log('Testing utilities...')
console.log('formatNumber(1234567):', formatNumber(1234567)) // Should show: 1.2M
console.log('formatCurrency(1234.56):', formatCurrency(1234.56)) // Should show: $1,234.56
console.log('calculatePercentageChange(120, 100):', calculatePercentageChange(120, 100)) // Should show 20% increase
console.log('cn("px-2 py-1", "px-4"):', cn('px-2 py-1', 'px-4')) // Should merge classes properly

export {} // Make this a module
