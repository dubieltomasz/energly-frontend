# Energly (frontend)
Energly Frontend is a web-based user interface for the Energly energy monitoring platform. It provides a dashboard-style experience to view and analyze energy usage data, integrating with Energly’s backend services to present metrics, trends, and account-related information in a modern front-end application.

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=dubieltomasz_energly-frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=dubieltomasz_energly-frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=dubieltomasz_energly-frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=dubieltomasz_energly-frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=dubieltomasz_energly-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=dubieltomasz_energly-frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=dubieltomasz_energly-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=dubieltomasz_energly-frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/dubieltomasz/energly-frontend)

## Tech Stack
- Vite – fast build tool and dev server for modern front-end projects
- React (v19) – UI library for building the web interface
- TypeScript – static typing to improve maintainability and reduce runtime errors
- React Router DOM – client-side routing for the app’s navigation
- Recharts – charting/visualization components for displaying energy-related metrics
- Vitest (jsdom) – testing framework with a browser-like DOM environment
- react-dotenv – environment-variable integration for front-end configuration

## Installation
1. Clone the repository
```
git clone https://github.com/dubieltomasz/energly-frontend.git
cd energly-frontend
```
2. Install dependencies
```
npm install
```
3. Configure environment variables using template
```
cp .env.template .env
nvim .env
```
4. Build for production
```
npm run build
```

## Links
- Backend Repository: https://github.com/dubieltomasz/energly-backend
- Checkout the working app at: https://energly-frontend.onrender.com/