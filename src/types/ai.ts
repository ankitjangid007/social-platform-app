export interface AISuggestionSuccess {
  suggestion: string;
}

export interface AISuggestionError {
  error: string;
}

export type AISuggestionResult = AISuggestionSuccess | AISuggestionError;

export function isAISuggestionSuccess(
  result: AISuggestionResult
): result is AISuggestionSuccess {
  return 'suggestion' in result;
}
