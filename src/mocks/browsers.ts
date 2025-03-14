import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startWorker = async () => {
  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    console.error('[MSW] Failed to start Mock Service Worker:', error);
  }
};