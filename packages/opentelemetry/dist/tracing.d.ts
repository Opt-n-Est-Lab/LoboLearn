import { type Span } from '@opentelemetry/api';
export declare function instrumented<T>(name: string, fn: (span: Span) => Promise<T> | T): Promise<T>;
