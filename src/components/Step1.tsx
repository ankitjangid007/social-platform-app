import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useWizard } from '../context/FormContext';
import { FormData, STEP1_FIELDS } from '../types/form';
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

export const Step1 = () => {
  const { t } = useTranslation();
  const { nextStep } = useWizard();
  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await trigger([...STEP1_FIELDS]);
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
          {t('personalInfo')}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 3, fontSize: '0.9rem' }}
        >
          Please fill in your personal details accurately.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            id="fullName"
            label={t('fullName')}
            variant="outlined"
            fullWidth
            required
            placeholder="John Doe"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            FormHelperTextProps={alertProps(!!errors.fullName)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('fullName', {
              required: t('required'),
              minLength: { value: 3, message: t('minLength', { min: 3 }) },
            })}
          />

          <TextField
            id="nationalId"
            label={t('nationalId')}
            variant="outlined"
            fullWidth
            required
            placeholder="ID number"
            error={!!errors.nationalId}
            helperText={errors.nationalId?.message}
            FormHelperTextProps={alertProps(!!errors.nationalId)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('nationalId', { required: t('required') })}
          />

          <TextField
            id="dateOfBirth"
            label={t('dateOfBirth')}
            type="date"
            variant="outlined"
            fullWidth
            required
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
            FormHelperTextProps={alertProps(!!errors.dateOfBirth)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('dateOfBirth', { required: t('required') })}
          />

          <FormControl fullWidth sx={{
            '& .MuiInputLabel-root': {
              backgroundColor: '#fff',
              px: 0.5,
            },
          }} required error={!!errors.gender}>
            <InputLabel htmlFor="gender-select">{t('gender')}</InputLabel>
            <Controller
              name="gender"
              control={control}
              rules={{ required: t('required') }}
              render={({ field }) => (
                <Select
                  native
                  label={t('gender')}
                  inputProps={{ id: 'gender-select' }}
                  {...field}
                  sx={{ borderRadius: '6px' }}
                >
                  <option value="">— Select —</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                  <option value="prefer_not">{t('preferNotToSay')}</option>
                </Select>
              )}
            />
            {errors.gender?.message && (
              <FormHelperText role="alert">
                {errors.gender.message}
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ gridColumn: { sm: 'span 2' } }}>
            <TextField
              id="address"
              label={t('address')}
              variant="outlined"
              fullWidth
              required
              placeholder="Street address"
              error={!!errors.address}
              helperText={errors.address?.message}
              FormHelperTextProps={alertProps(!!errors.address)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
              {...register('address', { required: t('required') })}
            />
          </Box>

          <TextField
            id="city"
            label={t('city')}
            variant="outlined"
            fullWidth
            required
            error={!!errors.city}
            helperText={errors.city?.message}
            FormHelperTextProps={alertProps(!!errors.city)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('city', { required: t('required') })}
          />

          <TextField
            id="state"
            label={t('state')}
            variant="outlined"
            fullWidth
            error={!!errors.state}
            helperText={errors.state?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('state')}
          />

          <TextField
            id="country"
            label={t('country')}
            variant="outlined"
            fullWidth
            required
            error={!!errors.country}
            helperText={errors.country?.message}
            FormHelperTextProps={alertProps(!!errors.country)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('country', { required: t('required') })}
          />

          <TextField
            id="phone"
            label={t('phone')}
            type="tel"
            variant="outlined"
            fullWidth
            required
            placeholder="+1 234 567 8900"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            FormHelperTextProps={alertProps(!!errors.phone)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('phone', {
              required: t('required'),
              pattern: {
                value: /^[+\d\s\-()]{7,20}$/,
                message: t('invalidPhone'),
              },
            })}
          />

          <TextField
            id="email"
            label={t('email')}
            type="email"
            variant="outlined"
            fullWidth
            required
            placeholder="you@email.com"
            error={!!errors.email}
            helperText={errors.email?.message}
            FormHelperTextProps={alertProps(!!errors.email)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '6px' } }}
            {...register('email', {
              required: t('required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('invalidEmail'),
              },
            })}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            pt: 3,
            mt: 3,
            borderTop: '1px solid #d0dae8',
          }}
        >
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
