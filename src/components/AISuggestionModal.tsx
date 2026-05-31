import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  TextField,
  Box,
} from '@mui/material';

interface AISuggestionModalProps {
  suggestion: string;
  fieldLabel: string;
  onAccept: (text: string) => void;
  onDiscard: () => void;
}

export const AISuggestionModal = ({
  suggestion,
  onAccept,
  onDiscard,
  fieldLabel,
}: AISuggestionModalProps) => {
  const { t } = useTranslation();
  const [editedText, setEditedText] = useState(suggestion);

  return (
    <Dialog
      open={true}
      onClose={onDiscard}
      aria-labelledby="modal-title"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 600,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #0f2d4a 0%, #1a4b7a 100%)',
          color: 'white',
          py: 2,
          px: 3,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              flexShrink: 0,
            }}
          >
            ✨
          </Box>

          <Box>
            <Typography
              id="modal-title"
              variant="h6"
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              {t('aiSuggestion')}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {fieldLabel}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Alert
          severity="info"
          variant="outlined"
          sx={{
            mb: 2,
            mt: 2,
            borderRadius: 2,
            bgcolor: '#f8fafc',

            '& .MuiAlert-message': {
              width: '100%',
            },
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
            {t('aiDisclaimer')}
          </Typography>
        </Alert>

        <TextField
          fullWidth
          multiline
          minRows={6}
          variant="outlined"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          autoFocus
          slotProps={{
            input: {
              'aria-label': 'Edit AI suggestion',
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#fafbfd',
            },

            '& textarea': {
              fontSize: '1rem',
              lineHeight: 1.8,
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#fafbfd',
        }}
      >
        <Button
          onClick={onDiscard}
          variant="outlined"
          sx={{
            minWidth: 110,
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
          }}

        >
          {t('discard')}
        </Button>
        <Button
          onClick={() => onAccept(editedText)}
          variant="contained"
          sx={{
            minWidth: 130,
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(15,59,102,0.2)',
          }}
        >
          {t('accept')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
