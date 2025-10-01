# Brussels Pay Crypto Wednesday Hackathon

This project is part of the [Brussels Pay Crypto Wednesday Hackathon](https://pay.brussels/events/crypto-wednesday-hackathon), an event focused on developing innovative payment solutions using cryptocurrency technologies. Participants collaborate to create projects that enhance the adoption and functionality of digital currencies in everyday transactions.

The hackathon provides a platform for developers, designers, and entrepreneurs to network, share ideas, and contribute to the evolution of modern payment systems.

---

## Project Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Follow these steps to get started with the Brussels Pay hackathon project:

### 1. Install Brussels Pay App
Download and install the "Brussels Pay" app on your mobile phone:

- **iOS (iPhone/iPad)**: [Download from App Store](https://apps.apple.com/us/app/brussels-pay/id6742148784)
- **Android**: [Download from Google Play Store](https://play.google.com/store/apps/details?id=brussels.pay.wallet2&hl=en-US)

This app will be used to scan QR codes and confirm purchases. Brussels Pay is a local payment app specifically designed for the Brussels region, allowing you to support local businesses and make fast, contactless payments.

### 2. Set Up Environment Variables
Copy the example environment file and configure your API credentials:

```bash
cp .env.example .env
```

Then edit the `.env` file with your Brussels Pay API credentials:
- `CHECKOUT_BASE_URL`: Base URL for the Brussels Pay API
- `CHECKOUT_API_KEY`: Your API key for authentication  
- `CHECKOUT_PLACE_ID`: Your place/business ID

You can get these values from your Brussels Pay dashboard or contact the hackathon organizers.

### 3. Install Dependencies
Install the required modules:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Run the Project
Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Test the Payment Flow
- Try confirming a purchase in the web application
- Scan the generated QR code with the Brussels Pay app
- Complete the payment flow to test the integration

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
