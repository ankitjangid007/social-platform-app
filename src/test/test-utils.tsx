import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { FormProvider } from '../context/FormContext';
import en from '../../public/locals/en.json';

const testI18n = createInstance();
testI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
  },
  interpolation: { escapeValue: false },
});

interface WrapperProps {
  children: ReactNode;
}

const AllProviders = ({ children }: WrapperProps) => (
  <I18nextProvider i18n={testI18n}>
    <FormProvider>{children}</FormProvider>
  </I18nextProvider>
);

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export { testI18n };
