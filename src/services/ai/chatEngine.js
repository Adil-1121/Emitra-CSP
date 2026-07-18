// ── Chat Engine — AI Provider Bridge ─────────────────────────────────────────
// This is the ONLY file that connects the chatbot UI to the AI backend.
// useChat.js calls getResponse() — that contract never changes.
//
// To switch AI providers: edit src/config/ai.js → AI_CONFIG.provider
// To add a new provider:  edit src/services/ai/providerFactory.js

import { getAIProvider } from './providerFactory';

/**
 * Get an AI response for the user's message.
 *
 * @param {string} userMessage
 * @param {Array<{sender: 'user'|'bot', text: string, timestamp: string}>} history
 * @returns {Promise<{text: string, followUps: string[]}>}
 */
export async function getResponse(userMessage, history = []) {
  const provider = getAIProvider();
  return provider.getResponse(userMessage, history);
}
