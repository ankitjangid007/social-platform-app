export interface FormData {
  // Step 1 — personal information
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  // Step 2 — family and financial
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
  // Step 3 — situation descriptions
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export type AIFieldName =
  | 'financialSituation'
  | 'employmentCircumstances'
  | 'reasonForApplying';

export type AppLanguage = 'en' | 'ar';

export const STEP1_FIELDS = [
  'fullName',
  'nationalId',
  'dateOfBirth',
  'gender',
  'address',
  'city',
  'country',
  'phone',
  'email',
] as const satisfies readonly (keyof FormData)[];

export const STEP2_FIELDS = [
  'maritalStatus',
  'dependents',
  'employmentStatus',
  'monthlyIncome',
  'housingStatus',
] as const satisfies readonly (keyof FormData)[];

export const STEP3_FIELDS = [
  'financialSituation',
  'employmentCircumstances',
  'reasonForApplying',
] as const satisfies readonly (keyof FormData)[];

export const EMPTY_FORM_DATA: FormData = {
  fullName: '',
  nationalId: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
  maritalStatus: '',
  dependents: '0',
  employmentStatus: '',
  monthlyIncome: '',
  housingStatus: '',
  financialSituation: '',
  employmentCircumstances: '',
  reasonForApplying: '',
};
