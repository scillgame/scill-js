import {AuthApi, EventsApi, ChallengesApi, BattlePassesApi, LeaderboardsApi, LeaderboardsV2Api} from "./api";
import {Configuration} from "./configuration";

export * from "./helper";

export type SCILLEnvironment = "development" | "staging" | "production";

function getBaseUrl(service: string, environment: SCILLEnvironment) {
    let envSuffix = "";
    if (environment === "staging") {
        envSuffix = "-staging";
    } else if (environment === "development") {
        envSuffix = "-dev";
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
        basePath: getBaseUrl("us", environment)
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
        basePath: getBaseUrl("ep", environment),
        apiKey: isApiKey(apiKeyOrAccessToken) ? "api_key" : "access_token"
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
        basePath: getBaseUrl("pcs", environment)
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
        basePath: getBaseUrl("es", environment)
    });
    return new BattlePassesApi(configuration);
}

/**
 * Get an instance of the LeaderboardsApi class, correctly setup for production environments. Use this handle leaderboards
 * @summary Get instance of LeaderboardsApi
 * @param {string} accessToken The access token created for the current user using the AuthApi (see generateAccessToken)
 * @returns {LeaderboardsApi}
 */
export function getLeaderboardsApi(accessToken: string, environment?: SCILLEnvironment) {
    const configuration = new Configuration({
        accessToken: accessToken,
        basePath: getBaseUrl("ls", environment)
    });
    return new LeaderboardsApi(configuration);
}

/**
 * Get an instance of the LeaderboardsV2Api class, correctly setup for production environments. Use this handle leaderboards
 * @summary Get instance of LeaderboardsV2Api
 * @param {string} accessToken The access token created for the current user using the AuthApi (see generateAccessToken)
 * @returns {LeaderboardsV2Api}
 */
 export function getLeaderboardsV2Api(accessToken: string, environment?: SCILLEnvironment) {
    const configuration = new Configuration({
        accessToken: accessToken,
        basePath: getBaseUrl("ls", environment)
    });
    return new LeaderboardsV2Api(configuration);
}
