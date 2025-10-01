## AI Prompt for Building a CitizenPay Checkout Page

**Build a modern, responsive checkout page for CitizenPay using the provided API credentials and SDK. The page should integrate with the CitizenPay JS SDK for order creation and management.**

### Environment Configuration
Use these exact values in your implementation:
- **Base URL**: `https://checkout.pay.brussels`
- **Place ID**: `365`
- **API Key**: `0xFb68096785d18883256e9489bE8F87940c9c551B`

### Technical Requirements

**Frontend Framework**: Use React with TypeScript
**Styling**: Use Tailwind CSS for modern, responsive design
**SDK Integration**: Install and use `@citizenpay/sdk` package

### Core Features to Implement

1. **Order Creation Form**
   - Input fields for order total (in cents)
   - Optional description field
   - Optional items array (id and quantity)
   - Submit button to create order

2. **Order Status Display**
   - Show order details after creation (orderId, slug, link)
   - Display order status with appropriate styling
   - Show transaction hash when available
   - Real-time status updates

3. **Payment Flow Integration**
   - Redirect to the generated checkout link
   - Handle order status polling
   - Display payment success/failure states

### API Integration

Use the SDK functions:
- `createOrder()` - Create new orders with the provided credentials
- `getOrder()` - Fetch order status and details

### UI/UX Requirements

1. **Modern Design**
   - Clean, professional interface
   - Mobile-responsive layout
   - Loading states and error handling
   - Success/error notifications

2. **User Experience**
   - Clear form validation
   - Intuitive navigation
   - Accessible design (WCAG guidelines)
   - Smooth animations and transitions

3. **Visual Elements**
   - CitizenPay branding colors
   - Professional typography
   - Clear call-to-action buttons
   - Status indicators with appropriate colors

### Order Status Handling

Handle all order statuses from the SDK:
- `pending` - Show loading state
- `paid` - Show success message
- `cancelled` - Show cancellation notice
- `needs_minting` - Show processing state
- `needs_burning` - Show processing state
- `refunded` - Show refund information
- `refund_pending` - Show refund processing
- `refund` - Show refund status
- `correction` - Show correction notice

### Error Handling

- Network error handling
- API error responses
- Invalid form input validation
- Timeout handling for long-running operations

### Example Usage

The page should support creating orders like:
```typescript
// Basic order
const order = await createOrder({
  baseUrl: 'https://checkout.pay.brussels',
  apiKey: '0xFb68096785d18883256e9489bE8F87940c9c551B',
  placeId: 365,
  total: 2500, // €25.00 in cents
  description: 'Coffee and pastry'
});

// Order with items
const order = await createOrder({
  baseUrl: 'https://checkout.pay.brussels',
  apiKey: '0xFb68096785d18883256e9489bE8F87940c9c551B',
  placeId: 365,
  total: 5000, // €50.00 in cents
  description: 'Restaurant order',
  items: [
    { id: 1, quantity: 2 },
    { id: 3, quantity: 1 }
  ]
});
```

### Deliverables

1. Complete React TypeScript application
2. Package.json with all dependencies
3. Responsive HTML/CSS layout
4. Full integration with CitizenPay SDK
5. Error handling and loading states
6. README with setup instructions

### Additional Notes

- The API uses European currency (likely EUR)
- Amounts are in cents (smallest currency unit)
- The checkout link should open in a new tab/window
- Implement proper TypeScript types for all data structures
- Include proper error boundaries and fallback UI

Build a production-ready checkout page that merchants can easily integrate into their existing systems.