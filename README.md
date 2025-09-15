# TAS Display App

A React web application for displaying timetables and schedules extracted from the TAS Extractor Service. Features a modern Material-UI interface with adaptive timetable rendering.

## 🚀 Features

### User Interface
- **Modern Material-UI Design**: Professional, responsive interface with custom theming
- **Drag & Drop Upload**: Intuitive file upload with visual feedback and progress indicators
- **Adaptive Timetable Rendering**: Automatically detects and renders different timetable formats
- **Real-time Service Monitoring**: Live backend service health status with retry functionality
- **Error Handling**: Comprehensive error states with user-friendly messages

### Timetable Display
- **Weekly Grid View**: Traditional class timetable layout with time slots and subjects
- **Daily Schedule View**: Single-day activity timeline format
- **Multi-day Compact View**: Multiple days displayed in card format
- **Interactive Elements**: Hover effects, session details, and duration indicators
- **Summary Statistics**: Total sessions, subjects, days, and time range overview

### File Support
- **Images**: JPEG, PNG, GIF, BMP, WebP, TIFF
- **Documents**: PDF, DOCX, TXT
- **Size Limit**: 10MB maximum file size
- **Validation**: Client-side file type and size validation

## 📦 Installation

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **TAS Extractor Service** running on configured API endpoint

### Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd TAS-Display-App
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoint
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open Application**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | http://localhost:3000 | Backend API endpoint |


## 📱 Usage

### Basic Workflow
1. **Service Status**: Check the service status indicator in the top-right corner
2. **Upload File**: Drag and drop a timetable file or click to browse
3. **Processing**: Watch real-time processing feedback with progress indicators
4. **View Results**: Explore the adaptive timetable display with summary statistics
5. **Upload Another**: Use the "Upload Another File" button to process more documents

### Supported Timetable Formats
- **Weekly Grid Timetables**: Traditional class schedules with time slots and days
- **Daily Activity Schedules**: Single-day timeline format
- **Multi-day Schedules**: Multiple days in compact card view

## 🔌 API Integration

### Service Communication
The app communicates with the TAS Extractor Service using axios with:
- **Request/Response Interceptors**: Automatic logging and error handling
- **Timeout Management**: 30s default, 60s for uploads, 5s for health checks
- **Error Recovery**: Automatic retry mechanisms and user feedback

### Expected API Response Format
```json
{
  "success": true,
  "extractionType": "timetable",
  "fileType": ".jpg",
  "data": {
    "documentInfo": {
      "type": "weekly_timetable",
      "school": "Little Thurrock Primary School",
      "class": "2EJ",
      "term": "Spring Term",
      "teacher": "Ms. Smith",
      "week": "Week 2"
    },
    "schedule": {
      "type": "weekly_grid",
      "sessions": [...],
      "dailySchedules": {...}
    },
    "ui": {
      "displayTitle": "Little Thurrock Primary School - 2EJ",
      "subtitle": "Spring Term Week 2",
      "scheduleGrid": [...],
      "summary": {
        "totalSessions": 25,
        "subjects": ["Maths", "English", "Science"],
        "days": ["Monday", "Tuesday", "Wednesday"],
        "timeSlots": ["09:00", "10:30", "13:00"],
        "timeRange": "09:00 - 15:30"
      }
    },
    "metadata": {...}
  },
  "processedAt": "2023-12-07T10:30:00.000Z",
  "originalFileName": "timetable.jpg",
  "fileSize": 1024000,
  "processingTime": "2340ms"
}
```

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── FileUpload.js              # Drag & drop upload interface
│   ├── TimetableDisplay.js        # Main timetable display component
│   └── AdaptiveTimetableRenderer.js # Smart timetable format detection
├── services/
│   └── apiService.js              # API communication layer
└── App.js                         # Main application component
```

### Key Components
- **App.js**: State management, service health monitoring, error handling
- **FileUpload.js**: File validation, upload progress, drag & drop UX
- **TimetableDisplay.js**: Summary statistics, document info, layout orchestration
- **AdaptiveTimetableRenderer.js**: Format detection, responsive rendering
- **apiService.js**: HTTP client, request/response interceptors, error handling

## 🎨 Design System

### Material-UI Theme
```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
    background: { default: '#f5f5f5' }
  }
});
```

### Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Grid Layouts**: CSS Grid and Flexbox for complex layouts
- **Interactive Elements**: Hover states, transitions, and animations
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🚀 Development

### Available Scripts
```bash
# Development server (port 3001)
npm start

# Build for deployment
npm run build
npm run analyze

# Run tests
npm test
```

### Development Workflow
1. **Start Backend**: Ensure TAS Extractor Service is running
2. **Environment Setup**: Configure `.env` file
3. **Start Frontend**: Run `npm start`
4. **Live Reload**: Changes automatically refresh the browser
5. **Testing**: Upload sample timetable files

## 📦 Deployment

### Build Process
```bash
# Create build
npm run build

# Serve static files
npm run serve
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Server**: Express.js static file serving

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🔍 Troubleshooting

### Common Issues

**Service Connection Failed**
- Verify TAS Extractor Service is running on correct port
- Check CORS configuration in backend
- Confirm API URL in environment variables

**File Upload Errors**
- Ensure file size is under 10MB limit
- Verify file type is supported (images, PDF, DOCX, TXT)
- Check network connectivity and timeout settings

**Display Issues**
- Verify API response format matches expected structure
- Check browser console for JavaScript errors
- Ensure Material-UI theme is properly loaded

**Performance Issues**
- Enable React Profiler in development
- Check for memory leaks in file upload/processing
- Monitor network requests in browser DevTools

### Debug Mode
```bash
# Enable verbose logging
REACT_APP_DEBUG=true npm start

# Analyze bundle size
npm run analyze
```

## 🧪 Testing

### Manual Testing
1. **Service Health**: Verify status indicator shows "Online"
2. **File Upload**: Test with various file types and sizes
3. **Error Handling**: Test with invalid files and offline service
4. **Responsive Design**: Test on different screen sizes
5. **Accessibility**: Test with screen readers and keyboard navigation

### Sample Files
Test with various timetable formats:
- Weekly class timetables
- Daily activity schedules
- Multi-day event schedules
- Different image qualities and formats

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow Material-UI design guidelines
4. Add tests for new components
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check browser console for error messages
- Verify backend service connectivity
- Review component documentation
