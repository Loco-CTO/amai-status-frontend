<h1 align="center">甘い Status Web</h1>

<div align="center">
    <strong>Service Status Dashboard</strong>
</div>

<div align="center">
    An interactive Next.js frontend for monitoring service health and uptime
</div>

<br />

<div align="center">
    <!-- Stability -->
    <a href="https://nextjs.org/docs">
        <img src="https://img.shields.io/badge/framework-Next.js-black.svg?style=for-the-badge"
        alt="Framework" />
    </a>
    <!-- Language -->
    <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=for-the-badge"
        alt="Language" />
    </a>
    <!-- Node Version -->
    <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=for-the-badge"
        alt="Node Version" />
    </a>
    <!-- License -->
    <a href="./LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge"
        alt="License" />
    </a>
</div>

<div align="center">
    <h3>
        <a href="#features">
        Features
        </a>
        <span> | </span>
        <a href="#quick-start">
        Quick Start
        </a>
        <span> | </span>
        <a href="#contributing">
        Contributing
        </a>
    </h3>
</div>

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Development](#development)
- [Localization](#localization)
- [Contributing](#contributing)

## Features

- **Real-time Updates**: Service status is updated in real time using periodic polling.
- **Multi-language Support:** Displays interface in English, Japanese, Korean, Chinese Simplified, and Chinese Traditional
- **Configurable Polling Intervals:** Allows users to set custom intervals for fetching service status updates
- **Browser Language Detection:** Automatically detects and applies the user's browser language preference
- **Backend Error Handling:** Displays error page if backend API becomes unavailable
- **TypeScript:** Entire codebase written in TypeScript with full type checking

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

The frontend will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SERVER_ADDRESS=http://localhost:8182
```

## Architecture

### Theme Customization

Edit `src/styles/theme.css` to customize:

- Color scheme (via CSS variables)
- Typography
- Layout spacing
- Accent colors (used in status indicators)

The theme uses RGB format for colors:

```css
--accent-rgb: 99, 102, 241; /* Indigo */
```

## Development

### Available Scripts

```bash
# Development
npm run dev           # Start dev server with hot reload

# Production
npm run build         # Build for production
npm run start         # Start production server

# Quality
npm run lint          # Run ESLint
npm run format        # Format with Prettier (if configured)
```

### Hot Reload

Changes to components, styles, and locales automatically reload in development mode.

### Debugging

Open DevTools (F12) to inspect:

- Network requests to backend
- Component state in React DevTools
- CSS in Styles tab
- Console for error messages

## Localization

### Supported Languages

- 🇺🇸 English (en)
- 🇯🇵 Japanese (ja)
- 🇰🇷 Korean (ko)
- 🇨🇳 Chinese Simplified (zh-CN)
- 🇹🇼 Chinese Traditional (zh-TW)

### Translation Files

Located in `src/locales/`. Each file contains:

- Page titles and headers
- Status-related messages
- Time range labels
- Error messages
- UI button labels

### Language Detection

The application automatically detects browser language and falls back to English if unsupported.

### Adding Translations

1. Add key-value pairs to all locale files in `src/locales/`
2. Import and use the `t()` function:

```typescript
import { t } from "@/lib/utils/i18n";

// In component
const message = t("statusPage.online", language);
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Local Development Setup

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd frontend
npm install

# Create environment file
echo 'NEXT_PUBLIC_SERVER_ADDRESS=http://localhost:8182' > .env.local

# Start development
npm run dev
```

## License

MIT - See LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
