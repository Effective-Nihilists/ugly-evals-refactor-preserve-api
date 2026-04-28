export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function _shouldEmit(requested: LogLevel, configured: LogLevel): boolean {
  return LEVEL_ORDER[requested] >= LEVEL_ORDER[configured];
}

function _formatLine(level: LogLevel, message: string): string {
  return `[${level.toUpperCase()}] ${message}`;
}

function _stringifyArg(arg: unknown): string {
  if (typeof arg === 'string') return arg;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

function _combineMessage(parts: unknown[]): string {
  return parts.map(_stringifyArg).join(' ');
}

export interface Logger {
  debug(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

export function createLogger(
  level: LogLevel,
  sink: (line: string) => void,
): Logger {
  function emit(requested: LogLevel, args: unknown[]): void {
    if (!_shouldEmit(requested, level)) return;
    sink(_formatLine(requested, _combineMessage(args)));
  }
  return {
    debug: (...args) => emit('debug', args),
    info: (...args) => emit('info', args),
    warn: (...args) => emit('warn', args),
    error: (...args) => emit('error', args),
  };
}
