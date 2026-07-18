// ── Centralized AI Configuration ─────────────────────────────────────────────
// Edit this file to change model, temperature, or provider settings.
// Never put actual API keys here — use .env variables.

export const AI_CONFIG = {
  // ── Active provider ──────────────────────────────────────────────────────
  // Switch between 'mistral' | 'openai' | 'gemini' | 'mock' without
  // touching any other file.
  provider: 'mistral',

  // ── Mistral settings ─────────────────────────────────────────────────────
  mistral: {
    model: 'mistral-small-latest',   // mistral-small-latest | mistral-medium-latest | mistral-large-latest
    temperature: 0.7,
    maxTokens: 600,
    topP: 1,
    safePrompt: false,
  },

  // ── Request settings ─────────────────────────────────────────────────────
  request: {
    timeoutMs: 30000,
    maxRetries: 2,
    retryDelayMs: 1000,
  },

  // ── Conversation settings ─────────────────────────────────────────────────
  conversation: {
    // How many past messages to send as context (user+bot pairs)
    maxHistoryMessages: 10,
  },
};
