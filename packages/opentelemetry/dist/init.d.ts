import { type ContextManager } from '@opentelemetry/api';
import { type PushMetricExporter } from '@opentelemetry/sdk-metrics';
import { type SpanExporter, type SpanProcessor } from '@opentelemetry/sdk-trace-base';
interface OpenTelemetryConfigEnabled {
    openTelemetryEnabled: boolean;
    openTelemetryExporter?: 'console' | 'honeycomb' | 'jaeger' | SpanExporter | null;
    openTelemetryMetricExporter?: 'console' | 'honeycomb' | PushMetricExporter | null;
    openTelemetryMetricExportIntervalMillis?: number;
    openTelemetrySamplerType: 'always-on' | 'always-off' | 'trace-id-ratio';
    openTelemetrySampleRate?: number;
    openTelemetrySpanProcessor?: 'batch' | 'simple' | SpanProcessor;
    contextManager?: ContextManager;
    honeycombApiKey?: string | null;
    honeycombDataset?: string | null;
    serviceName?: string;
}
interface OpenTelemetryConfigDisabled extends Partial<OpenTelemetryConfigEnabled> {
    openTelemetryEnabled: false;
}
export type OpenTelemetryConfig = OpenTelemetryConfigEnabled | OpenTelemetryConfigDisabled;
/**
 * Should be called once we've loaded our config; this will allow us to set up
 * the correct metadata for the Honeycomb exporter. We don't actually have that
 * information available until we've loaded our config.
 */
export declare function init(config: OpenTelemetryConfig): Promise<void>;
/**
 * Gracefully shuts down the OpenTelemetry instrumentation. Should be called
 * when a `SIGTERM` signal is handled.
 */
export declare function shutdown(): Promise<void>;
/**
 * Disables all OpenTelemetry instrumentations. This is useful for tests that
 * need to access the unwrapped modules.
 */
export declare function disableInstrumentations(): void;
export {};
