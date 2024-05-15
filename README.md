[![Playwright Tests](https://github.com/nightshiftmaster/Foody-food-delivery-app/actions/workflows/playwright.yml/badge.svg)](https://github.com/nightshiftmaster/Foody-food-delivery-app/actions/workflows/playwright.yml)

# Foody

Foody is a web application for ordering and delivering food, specializing in pizza, pasta, and hamburgers. The application provides users with a wide selection of dishes and a convenient interface for ordering food for delivery.

## Features

- **Wide Range of Dishes:** Foody offers a diverse selection of dishes, including pizza, pasta, and hamburgers, to cater to the needs of various customers.
- **Easy Ordering:** Users can easily browse the menu and add items to their cart using an intuitive interface.
- **Online Payment:** Users can securely pay for their orders online through a secure payment system integrated with the Stripe API.
- **Order Tracking:** Users can track the status of their orders and receive notifications about their order status.

## Dev Stack

- **Frontend:**
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
- **Database:**
  - PostgreSQL
  - Prisma
  - Supabase
- **Authentication:**
  - NextAuth.js
- **Payment System:**
  - Stripe API
- **State Management:**
  - Zustand
- **Data Fetching:**
  - React Query
- **Deploy:**
  - Vercel
- **Testing**
  - Playwright

[Open Demo](https://foody-app-gray.vercel.app)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nightshiftmaster/Foody-food-delivery-app
   ```

2. Navigate to the project directory:

   ```bash
   cd Foody-food-delivery-app
   ```

3. Install

   ```bash
   npm install
   ```

4. Run the Project

   ```bash
   npm run dev
   ```

## Important !

For full functionality, when running the application locally, it is recommended to store configuration settings, environment variables, api keys and other sensitive information in .env file.
Fake requests to a fake database are simulated in API routes. And the fake database is located in the utils folder. When using real ones, they should be removed or replaced.
Here is the complete list of required environment variables.

- NEXTAUTH_URL
- NEXT_PUBLIC_BASE_API_URL
- NEXTAUTH_SECRET
- GOOGLE_SECRET
- GOOGLE_ID
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
- NEXT_PUBLIC_MAP_ID
- FACEBOOK_CLIENT_ID
- FACEBOOK_CLIENT_SECRET
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- DATABASE_URL
- DIRECT_URL
