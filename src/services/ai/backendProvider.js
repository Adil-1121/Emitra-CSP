// ── Backend Provider (Production Migration Target) ────────────────────────────
// Use this provider when you move AI calls to your own backend.
//
// MIGRATION STEPS:
// 1. Create a backend endpoint: POST /api/chat
//    Request body:  { message: string, history: Message[] }
//    Response body: { text: string, followUps: string[] }
//
// 2. Set in .env:
//    VITE_AI_BACKEND_URL=https://your-backend.com/api/chat
//
// 3. In src/config/ai.js, change:
//    provider: 'backend'
//
// 4. In src/services/ai/providerFactory.js, add:
//    import { BackendProvider } from './backendProvider';
//    'backend': () => new BackendProvider(),
//
// That's it. Zero changes to UI, hooks, or state management.

import { AIProvider, classifyError } from './aiProvider';
import { AI_CONFIG } from '../../config/ai';

export class BackendProvider extends AIProvider {
  constructor() {
    super();
    this._url = import.meta.env.VITE_AI_BACKEND_URL || '/api/chat';
    this._timeout = AI_CONFIG.request.timeoutMs;
  }

  async getResponse(userMessage, history = []) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this._timeout);

    try {
      const res = await fetch(this._url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }

      const data = await res.json();
      return { text: data.text, followUps: data.followUps ?? [] };
    } catch (err) {
      const { text } = classifyError(err);
      const friendly = new Error(text);
      friendly.userFacing = true;
      throw friendly;
    } finally {
      clearTimeout(timer);
    }
  }
}
