import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useWizard } from './context/FormContext';
import { ProgressBar } from './components/ProgressBar';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { SuccessScreen } from './components/SuccessScreen';
import { AppLanguage } from './types/form';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Alert,
  ButtonGroup,
  CircularProgress,
} from '@mui/material';

const LoadingFallback = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f4f7fb',
    }}
  >
    <CircularProgress sx={{ color: '#1a4b7a' }} />
  </Box>
);

const FormContent = () => {
  const { currentStep, submitted, hasSavedData, loadSavedData, clearSavedData } =
    useWizard();
  const { t } = useTranslation();

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <>
      {hasSavedData && (
        <Alert
          severity="warning"
          icon={false}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e0e6ed",
            backgroundColor: "#fffdf8",
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
            }}
          >
            {/* Message */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ fontSize: 22 }}>💾</Box>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "#1a2b49",
                }}
              >
                {t("savedData")}
              </Typography>
            </Box>

            {/* Actions */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                onClick={loadSavedData}
                sx={{
                  minWidth: 120,
                  height: 42,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#0f3b66",

                  "&:hover": {
                    backgroundColor: "#0b2e50",
                  },
                }}
              >
                {t("continueSaved")}
              </Button>

              <Button
                variant="outlined"
                onClick={clearSavedData}
                sx={{
                  minWidth: 120,
                  height: 42,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#c7d1dd",
                  color: "#334155",

                  "&:hover": {
                    borderColor: "#0f3b66",
                    backgroundColor: "#f8fafc",
                  },
                }}
              >
                {t("startFresh")}
              </Button>
            </Box>
          </Box>
        </Alert>
      )}

      <ProgressBar />
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
    </>
  );
};

const App = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState<AppLanguage>('en');

  // Switches toggle for RTL
  const toggleLang = (l: AppLanguage) => {
    setLang(l);
    i18n.changeLanguage(l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(160deg, #e8f0fb 0%, #f4f7fb 40%, #fdf8f0 100%)',
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #0f2d4a 0%, #1a4b7a 100%)',
          boxShadow: '0 4px 16px rgba(15,45,74,0.12)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, sm: 4 },
            py: 1.25,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              zIndex: 1,
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 44,
                height: 44,
                backgroundColor: '#c8953a',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
              }}
            >
              🏛
            </Box>

            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: { xs: '1rem', sm: '1.15rem' },
                }}
              >
                {t('appTitle')}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.75,
                  fontSize: '0.78rem',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {t('appSubtitle')}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              p: "4px",
              backdropFilter: "blur(8px)",
            }}
          >
            <Button
              onClick={() => toggleLang("en")}
              disableRipple
              sx={{
                minWidth: 52,
                height: 38,
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                color:
                  lang === "en"
                    ? "#0f2d4a"
                    : "rgba(255,255,255,0.8)",
                bgcolor:
                  lang === "en"
                    ? "#ffffff"
                    : "transparent",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor:
                    lang === "en"
                      ? "#ffffff"
                      : "rgba(255,255,255,0.08)",
                },
              }}
            >
              EN
            </Button>

            <Button
              onClick={() => toggleLang("ar")}
              disableRipple
              sx={{
                minWidth: 52,
                height: 38,
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "none",
                color:
                  lang === "ar"
                    ? "#0f2d4a"
                    : "rgba(255,255,255,0.8)",
                bgcolor:
                  lang === "ar"
                    ? "#ffffff"
                    : "transparent",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor:
                    lang === "ar"
                      ? "#ffffff"
                      : "rgba(255,255,255,0.08)",
                },
              }}
            >
              AR
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ══════════════ Main content ══════════════ */}
      <Container maxWidth="md" sx={{ flex: 1, py: { xs: 3, sm: 4 } }}>
        <Box sx={{ width: '100%' }}>
          <Suspense fallback={<LoadingFallback />}>
            <FormProvider>
              <FormContent />
            </FormProvider>
          </Suspense>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
