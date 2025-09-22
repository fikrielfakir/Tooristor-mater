# Tooristor - Tourism Platform

## Overview
Tooristor is a React-based tourism platform that allows users to search for destinations, activities, and tourism-related services. The application features a modern, responsive design with multi-language support (English, Arabic, French) and integrates with various mapping services.

## Recent Changes
**Date: September 22, 2025**
- Successfully imported and configured the project for Replit environment
- Installed dependencies with legacy peer deps to resolve React version conflicts
- Configured React dev server for Replit proxy (allowedHosts: 'all', host: 0.0.0.0, port: 5000)
- Set up deployment configuration for autoscale hosting
- Application is now running successfully with frontend fully functional

## Project Architecture

### Frontend (React 17)
- **Build System**: React Scripts with react-app-rewired for customization
- **UI Libraries**: Material-UI, Ant Design, Bootstrap, Styled Components
- **State Management**: Apollo Client for GraphQL, Context API for auth
- **Internationalization**: i18next with support for EN/AR/FR
- **Mapping**: Google Maps API, Leaflet, React Google Maps
- **Styling**: CSS-in-JS with styled-components, custom CSS files

### Key Dependencies
- React 17.0.2 with extensive UI component libraries
- Apollo Client for GraphQL integration (currently pointing to external Laravel backend)
- Font Awesome Pro 5 for icons
- Multiple date pickers and form libraries
- Mapping libraries (Google Maps, Leaflet)

### Configuration Files
- `config-overrides.js`: Custom webpack configuration for Ant Design and dev server settings
- `package.json`: Dependencies and scripts configuration
- `.env`: Contains API keys (managed through Replit secrets)

### Current Status
✅ **Frontend**: Fully functional, running on port 5000
⚠️ **Backend**: External GraphQL API (not included in this project)
✅ **Deployment**: Configured for Replit autoscale hosting

### Development Workflow
1. **Start Development**: Workflow "React Dev Server" runs `npm start` automatically
2. **Build for Production**: `npm run build` creates optimized production build
3. **Deployment**: Configured to use `serve` for static hosting

### Known Issues
- Some React deprecation warnings (componentWillMount) - non-blocking
- CSS case-sensitivity warnings - cosmetic only
- Backend API connectivity depends on external Laravel service

### Notes
- Application uses legacy peer deps installation due to React version conflicts between packages
- Host configuration is critical for Replit proxy functionality
- Font Awesome Pro assets are included in the repository