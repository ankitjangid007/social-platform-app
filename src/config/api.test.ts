import { getAiApiKey, getAiApiUrl } from './api';

describe('api config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('getAiApiKey returns trimmed env value', () => {
    process.env.REACT_APP_AI_API_KEY = '  test-key  ';
    expect(getAiApiKey()).toBe('test-key');
  });

  it('getAiApiKey returns empty string when unset', () => {
    delete process.env.REACT_APP_AI_API_KEY;
    expect(getAiApiKey()).toBe('');
  });

  it('getAiApiUrl uses default OpenRouter URL when unset', () => {
    delete process.env.REACT_APP_AI_API_URL;
    expect(getAiApiUrl()).toBe('https://openrouter.ai/api/v1/chat/completions');
  });

  it('getAiApiUrl respects custom env override', () => {
    process.env.REACT_APP_AI_API_URL = 'https://api.example.com/v1/chat';
    expect(getAiApiUrl()).toBe('https://api.example.com/v1/chat');
  });
});
