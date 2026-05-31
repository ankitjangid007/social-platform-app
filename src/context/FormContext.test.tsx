import { renderHook, act } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { FormProvider, useWizard } from './FormContext';
import { EMPTY_FORM_DATA } from '../types/form';

const STORAGE_KEY = 'social_support_form_data';

const wrapper = ({ children }: { children: ReactNode }) => (
  <FormProvider>{children}</FormProvider>
);

describe('FormContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts on step 1 with empty form data', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });
    expect(result.current.currentStep).toBe(1);
    expect(result.current.formData.fullName).toBe('');
    expect(result.current.submitted).toBe(false);
  });

  it('updateFormData merges values and persists to localStorage', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.updateFormData({ fullName: 'Jane Doe' });
    });

    expect(result.current.formData.fullName).toBe('Jane Doe');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    expect(stored.fullName).toBe('Jane Doe');
  });

  it('nextStep and prevStep clamp between 1 and 3', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(2);

    act(() => result.current.nextStep());
    act(() => result.current.nextStep());
    expect(result.current.currentStep).toBe(3);

    act(() => result.current.prevStep());
    expect(result.current.currentStep).toBe(2);
  });

  it('submitForm sets submitted state and reference number', async () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    await act(async () => {
      await result.current.submitForm();
    });

    expect(result.current.submitted).toBe(true);
    expect(result.current.referenceNumber).toMatch(/^SSP-/);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('resetForm clears submission and restores empty data', async () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => result.current.updateFormData({ fullName: 'Test' }));
    await act(async () => {
      await result.current.submitForm();
    });
    act(() => result.current.resetForm());

    expect(result.current.submitted).toBe(false);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.formData).toEqual(EMPTY_FORM_DATA);
  });

  it('detects saved data on mount', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ fullName: 'Saved User' })
    );

    const { result } = renderHook(() => useWizard(), { wrapper });
    expect(result.current.hasSavedData).toBe(true);
  });

  it('loadSavedData restores form from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ fullName: 'Saved User', email: 'a@b.com' })
    );

    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => result.current.loadSavedData());

    expect(result.current.formData.fullName).toBe('Saved User');
    expect(result.current.hasSavedData).toBe(false);
  });

  it('throws when useWizard is used outside provider', () => {
    expect(() => renderHook(() => useWizard())).toThrow(/FormProvider/);
  });
});
