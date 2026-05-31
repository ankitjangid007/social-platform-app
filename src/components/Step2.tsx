import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useWizard } from '../context/FormContext';
import { FormData, STEP2_FIELDS } from '../types/form';
import {
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Button,
} from '@mui/material';

export const Step2 = () => {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useWizard();
  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await trigger([...STEP2_FIELDS]);
    if (valid) {
      nextStep();
    }
  };

  const alertProps = (hasError: boolean) =>
    hasError ? ({ role: 'alert' } as const) : {};

  return (
    <form onSubmit={handleNext} noValidate className="slide-in">
      <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ color: 'primary.dark', mb: 0.5, lineHeight: 1.2 }}
        >
          {t('familyFinancial')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 3, fontSize: '0.9rem' }}
        >
          This information helps us assess your eligibility accurately.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <FormControl fullWidth sx={{
            '& .MuiInputLabel-root': {
              backgroundColor: '#fff',
              px: 0.5,
            },
          }} required error={!!errors.maritalStatus}>
            <InputLabel htmlFor="marital-status-select">
              {t('maritalStatus')}
            </InputLabel>
            <Controller
              name="maritalStatus"
              control={control}
              rules={{ required: t('required') }}
              render={({ field }) => (
                <Select
                  native
                  label={t('maritalStatus')}
                  inputProps={{ id: 'marital-status-select' }}
                  {...field}
                  sx={{ borderRadius: '6px' }}
                >
                  <option value="">— Select —</option>
                  <option value="single">{t('single')}</option>
                  <option value="married">{t('married')}</option>
                  <option value="divorced">{t('divorced')}</option>
                  <option value="widowed">{t('widowed')}</option>
                </Select>
              )}
            />
            {errors.maritalStatus?.message && (
              <FormHelperText role="alert">
                {errors.maritalStatus.message}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            id="dependents"
            label={t('dependents')}
            type="number"
            variant="outlined"
            fullWidth
            required
            inputProps={{ min: 0, max: 20 }}
            error={!!errors.dependents}
            helperText={errors.dependents?.message}
            FormHelperTextProps={alertProps(!!errors.dependents)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('dependents', {
              required: t('required'),
              min: { value: 0, message: 'Cannot be negative' },
              max: { value: 20, message: 'Maximum 20 dependents' },
            })}
          />

          <FormControl fullWidth sx={{
            '& .MuiInputLabel-root': {
              backgroundColor: '#fff',
              px: 0.5,
            },
          }} required error={!!errors.employmentStatus}>
            <InputLabel htmlFor="employment-status-select">
              {t('employmentStatus')}
            </InputLabel>
            <Controller
              name="employmentStatus"
              control={control}
              rules={{ required: t('required') }}
              render={({ field }) => (
                <Select
                  native
                  label={t('employmentStatus')}
                  inputProps={{ id: 'employment-status-select' }}
                  {...field}
                  sx={{ borderRadius: '6px' }}
                >
                  <option value="">— Select —</option>
                  <option value="employed">{t('employed')}</option>
                  <option value="unemployed">{t('unemployed')}</option>
                  <option value="self_employed">{t('selfEmployed')}</option>
                  <option value="student">{t('student')}</option>
                  <option value="retired">{t('retired')}</option>
                </Select>
              )}
            />
            {errors.employmentStatus?.message && (
              <FormHelperText role="alert">
                {errors.employmentStatus.message}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            id="monthlyIncome"
            label={t('monthlyIncome')}
            type="number"
            variant="outlined"
            fullWidth
            required
            inputProps={{ min: 0 }}
            placeholder="0"
            error={!!errors.monthlyIncome}
            helperText={errors.monthlyIncome?.message}
            FormHelperTextProps={alertProps(!!errors.monthlyIncome)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('monthlyIncome', {
              required: t('required'),
              min: { value: 0, message: 'Cannot be negative' },
            })}
          />

          <FormControl
            fullWidth
            required
            sx={{
              '& .MuiInputLabel-root': {
                backgroundColor: '#fff',
                px: 0.5,
              },
              gridColumn: { xs: 'auto', sm: 'span 2' }
            }}
            error={!!errors.housingStatus}
          >
            <InputLabel htmlFor="housing-status-select">
              {t('housingStatus')}
            </InputLabel>
            <Controller
              name="housingStatus"
              control={control}
              rules={{ required: t('required') }}
              render={({ field }) => (
                <Select
                  native
                  label={t('housingStatus')}
                  inputProps={{ id: 'housing-status-select' }}
                  {...field}
                  sx={{ borderRadius: '6px' }}
                >
                  <option value="">— Select —</option>
                  <option value="owned">{t('owned')}</option>
                  <option value="rented">{t('rented')}</option>
                  <option value="living_with_family">
                    {t('livingWithFamily')}
                  </option>
                  <option value="homeless">{t('homeless')}</option>
                </Select>
              )}
            />
            {errors.housingStatus?.message && (
              <FormHelperText role="alert">
                {errors.housingStatus.message}
              </FormHelperText>
            )}
          </FormControl>
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
            sx={{ borderRadius: '6px', py: 1.25, px: 2.5, fontSize: '0.95rem' }}
          >
            {t('back')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<span aria-hidden="true">→</span>}
            sx={{ borderRadius: '6px', py: 1.25, px: 2.5, fontSize: '0.95rem' }}
          >
            {t('next')}
          </Button>
        </Box>
      </Paper>
    </form>
  );
};
