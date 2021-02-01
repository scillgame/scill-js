import { BattlePassChallengeChangedPayload, Challenge, ChallengeWebhookPayload } from "./api";
import { ChallengeUpdateMonitor } from "./challenge-update-monitor";
import { SCILLEnvironment } from "./scillclient";
import { UserBattlePassUpdateMonitor } from "./user-battle-pass-update-monitor";

function pad(num: number, size: number): string {
  let number = num.toString();
  while (number.length < size) number = "0" + num;
  return number;
}

export function timeLeft(challenge: Challenge) {
  if (challenge.type !== "in-progress") {
      return null;
  }

  const activateTill = new Date(challenge.user_challenge_activated_at);
  activateTill.setMinutes(activateTill.getMinutes() + challenge.challenge_duration_time);

  const diffMs = (activateTill.getTime() - new Date().getTime()); // milliseconds between now & the challenge ends
  const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24); // days
  const diffHours = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const diffSeconds = Math.round((((diffMs % 86400000) % 3600000) / 1000) % 60); // seconds

  if (diffDays > 0) {
    return `${diffDays}D ${pad(diffHours, 2)}:${pad(diffMins, 2)}:${pad(diffSeconds, 2)}`
  }
  
  return `${pad(diffHours, 2)}:${pad(diffMins, 2)}:${pad(diffSeconds, 2)}`;
}

/**
 * Use this function to start listening on updates on challenges for the user identified with the access 
 * token. The function expects a callback function handler that will be called whenever something happens 
 * on the users challenges.
 * 
 * @param accessToken You need to provide an access token that you previously generated with the EventsApi.
 * @param handler The callback function that is called whener something changes in the backend for a user challenge.
 * @param environment The optional SCILL enviromnent identifier.
 */
export function startMonitorChallengeUpdates(accessToken: string, handler: (payload: ChallengeWebhookPayload) => void, environment?: SCILLEnvironment) {
  return new ChallengeUpdateMonitor(accessToken, handler, environment);
}

/**
 * Use this function to start listening on updates of battle pass challenges for the user identified with the 
 * access token. The function expects a callback function handler that will be called whenever something happens 
 * on the users challenges.
 * 
 * @param accessToken You need to provide an access token that you previously generated with the EventsApi.
 * @param battlePassId The id of the battle pass that you want to listen for changes.
 * @param handler The callback function that is called whenever something changes in the backend for a users battle pass.
 * @param environment The optional SCILL enviromnent identifier.
 */
export function startMonitorBattlePassUpdates(accessToken: string, battlePassId: string, handler: (payload: BattlePassChallengeChangedPayload) => void, environment?: SCILLEnvironment) {
  return new UserBattlePassUpdateMonitor(accessToken, battlePassId, handler, environment);
}
