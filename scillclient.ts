import {
    AuthApi,
    EventsApi,
    ChallengesApi,
    BattlePassesApi,
    Challenge,
    ChallengeWebhookPayload,
    BattlePassChallengeChangedPayload
} from "./api";
import {Configuration} from "./configuration";
import * as mqtt from "mqtt";
import {MqttClient} from "mqtt/types/lib/client";
import {ChallengeUpdateMonitor} from "./challenge-update-monitor";
import {UserBattlePassUpdateMonitor} from "./user-battle-pass-update-monitor";

export type SCILLEnvironment = 'development' | 'staging' | 'production';

function getBaseUrl(service: string, environment: SCILLEnvironment) {
    let envSuffix = '';
    if (environment === 'staging') {
        envSuffix = '-staging';
    } else if (environment === 'development') {
        envSuffix = '-dev';
    }

    return `https://${service}${envSuffix}.scillgame.com`;
}

function isApiKey(apiKeyOrAccessToken: string) {
    // API Keys have a length of 42 bytes.
    if (apiKeyOrAccessToken.length > 64) {
        // This is an access token
        return false;
    }

    // This is an API key
    return true;
}

/**
 * Get an instance of the AuthApi class, correctly setup for production environments. Use this class instance to
 * generate access tokens.
 * @summary Get instance of AuthApi
 * @param {string} apiKey The API-Key for your app. You can find your API-Key in the Admin Panel or by using the ApiKeyApi
 * @returns {AuthApi}
 */
export function getAuthApi(apiKeyOrAccessToken: string, environment?: SCILLEnvironment) {
    const configuration = new Configuration({
        accessToken: apiKeyOrAccessToken,
        basePath: getBaseUrl('us', environment)
    });
    return new AuthApi(configuration);
}

/**
 * Get an instance of the EventsApi class, correctly setup for production environments. Use this class to send events
 * @summary Get instance of EventsApi
 * @param {string} apiKeyOrAccessToken The API-Key for your app or an access token. You can find your API-Key in the Admin Panel or by using the ApiKeyApi
 * @returns {EventsApi}
 */
export function getEventsApi(apiKeyOrAccessToken: string, environment?: SCILLEnvironment) {
    const configuration = new Configuration({
        accessToken: apiKeyOrAccessToken,
        basePath: getBaseUrl('ep', environment),
        apiKey: isApiKey(apiKeyOrAccessToken) ? 'api_key' : 'access_token'
    });
    return new EventsApi(configuration);
}

/**
 * Get an instance of the ChallengesApi class, correctly setup for production environments. Use this handle challenges
 * @summary Get instance of ChallengesApi
 * @param {string} accessToken The access token created for the current user using the AuthApi (see generateAccessToken)
 * @returns {ChallengesApi}
 */
export function getChallengesApi(accessToken: string, environment?: SCILLEnvironment) {
    const configuration = new Configuration({
        accessToken: accessToken,
        basePath: getBaseUrl('pcs', environment)
    });
    return new ChallengesApi(configuration);
}

/**
 * Get an instance of the BattlePassesApi class, correctly setup for production environments. Use this handle battle passes
 * @summary Get instance of BattlePassesApi
 * @param {string} accessToken The access token created for the current user using the AuthApi (see generateAccessToken)
 * @returns {BattlePassesApi}
 */
export function getBattlePassApi(accessToken: string, environment?: SCILLEnvironment) {
    const configuration = new Configuration({
        accessToken: accessToken,
        basePath: getBaseUrl('es', environment)
    });
    return new BattlePassesApi(configuration);
}

function pad(num: number, size: number): string {
    let number = num.toString();
    while (number.length < size) number = "0" + num;
    return number;
}

export function timeLeft(challenge: Challenge) {
    if (challenge.type !== 'in-progress') {
        return null;
    }

    let activateTill = new Date(challenge.user_challenge_activated_at);
    activateTill.setMinutes(activateTill.getMinutes() + challenge.challenge_duration_time);

    var diffMs = (activateTill.getTime() - new Date().getTime()); // milliseconds between now & the challenge ends
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var diffSeconds = Math.round((((diffMs % 86400000) % 3600000) / 1000) % 60); // seconds

    return `${pad(diffHrs, 2)}:${pad(diffMins, 2)}:${pad(diffSeconds,2)}`
}

export function startMonitorChallengeUpdates(accessToken: string, handler: (payload: ChallengeWebhookPayload) => void, environment?: SCILLEnvironment) {
    return new ChallengeUpdateMonitor(accessToken, handler, environment);
}

export function startMonitorBattlePassUpdates(accessToken: string, battlePassId: string, handler: (payload: BattlePassChallengeChangedPayload) => void, environment?: SCILLEnvironment) {
    return new UserBattlePassUpdateMonitor(accessToken, battlePassId, handler, environment);
}
