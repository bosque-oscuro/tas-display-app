import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Box, 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert,
  Fade
} from '@mui/material';
import { CloudUpload, CheckCircle } from '@mui/icons-material';

const FileUpload = ({ onFileUpload, isLoading }) => {
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejectedFile = rejectedFiles[0];
      setUploadStatus(`File rejected: ${rejectedFile.errors[0]?.message || 'Invalid file type'}`);
      setTimeout(() => setUploadStatus(''), 5000);
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploadStatus(`Uploading ${file.name}...`);
    
    try {
      await onFileUpload(file);
      setUploadStatus('Upload successful!');
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      setTimeout(() => setUploadStatus(''), 5000);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp', '.tiff'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled: isLoading,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  return (
    <Box sx={{ mb: 3 }}>
      <Paper
        {...getRootProps()}
        elevation={isDragActive ? 8 : 2}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          border: `2px dashed ${isDragActive ? '#667eea' : '#ccc'}`,
          bgcolor: isDragActive ? 'primary.50' : isLoading ? 'grey.100' : 'background.paper',
          transition: 'all 0.3s ease',
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isLoading ? 0.7 : 1,
          '&:hover': !isLoading ? {
            borderColor: 'primary.main',
            bgcolor: 'primary.50',
          } : {},
        }}
      >
        <input {...getInputProps()} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {isLoading ? (
            <>
              <CircularProgress size={48} />
              <Typography variant="body1" color="text.secondary">
                Processing document...
              </Typography>
            </>
          ) : (
            <>
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main' }} />
              {isDragActive ? (
                <Typography variant="h6" color="primary">
                  Drop the file here...
                </Typography>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    Drag & drop a timetable file here, or click to select
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports: Images, PDF, DOCX, TXT
                  </Typography>
                </>
              )}
            </>
          )}
        </Box>
      </Paper>
      
      {uploadStatus && (
        <Fade in={Boolean(uploadStatus)}>
          <Alert 
            severity={uploadStatus.includes('failed') ? 'error' : 'success'}
            icon={uploadStatus.includes('failed') ? undefined : <CheckCircle />}
            sx={{ mt: 2 }}
          >
            {uploadStatus}
          </Alert>
        </Fade>
      )}
    </Box>
  );
};

export default FileUpload;
