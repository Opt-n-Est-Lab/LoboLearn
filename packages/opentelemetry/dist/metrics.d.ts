import { type Counter, type Histogram, type Meter, type MetricOptions, type ObservableCounter, type ObservableGauge, type ObservableUpDownCounter, type UpDownCounter } from '@opentelemetry/api';
export declare function getHistogram(meter: Meter, name: string, options?: MetricOptions): Histogram;
export declare function getCounter(meter: Meter, name: string, options?: MetricOptions): Counter<import("@opentelemetry/api").Attributes>;
export declare function getUpDownCounter(meter: Meter, name: string, options?: MetricOptions): UpDownCounter<import("@opentelemetry/api").Attributes>;
export declare function getObservableCounter(meter: Meter, name: string, options?: MetricOptions): ObservableCounter<import("@opentelemetry/api").Attributes>;
export declare function getObservableUpDownCounter(meter: Meter, name: string, options?: MetricOptions): ObservableUpDownCounter<import("@opentelemetry/api").Attributes>;
export declare function getObservableGauge(meter: Meter, name: string, options?: MetricOptions): ObservableGauge<import("@opentelemetry/api").Attributes>;
export declare function instrumentedWithMetrics<T>(meter: Meter, name: string, fn: () => Promise<T> | T, done?: (duration: number) => void): Promise<T>;
export interface CreateObservableValueGaugesOptions extends MetricOptions {
    interval: number;
}
/**
 * Creates a set of gauges that track the min, max, and average of a value over
 * time. The value is observed on a regular interval.
 *
 * The provided {@link name} is used as the base name for the three gauges. The
 * names of the individual gauges are:
 *
 * - `${name}.min`
 * - `${name}.max`
 * - `${name}.avg`
 */
export declare function createObservableValueGauges(meter: Meter, name: string, options: CreateObservableValueGaugesOptions, observe: () => number): {
    minGauge: ObservableGauge<import("@opentelemetry/api").Attributes>;
    maxGauge: ObservableGauge<import("@opentelemetry/api").Attributes>;
    averageGauge: ObservableGauge<import("@opentelemetry/api").Attributes>;
    stop: () => void;
};
