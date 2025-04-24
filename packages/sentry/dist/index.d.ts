import * as Sentry from '@sentry/node';
/**
 * A thin wrapper around {@link Sentry.init} that automatically sets `release`
 * based on the current Git revision.
 */
export declare function init(options: Sentry.NodeOptions): Promise<void>;
/**
 * Sentry v8 switched from simple, manual instrumentation to "automatic"
 * instrumentation based on OpenTelemetry. However, this interferes with
 * the way that our applications asynchronously load their configuration,
 * specifically the Sentry DSN. Sentry's automatic request isolation and
 * request data extraction requires that `Sentry.init` be called before
 * any other code is loaded, but our application startup structure is such
 * that we import most of our own code before we can load the Sentry DSN.
 *
 * Rather than jumping through hoops to restructure our application to
 * support this, this small function can be added as Express middleware to
 * isolate requests and set request data for Sentry.
 */
export declare function requestHandler(): (req: any, _res: any, next: any) => void;
export type { Breadcrumb, BreadcrumbHint, Event, EventHint, Exception, NodeOptions, PolymorphicRequest, SdkInfo, Session, SeverityLevel, Span, StackFrame, Stacktrace, Thread, User, } from '@sentry/node';
export { addBreadcrumb, addEventProcessor, captureEvent, captureException, captureMessage, close, createTransport, defaultStackParser, expressErrorHandler, expressIntegration, flush, getCurrentScope, getSentryRelease, makeNodeTransport, NodeClient, Scope, SDK_VERSION, SentryContextManager, setContext, setExtra, setExtras, setTag, setTags, setupExpressErrorHandler, setUser, startInactiveSpan, startSpan, startSpanManual, withIsolationScope, withScope, } from '@sentry/node';
