// ── AI Provider Factory ───────────────────────────────────────────────────────
// Maps provider names to their implementations.
// To add a new provider: import it here and add to the PROVIDERS map.
//
// Usage:
//   import { getAIProvider } from './providerFactory';
//   const provider = getAIProvider(); // returns the configured provider instance

import { AI_CONFIG } from '../../config/ai';
import { MistralProvider } from './mistralProvider';

// ── Provider registry ─────────────────────────────────────────────────────────
// Add future providers here:
//   'openai'   : OpenAIProvider   (src/services/ai/openaiProvider.js)
//   'gemini'   : GeminiProvider   (src/services/ai/geminiProvider.js)
//   'claude'   : ClaudeProvider   (src/services/ai/claudeProvider.js)
//   'groq'     : GroqProvider     (src/services/ai/groqProvider.js)
//   'backend'  : BackendProvider  (src/services/ai/backendProvider.js) ← production
const PROVIDERS = {
  mistral: () => new MistralProvider(),
};

// Singleton — one instance per session
let _instance = null;

export function getAIProvider() {
  if (_instance) return _instance;

  const providerName = AI_CONFIG.provider;
  const factory = PROVIDERS[providerName];

  if (!factory) {
    console.error(
      `[AIProviderFactory] Unknown provider: "${providerName}". ` +
      `Available: ${Object.keys(PROVIDERS).join(', ')}. Falling back to mistral.`
    );
    _instance = new MistralProvider();
  } else {
    _instance = factory();
  }

  return _instance;
}

// Reset singleton — useful for testing or hot-reloading
export function resetAIProvider() {
  _instance = null;
}
