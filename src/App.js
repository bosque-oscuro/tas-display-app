import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Alert, 
  Button, 
  Chip,
  Paper
} from '@mui/material';
import { CloudUpload, CheckCircle, Error, HourglassEmpty } from '@mui/icons-material';
import FileUpload from './components/FileUpload';
import TimetableDisplay from './components/TimetableDisplay';
import apiService from './services/apiService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [timetableData, setTimetableData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceStatus, setServiceStatus] = useState('checking');

  useEffect(() => {
    checkServiceHealth();
  }, []);

  const checkServiceHealth = async () => {
    try {
      await apiService.checkHealth();
      setServiceStatus('online');
      setError('');
    } catch (error) {
      setServiceStatus('offline');
      setError('TAS Extractor Service is not available. Please ensure the service is running on port 3000.');
    }
  };

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await apiService.uploadDocument(file);
      setTimetableData(result);
    } catch (error) {
      setError(error.message || 'Failed to process document');
      setTimetableData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTimetableData(null);
    setError('');
  };

  const getStatusIcon = () => {
    switch (serviceStatus) {
      case 'online':
        return <CheckCircle color="success" />;
      case 'offline':
        return <Error color="error" />;
      default:
        return <HourglassEmpty color="warning" />;
    }
  };

  const getStatusColor = () => {
    switch (serviceStatus) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Toolbar>
            <CloudUpload sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TAS Display App
            </Typography>
            <Chip
              icon={getStatusIcon()}
              label={`Service: ${serviceStatus === 'online' ? 'Online' : serviceStatus === 'offline' ? 'Offline' : 'Checking...'}`}
              color={getStatusColor()}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            Timetable & Schedule Extractor
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
            Upload timetables and schedules to extract and display structured data
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              action={
                serviceStatus === 'offline' && (
                  <Button color="inherit" size="small" onClick={checkServiceHealth}>
                    Retry
                  </Button>
                )
              }
            >
              {error}
            </Alert>
          )}

          {!timetableData ? (
            <Box>
              <FileUpload 
                onFileUpload={handleFileUpload} 
                isLoading={isLoading}
              />
              
              <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom align="center">
                  Supported Formats
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mt: 2 }}>
                  {[
                    { icon: '🖼️', text: 'Images (JPG, PNG, GIF, BMP, WebP, TIFF)' },
                    { icon: '📄', text: 'PDF Documents' },
                    { icon: '📝', text: 'Word Documents (DOCX)' },
                    { icon: '📋', text: 'Text Files (TXT)' }
                  ].map((format, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="h6">{format.icon}</Typography>
                      <Typography variant="body2">{format.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button 
                  variant="contained" 
                  startIcon={<CloudUpload />}
                  onClick={handleReset}
                >
                  Upload Another File
                </Button>
              </Box>
              <TimetableDisplay timetableData={timetableData} />
            </Box>
          )}
        </Container>

        <Box component="footer" sx={{ bgcolor: 'grey.800', color: 'white', py: 2, mt: 'auto' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" align="center">
              TAS Display App - Timetable and Schedule Extraction Service
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
