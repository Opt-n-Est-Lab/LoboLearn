import fetch, {} from 'node-fetch';
import * as error from '@prairielearn/error';
import { logger } from '@prairielearn/logger';
import { config } from './config.js';
export function canSendMessages() {
    return !!config.secretSlackOpsBotEndpoint;
}
export async function sendMessage(msg) {
    // No-op if there's no url specified
    if (!config.secretSlackOpsBotEndpoint) {
        return null;
    }
    const response = await fetch(config.secretSlackOpsBotEndpoint, {
        method: 'POST',
        body: JSON.stringify({ text: msg }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new error.AugmentedError('Error sending message', {
            data: {
                responseCode: response.status,
                responseText: await response.text(),
            },
        });
    }
    return response;
}
/**
 * General interface to send a message from PrairieLearn to Slack.
 * @param msg String message to send.
 * @param channel Channel to send to.  Private channels must have the bot added.
 */
export async function sendSlackMessage(msg, channel) {
    const token = config.secretSlackToken;
    // Log the message if there's no token specified
    if (!token || !channel) {
        logger.info(`Slack message:\n${msg}`);
        return null;
    }
    const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
            text: msg,
            channel,
            as_user: true,
        }),
    });
    if (!response.ok) {
        throw new error.AugmentedError(`Error sending message to ${channel}`, {
            data: {
                responseCode: response.status,
                responseText: await response.text(),
            },
        });
    }
    return response;
}
/**
 * Send a message to the secret course requests channel on Slack.
 * @param msg String message to send.
 */
export async function sendCourseRequestMessage(msg) {
    return sendSlackMessage(msg, config.secretSlackCourseRequestChannel);
}
//# sourceMappingURL=opsbot.js.map