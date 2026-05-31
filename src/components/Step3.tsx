import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useWizard } from '../context/FormContext';
import { useAI } from '../hooks/useAI';
import { AISuggestionModal } from './AISuggestionModal';
import { AIFieldName, FormData, STEP3_FIELDS } from '../types/form';
import { getAiApiKey } from '../config/api';
import { isAISuggestionSuccess } from '../types/ai';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import i18n from '../i18n';


const FIELDS: {
  key: AIFieldName;
  labelKey: string;
  placeholderKey: string;
}[] = [
    {
      key: 'financialSituation',
      labelKey: 'financialSituation',
      placeholderKey: 'financialSituationPlaceholder',
    },
    {
      key: 'employmentCircumstances',
      labelKey: 'employmentCircumstances',
      placeholderKey: 'employmentCircumstancesPlaceholder',
    },
    {
      key: 'reasonForApplying',
      labelKey: 'reasonForApplying',
      placeholderKey: 'reasonForApplyingPlaceholder',
    },
  ];

interface ModalState {
  field: AIFieldName;
  suggestion: string;
}

export const Step3 = () => {
  const { t } = useTranslation();
  const { formData, updateFormData, prevStep, submitForm } = useWizard();
  const { generateSuggestion, loading } = useAI();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [aiError, setAiError] = useState<
    Partial<Record<AIFieldName, string>>
  >({});

  const aiConfigured = Boolean(getAiApiKey());
  const isArabic = i18n.language === 'ar';

  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await trigger([...STEP3_FIELDS]);
    if (!valid) return;

    setIsSubmitting(true);
    try {
      await submitForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resolveAiErrorMessage = (code: string): string => {
    switch (code) {
      case 'timeout':
        return t('aiTimeout');
      case 'error':
        return t('aiError');
      case 'not_configured':
        return t('aiNotConfigured');
      case 'quota_exceeded':
        return t('aiQuotaExceeded');
      case 'rate_limit':
        return t('aiRateLimit');
      default:
        return code;
    }
  };

  const handleHelpMeWrite = async (fieldKey: AIFieldName) => {
    setAiError((prev) => ({ ...prev, [fieldKey]: undefined }));

    const result = await generateSuggestion(fieldKey, formData, i18n.language);

    if (isAISuggestionSuccess(result)) {
      setModalState({ field: fieldKey, suggestion: result.suggestion });
    } else {
      setAiError((prev) => ({
        ...prev,
        [fieldKey]: resolveAiErrorMessage(result.error),
      }));
    }
  };

  const handleAccept = (text: string) => {
    if (!modalState) return;
    setValue(modalState.field, text);
    updateFormData({ [modalState.field]: text });
    setModalState(null);
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} noValidate className="slide-in">
        <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ color: 'primary.dark', mb: 0.5, lineHeight: 1.2 }}
          >
            {t('situationDesc')}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3, fontSize: '0.9rem' }}
          >
            {t('situationHint')}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {FIELDS.map(({ key, labelKey, placeholderKey }) => {
              const fieldError = errors[key];
              return (
                <Box key={key}>
                  <TextField
                    id={key}
                    label={t(labelKey)}
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    placeholder={t(placeholderKey)}
                    error={!!fieldError || !!aiError[key]}
                    helperText={
                      fieldError?.message ||
                      (aiError[key] ? (
                        <Box
                          component="span"
                          sx={{ color: 'warning.main' }}
                        >
                          ⚠ {aiError[key]}
                        </Box>
                      ) : undefined)
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        alignItems: 'flex-start',
                      },
                      '& .MuiInputBase-inputMultiline': {
                        paddingBottom: '60px',
                      },
                      '& textarea::placeholder': {
                        color: '#98A2B3',
                        opacity: 1,
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      },
                      '& .MuiFormHelperText-root': {
                        mt: 0.5,
                      },
                      '& .MuiInputAdornment-root': {
                        position: 'absolute',
                        [isArabic ? 'left' : 'right']: 12,
                        bottom: 12,
                        margin: 0,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ alignSelf: 'flex-end', mb: 1 }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleHelpMeWrite(key)}
                            disabled={loading[key] || !aiConfigured}
                            title={
                              !aiConfigured
                                ? t('aiNotConfigured')
                                : t('helpMeWrite')
                            }
                            sx={{
                              minWidth: 140,
                              height: 40,
                              borderRadius: '999px',
                              textTransform: 'none',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              boxShadow: '0 2px 8px rgba(15,59,102,0.15)',

                              '&:hover': {
                                boxShadow: '0 4px 12px rgba(15,59,102,0.25)',
                              },
                            }}
                            startIcon={
                              loading[key] ? (
                                <CircularProgress
                                  size={14}
                                  sx={{ color: 'white' }}
                                />
                              ) : (
                                <span aria-hidden="true">✨</span>
                              )
                            }
                          >
                            {loading[key] ? t('generating') : t('helpMeWrite')}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    {...register(key, {
                      required: t('required'),
                      minLength: {
                        value: 30,
                        message: t('minLength', { min: 30 }),
                      },
                    })}
                  />
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              pt: 3,
              mt: 3,
              borderTop: '1px solid #d0dae8',
            }}
          >
            <Button
              onClick={prevStep}
              variant="outlined"
              startIcon={<span aria-hidden="true">←</span>}
              disabled={isSubmitting}
              sx={{ borderRadius: '6px', py: 1.25, px: 2.5, fontSize: '0.95rem' }}
            >
              {t('back')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              endIcon={
                isSubmitting ? (
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                ) : (
                  <span aria-hidden="true">✓</span>
                )
              }
              sx={{
                borderRadius: '6px',
                py: 1.25,
                px: 2.5,
                fontSize: '0.95rem',
                bgcolor: '#c8953a',
                '&:hover': { bgcolor: '#e8b85a' },
                '&:disabled': { bgcolor: 'rgba(200,149,58,0.6)' },
              }}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </Box>
        </Paper>
      </form>

      {modalState && (
        <AISuggestionModal
          suggestion={modalState.suggestion}
          fieldLabel={t(
            FIELDS.find((f) => f.key === modalState.field)?.labelKey ?? ''
          )}
          onAccept={handleAccept}
          onDiscard={() => setModalState(null)}
        />
      )}
    </>
  );
};
