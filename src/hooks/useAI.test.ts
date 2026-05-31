import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useAI } from './useAI';
import { EMPTY_FORM_DATA } from '../types/form';
import { AISuggestionResult } from '../types/ai';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useAI', () => {
  const originalKey = process.env.REACT_APP_AI_API_KEY;

  beforeEach(() => {
    process.env.REACT_APP_AI_API_KEY = 'test-api-key';
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env.REACT_APP_AI_API_KEY = originalKey;
  });

  it('returns not_configured when API key is missing', async () => {
    delete process.env.REACT_APP_AI_API_KEY;
    const { result } = renderHook(() => useAI());

    let response!: AISuggestionResult;
    await act(async () => {
      response = await result.current.generateSuggestion(
        'financialSituation',
        EMPTY_FORM_DATA,
        'en',
      );
    });

    expect(response).toEqual({ error: 'not_configured' });
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('returns suggestion on successful API response', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        choices: [{ message: { content: '  Suggested text.  ' } }],
      },
    });

    const { result } = renderHook(() => useAI());

    let response!: AISuggestionResult;
    await act(async () => {
      response = await result.current.generateSuggestion(
        'financialSituation',
        EMPTY_FORM_DATA,
        'en',
      );
    });

    expect(response).toEqual({ suggestion: 'Suggested text.' });
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('maps 401 to invalid key message', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { status: 401 },
      isAxiosError: true,
    });

    const { result } = renderHook(() => useAI());

    let response!: AISuggestionResult;
    await act(async () => {
      response = await result.current.generateSuggestion(
        'reasonForApplying',
        EMPTY_FORM_DATA,
        'en',
      );
    });

    expect('error' in response && response.error).toMatch(/Invalid API key/);
  });

  it('maps timeout to timeout code', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      code: 'ECONNABORTED',
      message: 'timeout of 30000ms exceeded',
    });

    const { result } = renderHook(() => useAI());

    let response!: AISuggestionResult;
    await act(async () => {
      response = await result.current.generateSuggestion(
        'employmentCircumstances',
        EMPTY_FORM_DATA,
        'en',
      );
    });

    expect(response).toEqual({ error: 'timeout' });
  });
});
