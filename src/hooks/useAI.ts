import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { FormData, AIFieldName } from '../types/form';
import { AISuggestionResult } from '../types/ai';
import { getAiApiKey, getAiApiUrl } from '../config/api';

const TIMEOUT_MS = 30000;

type PromptBuilder = (data: FormData) => string;

const fieldPrompts: Record<AIFieldName, PromptBuilder> = {
  financialSituation: (data) =>
    `I am applying for government financial assistance. My employment status is: ${data.employmentStatus || 'not specified'}, monthly income: ${data.monthlyIncome ? '$' + data.monthlyIncome : 'not specified'}, housing status: ${data.housingStatus || 'not specified'}, number of dependents: ${data.dependents || '0'}. Help me write a clear, honest, and concise description of my current financial situation in 3-4 sentences for a government assistance application.`,

  employmentCircumstances: (data) =>
    `I am applying for government financial assistance. My employment status is: ${data.employmentStatus || 'not specified'}. Help me write a clear and honest description of my employment circumstances and work history in 3-4 sentences for a government assistance application.`,

  reasonForApplying: (data) =>
    `I am applying for government financial assistance. My situation: employment status is ${data.employmentStatus || 'not specified'}, monthly income ${data.monthlyIncome ? '$' + data.monthlyIncome : 'unknown'}, supporting ${data.dependents || '0'} dependents. Help me write a compelling and genuine reason for why I am applying for financial assistance in 3-4 sentences.`,
};

interface OpenAIChoice {
  message?: { content?: string };
}

interface OpenAIResponse {
  choices?: OpenAIChoice[];
}

interface OpenAIErrorBody {
  error?: { message?: string };
}

export const useAI = () => {
  const [loading, setLoading] = useState<Partial<Record<AIFieldName, boolean>>>(
    {}
  );
  const [error, setError] = useState<Partial<Record<AIFieldName, string | null>>>(
    {}
  );

  const generateSuggestion = useCallback(
    async (
      fieldName: AIFieldName,
      formData: FormData,
      language: string,
    ): Promise<AISuggestionResult> => {
      const apiKey = getAiApiKey();
      console.log("apikey:", apiKey);
      if (!apiKey) {
        return { error: 'not_configured' };
      }

      setLoading((prev) => ({ ...prev, [fieldName]: true }));
      setError((prev) => ({ ...prev, [fieldName]: null }));

      const promptFn = fieldPrompts[fieldName];

      try {
        const response = await axios.post<OpenAIResponse>(
          getAiApiUrl(),
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are a helpful assistant that helps people write clear, honest descriptions for government assistance applications.
                          Write in first person.
                          Be sincere and factual.
                          Avoid using dramatic language.
                          IMPORTANT: Return the response in ${language === 'ar' ? 'Arabic' : 'English'}.
                          Do not translate field names.
                          Do not explain anything outside the requested text.`,
              },
              {
                role: 'user',
                content: promptFn(formData),
              },
            ],
            max_tokens: 300,
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: TIMEOUT_MS,
          }
        );

        const suggestion = response.data?.choices?.[0]?.message?.content?.trim();
        if (!suggestion) throw new Error('No suggestion returned');

        return { suggestion };
      } catch (err) {
        const axiosErr = err as AxiosError<OpenAIErrorBody>;
        let errorMsg: string;

        if (
          axiosErr.code === 'ECONNABORTED' ||
          axiosErr.message?.includes('timeout')
        ) {
          errorMsg = 'timeout';
        } else if (axiosErr.response?.status === 401) {
          errorMsg = 'Invalid API key. Check REACT_APP_AI_API_KEY.';
        } else if (axiosErr.response?.status === 429) {
          const apiMessage = axiosErr.response?.data?.error?.message || '';
          if (/quota|billing|insufficient|exceeded your current/i.test(apiMessage)) {
            errorMsg = 'quota_exceeded';
          } else if (apiMessage) {
            errorMsg = apiMessage;
          } else {
            errorMsg = 'rate_limit';
          }
        } else if (axiosErr.response?.data?.error?.message) {
          errorMsg = axiosErr.response.data.error.message;
        } else {
          errorMsg = 'error';
        }

        setError((prev) => ({ ...prev, [fieldName]: errorMsg }));
        return { error: errorMsg };
      } finally {
        setLoading((prev) => ({ ...prev, [fieldName]: false }));
      }
    },
    []
  );

  return { generateSuggestion, loading, error };
};
