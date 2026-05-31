import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  useForm,
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from 'react-hook-form';
import { FormData, EMPTY_FORM_DATA } from '../types/form';

const STORAGE_KEY = 'social_support_form_data';

export interface WizardContextValue {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitted: boolean;
  submitForm: () => Promise<void>;
  resetForm: () => void;
  referenceNumber: string;
  hasSavedData: boolean;
  loadSavedData: () => void;
  clearSavedData: () => void;
  formMethods: UseFormReturn<FormData>;
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [hasSavedData, setHasSavedData] = useState(false);

  const formMethods = useForm<FormData>({
    defaultValues: EMPTY_FORM_DATA,
  });
  const { watch, reset, setValue, getValues } = formMethods;
  const formData = watch();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<FormData>;
      if (parsed && Object.keys(parsed).length > 0) {
        setHasSavedData(true);
      }
    } catch {
      console.error('Error parsing saved data');
    }
  }, []);

  const saveProgress = useCallback((data: FormData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const loadSavedData = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as FormData;
      reset(parsed);
      setHasSavedData(false);
    } catch {
      console.error('Error loading saved data');
    }
  }, [reset]);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedData(false);
  }, []);

  const updateFormData = useCallback(
    (newData: Partial<FormData>) => {
      (Object.keys(newData) as (keyof FormData)[]).forEach((key) => {
        const value = newData[key];
        if (value !== undefined) {
          setValue(key, value, { shouldDirty: true });
        }
      });
      saveProgress({ ...getValues(), ...newData });
    },
    [setValue, getValues, saveProgress]
  );

  const nextStep = useCallback(() => {
    saveProgress(getValues());
    setCurrentStep((s) => Math.min(s + 1, 3));
  }, [getValues, saveProgress]);

  const prevStep = useCallback(
    () => setCurrentStep((s) => Math.max(s - 1, 1)),
    []
  );

  const submitForm = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const ref = 'SSP-' + Date.now().toString(36).toUpperCase();
    setReferenceNumber(ref);
    setSubmitted(true);
    clearSavedData();
  }, [clearSavedData]);

  const resetForm = useCallback(() => {
    reset(EMPTY_FORM_DATA);
    setCurrentStep(1);
    setSubmitted(false);
    setReferenceNumber('');
    clearSavedData();
  }, [reset, clearSavedData]);

  const value: WizardContextValue = {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    submitted,
    submitForm,
    resetForm,
    referenceNumber,
    hasSavedData,
    loadSavedData,
    clearSavedData,
    formMethods,
  };

  return (
    <WizardContext.Provider value={value}>
      <RHFFormProvider {...formMethods}>{children}</RHFFormProvider>
    </WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextValue => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a FormProvider');
  }
  return context;
};

export const useFormContext = useWizard;
