
import { useTranslation } from 'react-i18next';
import { useWizard } from '../context/FormContext';
import { Paper, Box, Typography, Button, Chip } from '@mui/material';

export const SuccessScreen = () => {
  const { t } = useTranslation();
  const { referenceNumber, resetForm } = useWizard();

  return (
    <Paper sx={{ p: 6, borderRadius: 3, textAlign: 'center' }}>
      <Box 
        sx={{ 
          width: 80, 
          height: 80, 
          bgcolor: 'success.light', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mx: 'auto',
          mb: 2,
          fontSize: '2.5rem',
        }}
      >
        ✓
      </Box>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
        {t('successTitle')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('successMessage')}
      </Typography>
      <Chip 
        label={referenceNumber} 
        sx={{ 
          fontFamily: 'monospace', 
          fontSize: '1.25rem', 
          py: 2, 
          px: 4, 
          bgcolor: 'primary.dark', 
          color: 'white', 
          borderRadius: 2,
          mb: 2
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 3 }}>
        📧 {t('successNote')}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={resetForm}
        sx={{ borderRadius: '6px' }}
      >
        {t('newApplication')}
      </Button>
    </Paper>
  );
};
