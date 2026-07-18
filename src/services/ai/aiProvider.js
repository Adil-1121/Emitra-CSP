// ── AI Provider Interface ─────────────────────────────────────────────────────
// Every AI provider (Mistral, OpenAI, Gemini, Claude, Groq, Backend API)
// must implement this interface.
//
// To add a new provider:
//   1. Create a new file: src/services/ai/yourProvider.js
//   2. Export a class that extends AIProvider
//   3. Implement the getResponse() method
//   4. Register it in providerFactory.js
//   5. Set AI_CONFIG.provider = 'yourProvider' in src/config/ai.js
//
// The chatbot UI, hooks, and state management never need to change.

export class AIProvider {
  /**
   * Send a message and get a response.
   *
   * @param {string} userMessage - The current user message
   * @param {Array<{sender: 'user'|'bot', text: string}>} history - Previous messages
   * @returns {Promise<{text: string, followUps: string[]}>}
   */
  // eslint-disable-next-line no-unused-vars
  async getResponse(userMessage, history) {
    throw new Error(`${this.constructor.name} must implement getResponse()`);
  }
}

// ── Shared error classifier ───────────────────────────────────────────────────
// Used by all providers to return consistent user-facing error messages.

export function classifyError(error) {
  const msg = error?.message?.toLowerCase() ?? '';
  const status = error?.status ?? error?.statusCode ?? 0;

  if (status === 401 || msg.includes('unauthorized') || msg.includes('api key') || msg.includes('invalid key')) {
    return {
      text: '⚠️ AI service configuration issue. Please contact us directly at +91 98765 43210 or visit our center.',
      isRetryable: false,
    };
  }

  if (status === 429 || msg.includes('rate limit') || msg.includes('too many requests')) {
    return {
      text: '⏳ Our AI assistant is busy right now. Please try again in a moment, or call us at +91 98765 43210.',
      isRetryable: true,
    };
  }

  if (status === 503 || msg.includes('service unavailable') || msg.includes('overloaded')) {
    return {
      text: '🔄 AI service is temporarily unavailable. Please try again shortly or contact us directly.',
      isRetryable: true,
    };
  }

  if (msg.includes('timeout') || msg.includes('network') || msg.includes('fetch')) {
    return {
      text: '📡 Network issue detected. Please check your connection and try again.',
      isRetryable: true,
    };
  }

  return {
    text: '❌ Something went wrong. Please try again or reach us at +91 98765 43210.',
    isRetryable: true,
  };
}
