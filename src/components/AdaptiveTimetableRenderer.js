import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';

const AdaptiveTimetableRenderer = ({ timetableData }) => {
  if (!timetableData?.data?.schedule) {
    return null;
  }

  const { schedule, documentInfo } = timetableData.data;

  // Detect timetable structure
  const detectTimetableStructure = () => {
    const hasWeeklySessions = schedule.sessions && schedule.sessions.length > 0;
    const hasDailySchedules = schedule.dailySchedules && Object.keys(schedule.dailySchedules).length > 0;
    
    if (hasWeeklySessions) {
      const days = [...new Set(schedule.sessions.map(s => s.day))];
      const timeSlots = [...new Set(schedule.sessions.map(s => s.time))];
      return {
        type: 'weekly_grid',
        days: days.sort((a, b) => {
          const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
          return dayOrder.indexOf(a.toLowerCase()) - dayOrder.indexOf(b.toLowerCase());
        }),
        timeSlots: timeSlots.sort(),
        sessions: schedule.sessions
      };
    }
    
    if (hasDailySchedules) {
      const dayEntries = Object.entries(schedule.dailySchedules);
      return {
        type: dayEntries.length === 1 ? 'single_day' : 'multi_day',
        dayEntries
      };
    }
    
    return { type: 'unknown' };
  };

  const structure = detectTimetableStructure();

  // Render weekly grid timetable (like class timetables)
  const renderWeeklyGrid = () => {
    const { days, timeSlots, sessions } = structure;
    
    return (
      <Paper elevation={3} sx={{ 
        overflow: 'hidden', 
        border: '2px solid #2d3748',
        borderRadius: 2
      }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: `140px repeat(${days.length}, 1fr)`,
          minWidth: Math.max(800, days.length * 120 + 140)
        }}>
          {/* Header */}
          <Box sx={{ 
            bgcolor: '#2d3748', 
            color: 'white', 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            borderRight: '1px solid #4a5568'
          }}>
            <AccessTime sx={{ mr: 1, fontSize: '1.1rem' }} />
            Time
          </Box>
          
          {days.map((day, index) => (
            <Box key={index} sx={{ 
              bgcolor: '#2d3748', 
              color: 'white', 
              p: 2, 
              textAlign: 'center', 
              fontWeight: 'bold',
              fontSize: '0.9rem',
              borderRight: index < days.length - 1 ? '1px solid #4a5568' : 'none'
            }}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Box>
          ))}

          {/* Time slots and sessions */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeIndex}>
              <Box sx={{ 
                bgcolor: '#f7fafc', 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: '600',
                borderBottom: timeIndex < timeSlots.length - 1 ? '1px solid #e2e8f0' : 'none',
                borderRight: '1px solid #e2e8f0',
                fontSize: '0.85rem',
                color: '#2d3748'
              }}>
                {timeSlot}
              </Box>
              
              {days.map((day, dayIndex) => {
                const session = sessions.find(s => s.day === day && s.time === timeSlot);
                return (
                  <Box key={`${timeIndex}-${dayIndex}`} sx={{ 
                    bgcolor: session ? '#e6fffa' : 'white',
                    p: 1.5,
                    borderBottom: timeIndex < timeSlots.length - 1 ? '1px solid #e2e8f0' : 'none',
                    borderRight: dayIndex < days.length - 1 ? '1px solid #e2e8f0' : 'none',
                    minHeight: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s',
                    '&:hover': session ? { bgcolor: '#b2f5ea' } : {}
                  }}>
                    {session ? (
                      <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography variant="body2" fontWeight="bold" sx={{ 
                          fontSize: '0.8rem',
                          color: '#1a202c',
                          lineHeight: 1.3,
                          mb: session.duration ? 0.5 : 0,
                          wordBreak: 'break-word'
                        }}>
                          {session.subject}
                        </Typography>
                        {session.duration && (
                          <Chip 
                            label={`${session.duration}m`} 
                            size="small" 
                            sx={{ 
                              height: '20px',
                              fontSize: '0.7rem',
                              bgcolor: '#3182ce',
                              color: 'white',
                              fontWeight: '600',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        )}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.disabled" sx={{ fontSize: '1.5rem', opacity: 0.3 }}>
                        -
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </React.Fragment>
          ))}
        </Box>
      </Paper>
    );
  };

  // Render single day schedule (like daily activity sheets)
  const renderSingleDay = () => {
    const [day, activities] = structure.dayEntries[0];
    
    return (
      <Paper elevation={3} sx={{ 
        overflow: 'hidden', 
        border: '2px solid #2d3748',
        borderRadius: 2
      }}>
        <Box sx={{ 
          bgcolor: '#2d3748', 
          color: 'white', 
          p: 3, 
          textAlign: 'center', 
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          {day.charAt(0).toUpperCase() + day.slice(1)} - Daily Schedule
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '140px 1fr', minWidth: '700px' }}>
          {activities.map((activity, index) => (
            <React.Fragment key={index}>
              <Box sx={{ 
                bgcolor: '#f7fafc', 
                p: 2.5, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: '600',
                borderBottom: index < activities.length - 1 ? '1px solid #e2e8f0' : 'none',
                borderRight: '1px solid #e2e8f0',
                fontSize: '0.9rem',
                color: '#2d3748'
              }}>
                {activity.time}
              </Box>
              
              <Box sx={{ 
                bgcolor: '#e6fffa',
                p: 2.5,
                borderBottom: index < activities.length - 1 ? '1px solid #e2e8f0' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: '#b2f5ea' }
              }}>
                <Typography variant="body1" fontWeight="600" sx={{ 
                  color: '#1a202c',
                  fontSize: '0.95rem'
                }}>
                  {activity.activity}
                </Typography>
                {activity.duration && (
                  <Chip 
                    label={`${activity.duration}m`} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#3182ce',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.75rem'
                    }}
                  />
                )}
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </Paper>
    );
  };

  // Render multi-day compact view
  const renderMultiDay = () => {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 3 }}>
        {structure.dayEntries.map(([day, activities]) => (
          <Paper key={day} elevation={3} sx={{ 
            border: '1px solid #e2e8f0',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              bgcolor: '#2d3748', 
              color: 'white', 
              p: 2, 
              textAlign: 'center', 
              fontWeight: 'bold',
              fontSize: '0.95rem'
            }}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Box>
            <Box sx={{ p: 2 }}>
              {activities.map((activity, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 1.5,
                  mb: index < activities.length - 1 ? 1 : 0,
                  bgcolor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: 1,
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: '#e9ecef' }
                }}>
                  <Chip 
                    label={activity.time} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#3182ce',
                      color: 'white',
                      fontWeight: '600',
                      minWidth: '75px',
                      fontSize: '0.75rem'
                    }}
                  />
                  <Typography variant="body2" fontWeight="600" sx={{ 
                    flex: 1,
                    color: '#2d3748',
                    fontSize: '0.85rem'
                  }}>
                    {activity.activity}
                  </Typography>
                  {activity.duration && (
                    <Chip 
                      label={`${activity.duration}m`} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    );
  };

  // Main render logic
  switch (structure.type) {
    case 'weekly_grid':
      return renderWeeklyGrid();
    case 'single_day':
      return renderSingleDay();
    case 'multi_day':
      return renderMultiDay();
    default:
      return (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
          No timetable data available to display
        </Typography>
      );
  }
};

export default AdaptiveTimetableRenderer;
