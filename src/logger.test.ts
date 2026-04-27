import { describe, expect, it } from 'vitest';
import { createLogger } from './logger.js';

describe('createLogger', () => {
  it('emits at or above the configured level', () => {
    const lines: string[] = [];
    const log = createLogger('warn', (l) => lines.push(l));
    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e');
    expect(lines).toEqual(['[WARN] w', '[ERROR] e']);
  });

  it('stringifies mixed arg types', () => {
    const lines: string[] = [];
    const log = createLogger('debug', (l) => lines.push(l));
    log.info('hello', { a: 1 }, 42);
    expect(lines[0]).toBe('[INFO] hello {"a":1} 42');
  });

  it('respects level strict-ordering', () => {
    const lines: string[] = [];
    const log = createLogger('error', (l) => lines.push(l));
    log.warn('should drop');
    expect(lines).toEqual([]);
  });
});
