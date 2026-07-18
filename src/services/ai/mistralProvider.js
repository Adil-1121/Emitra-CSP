// ── Mistral AI Provider ───────────────────────────────────────────────────────
// Direct Mistral SDK integration for development/testing.
//
// ⚠️  SECURITY NOTE:
// This runs in the browser and exposes the API key in network requests.
// This is acceptable for LOCAL DEVELOPMENT ONLY.
//
// PRODUCTION MIGRATION PATH:
// 1. Create a backend endpoint: POST /api/chat
// 2. Move this file to your backend (Node.js/Python/etc.)
// 3. Replace this file with BackendProvider (src/services/ai/backendProvider.js)
//    which calls your /api/chat endpoint instead
// 4. Change AI_CONFIG.provider = 'backend' — zero UI changes needed

import { Mistral } from '@mistralai/mistralai';
import { AIProvider, classifyError } from './aiProvider';
import { AI_CONFIG } from '../../config/ai';
import { SYSTEM_PROMPT } from './systemPrompt';

// ── Retry helper ──────────────────────────────────────────────────────────────
async function withRetry(fn, maxRetries, delayMs) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const { isRetryable } = classifyError(err);
      if (!isRetryable || attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
    }
  }
  throw lastError;
}

// ── Message history formatter ─────────────────────────────────────────────────
// Converts our internal message format to Mistral's expected format.
// Keeps only the last N messages to stay within token limits.
function buildMessageHistory(history, maxMessages) {
  const recent = history.slice(-maxMessages);
  return recent.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));
}

// ── Follow-up suggestion extractor ───────────────────────────────────────────
// Generates contextual follow-up chips based on the AI response content.
function extractFollowUps(responseText) {
  const text = responseText.toLowerCase();
  const suggestions = [];

  if (text.includes('aadhaar') || text.includes('aadhar')) {
    suggestions.push('What documents do I need for Aadhaar update?');
  }
  if (text.includes('pan')) {
    suggestions.push('How long does PAN card take?');
  }
  if (text.includes('bill') || text.includes('electricity')) {
    suggestions.push('What bills can I pay here?');
  }
  if (text.includes('certificate') || text.includes('birth') || text.includes('death')) {
    suggestions.push('What documents for birth certificate?');
  }
  if (text.includes('hour') || text.includes('timing') || text.includes('open')) {
    suggestions.push('Where are you located?');
  }
  if (text.includes('address') || text.includes('location') || text.includes('nokha')) {
    suggestions.push('What are your working hours?');
  }
  if (text.includes('money') || text.includes('transfer') || text.includes('aeps')) {
    suggestions.push('Is money transfer safe?');
  }
  if (text.includes('scheme') || text.includes('yojana')) {
    suggestions.push('What documents for government schemes?');
  }

  // Always offer a contact fallback
  if (suggestions.length < 2) {
    suggestions.push('How can I contact you?');
  }

  return suggestions.slice(0, 3);
}

// ── MistralProvider ───────────────────────────────────────────────────────────

export class MistralProvider extends AIProvider {
  constructor() {
    super();
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

    if (!apiKey || apiKey === 'your_mistral_api_key_here') {
      console.warn(
        '[MistralProvider] VITE_MISTRAL_API_KEY is not set. ' +
        'Add it to your .env file. Falling back to mock responses.'
      );
      this._configured = false;
    } else {
      this._client = new Mistral({ apiKey });
      this._configured = true;
    }

    this._config = AI_CONFIG.mistral;
    this._requestConfig = AI_CONFIG.request;
    this._convConfig = AI_CONFIG.conversation;
  }

  async getResponse(userMessage, history = []) {
    // Graceful fallback if API key is missing
    if (!this._configured) {
      return this._mockResponse(userMessage);
    }

    const historyMessages = buildMessageHistory(
      history,
      this._convConfig.maxHistoryMessages
    );

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...historyMessages,
      { role: 'user', content: userMessage },
    ];

    try {
      const result = await withRetry(
        () =>
          this._client.chat.complete({
            model: this._config.model,
            messages,
            temperature: this._config.temperature,
            maxTokens: this._config.maxTokens,
            topP: this._config.topP,
            safePrompt: this._config.safePrompt,
          }),
        this._requestConfig.maxRetries,
        this._requestConfig.retryDelayMs
      );

      const text = result?.choices?.[0]?.message?.content?.trim();

      if (!text) {
        throw new Error('Empty response from Mistral API');
      }

      return {
        text,
        followUps: extractFollowUps(text),
      };
    } catch (err) {
      const { text } = classifyError(err);
      // Re-throw with user-friendly message so useChat can display it
      const friendly = new Error(text);
      friendly.userFacing = true;
      throw friendly;
    }
  }

  // ── Mock fallback (when API key is missing) ─────────────────────────────
  _mockResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    let text = 'I\'m running in demo mode (no API key configured). ';

    if (lower.includes('service') || lower.includes('help')) {
      text += 'We offer Aadhaar, PAN, bill payments, money transfer, certificates, and more. Please add your VITE_MISTRAL_API_KEY to enable full AI responses.';
    } else if (lower.includes('hour') || lower.includes('time')) {
      text += 'We are open Monday–Saturday, 9 AM to 7 PM.';
    } else if (lower.includes('contact') || lower.includes('phone')) {
      text += 'You can reach us at +91 98765 43210.';
    } else {
      text += 'Please add VITE_MISTRAL_API_KEY to your .env file to enable full AI-powered responses.';
    }

    return Promise.resolve({
      text,
      followUps: ['What services do you offer?', 'What are your working hours?', 'How to contact you?'],
    });
  }
}
