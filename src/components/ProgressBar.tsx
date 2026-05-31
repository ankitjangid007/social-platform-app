import { useTranslation } from 'react-i18next';
import { useWizard } from '../context/FormContext';
import { Paper, Box, Typography, useTheme } from '@mui/material';

const STEPS = [
  { num: 1, labelKey: 'stepPersonal' },
  { num: 2, labelKey: 'stepFamily' },
  { num: 3, labelKey: 'stepSituation' },
] as const;


export const ProgressBar = () => {
  const { t } = useTranslation();
  const { currentStep } = useWizard();
  const theme = useTheme();

  const totalSteps = STEPS.length;

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const lineOffsetPct = (1 / (2 * totalSteps)) * 100;
  const lineOffset = `${lineOffsetPct}%`;

  const activeFillWidth = `calc((100% - 2 * ${lineOffset}) * ${progress / 100})`;

  const isRtl = theme.direction === 'rtl';

  return (
    <Paper
      sx={{ p: 3, mb: 3, borderRadius: 3 }}
      role="navigation"
      aria-label="Form progress"
    >
      <Box sx={{ position: 'relative', mb: 2.5 }}>

        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 17,
            left: lineOffset,
            right: lineOffset,
            height: 2,
            bgcolor: '#d0dae8',
            zIndex: 0,
          }}
        />

        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 17,
            ...(isRtl
              ? { right: lineOffset, left: 'auto' }
              : { left: lineOffset, right: 'auto' }),
            width: activeFillWidth,
            height: 2,
            bgcolor: 'primary.main',
            zIndex: 0,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <Box
          role="list"
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          {STEPS.map(({ num, labelKey }) => {
            const isCompleted = currentStep > num;
            const isActive    = currentStep === num;

            return (
              <Box
                key={num}
                role="listitem"
                aria-current={isActive ? 'step' : undefined}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75,
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isActive || isCompleted ? 'primary.main' : '#fff',
                    color:   isActive || isCompleted ? '#fff' : '#94a3b8',
                    border:  isActive || isCompleted ? 'none' : '2px solid #d0dae8',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                    ...(isActive && {
                      boxShadow: '0 0 0 4px rgba(26,75,122,0.12)',
                    }),
                  }}
                >
                  {isCompleted ? '✓' : num}
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    fontSize: '0.72rem',
                    color: isActive || isCompleted ? 'primary.main' : '#94a3b8',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {t(labelKey)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${t('step')} ${currentStep} ${t('of')} ${totalSteps}`}
        sx={{
          bgcolor: '#f0f4f9',
          borderRadius: '99px',
          height: 6,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #1a4b7a 0%, #2563a8 100%)',
            borderRadius: '99px',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Box>
    </Paper>
  );
};
