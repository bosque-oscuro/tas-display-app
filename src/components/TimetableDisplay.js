import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  ExpandMore, 
  Schedule, 
  School, 
  Person
} from '@mui/icons-material';
import AdaptiveTimetableRenderer from './AdaptiveTimetableRenderer';

const TimetableDisplay = ({ timetableData }) => {
  if (!timetableData) {
    return null;
  }

  const { data } = timetableData;
  if (!data) {
    return null;
  }

  const { documentInfo, schedule, ui } = data;


  const renderSummary = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Schedule />
        Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {ui.summary.totalSessions}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Sessions
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {ui.summary.subjects?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subjects
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {ui.summary.days?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Days
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {ui.summary.timeSlots?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time Slots
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      {ui.summary.subjects && ui.summary.subjects.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Subjects:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ui.summary.subjects.map((subject, index) => (
              <Chip key={index} label={subject} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      )}
      
      {ui.summary.timeRange && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Time Range: <strong>{ui.summary.timeRange}</strong>
          </Typography>
        </Box>
      )}
    </Paper>
  );

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
          {ui?.displayTitle || documentInfo?.school || 'Timetable'}
        </Typography>
        {ui?.subtitle && (
          <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
            {ui.subtitle}
          </Typography>
        )}
        {(ui?.teacher || documentInfo?.class) && (
          <Typography variant="body1" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Person />
            {ui?.teacher ? `Teacher: ${ui.teacher}` : `Class: ${documentInfo.class}`}
          </Typography>
        )}
      </Paper>

      {renderSummary()}
      
      {/* Use Adaptive Timetable Renderer */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Schedule />
          Timetable
        </Typography>
        <AdaptiveTimetableRenderer timetableData={timetableData} />
      </Box>

      <Accordion sx={{ mt: 4 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <School />
            Document Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">Type</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {documentInfo?.type || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">School</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {documentInfo?.school || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">Class</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {documentInfo?.class || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">Term</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {documentInfo?.term || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TimetableDisplay;
