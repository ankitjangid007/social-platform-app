export function getAiApiKey(): string {
  return process.env.REACT_APP_AI_API_KEY?.trim() ?? '';
}

export function getAiApiUrl(): string {
  return (
    process.env.REACT_APP_AI_API_URL?.trim() ||
    'https://openrouter.ai/api/v1/chat/completions'
  );
}
