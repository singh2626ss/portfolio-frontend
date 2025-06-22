# QuantumFin AI Frontend

This repository contains the user interface for **QuantumFin AI**, developed as part of the Agent Development Kit Hackathon with Google Cloud. The frontend presents complex financial insights in a clear, interactive dashboard so that everyday investors can make confident decisions.

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)  
   1. [Prerequisites](#prerequisites)  
   2. [Installation](#installation)  
   3. [Development](#development)  
   4. [Production Build](#production-build)
5. [Project Structure](#project-structure)
6. [Deployment](#deployment)
7. [Contributing](#contributing)

---

## Overview

The frontend is built with React and Tailwind CSS. It communicates with a FastAPI backend (powered by Google’s ADK) to fetch:

- Live market quotes  
- News sentiment scores  
- Risk metrics  
- AI-generated recommendations  

Smooth animations and responsive charts guide you through a real-time view of your portfolio’s health.

---

## Key Features

- **Live Portfolio Overview**  
  Total holdings value updates in real time, with daily gain/loss indicators.

- **Real-Time Market Ticker**  
  A continuously scrolling strip of major stock symbols showing current price and percent change since market open.

- **News Sentiment Panel**  
  Bullish or bearish sentiment analysis for each holding, powered by NewsAPI.

- **Risk Metrics Summary**  
  Value-at-risk, sector concentration and diversification alerts displayed at a glance.

- **Personalized Recommendations**  
  AI-driven suggestions—rebalancing tips, target allocations, or watchlist alerts—based on your profile.

- **Exportable Snapshots**  
  Download your portfolio summary as PDF or JSON via Reporting Agent integration.

---

## Technology Stack

- **Framework**: React 18 + TypeScript  
- **Styling**: Tailwind CSS  
- **Animations**: Framer Motion  
- **Charts**: Recharts  
- **Icons**: Lucide  
- **Build Tool**: Vite  
- **Hosting**: Vercel  

---

## Getting Started

### Prerequisites

- Node.js v16 or newer  
- A Finnhub API key (for live quotes)

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/portfolio-frontend.git
   cd portfolio-frontend


2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your API key

   ```
   VITE_FINNHUB_API_KEY=your_finnhub_api_key
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`. The application reloads automatically on file changes.

### Production Build

Generate optimized assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
portfolio-frontend/
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/          # Logos, images
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level screens
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── main.tsx         # Entry point
├── .env                 # Environment variables (ignored)
├── index.html           # HTML template
├── package.json
└── tailwind.config.js
```

## Deployment

This project is configured for Vercel. Pushing to `main` triggers an automatic build and deployment.

## Contributing

We welcome improvements and fixes. To contribute:

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a pull request describing your changes



**QuantumFin AI Frontend**
Part of the Agent Development Kit Hackathon with Google Cloud
“Demonstrating the power of collaborative AI agents for real-time portfolio insights.”
