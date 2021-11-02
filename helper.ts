import { BattlePassChallengeChangedPayload, Challenge, ChallengeWebhookPayload } from "./api";
import { ChallengeUpdateMonitor } from "./challenge-update-monitor";
import { SCILLEnvironment } from "./scillclient";
import { UserBattlePassUpdateMonitor } from "./user-battle-pass-update-monitor";
import {formatDuration} from "date-fns";
import {de, enUS} from 'date-fns/locale';
import {LeaderboardUpdateMonitor} from "./leaderboard-update-monitor";
import {LeaderboardUpdateMonitorV2} from "./leaderboard-update-monitor-V2";

function pad(num: number, size: number): string {
  let number = num.toString();
  while (number.length < size) number = "0" + num;
  return number;
}

export function timeLeft(challenge: Challenge, displayShortTimeleft: boolean = false, lang ='en') {
  if (challenge.type !== "in-progress") {
      return null;
  }
  
  const activateTill = new Date(challenge.user_challenge_activated_at);
  activateTill.setMinutes(activateTill.getMinutes() + challenge.challenge_duration_time);

  const diffMs = (activateTill.getTime() - new Date().getTime()); // milliseconds between now & the challenge ends
  const diffDys = Math.floor(diffMs / 1000 / 60 / 60 / 24),
        diffHrs = Math.floor((diffMs / 1000 / 60 / 60) % 24),
        diffMins = Math.floor((diffMs / 1000 / 60) % 60),
        diffSeconds = Math.floor((diffMs / 1000) % 60);
        
        const daysShortcut = lang === 'de' ? 'T' : 'd';
        const displayTime = displayShortTimeleft 
                            ? diffDys > 0 
                              ? `${diffDys}${daysShortcut} ${pad(diffHrs, 2)}:${pad(diffMins, 2)}:${pad(diffSeconds, 2)}`   // display with days included
                              : `${pad(diffHrs, 2)}:${pad(diffMins, 2)}:${pad(diffSeconds, 2)}`
                            : formatDuration({
                                days: diffDys,
                                hours: diffHrs,
                                minutes: diffMins,
                                seconds: diffSeconds}, {locale: lang === 'de' ? de : enUS });

                                return displayTime;
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

/**
 * Use this function to start listening on updates of a leaderboard. The function expects a callback function
 * handler that will be called whenever the leaderboards rankings change.
 *
 * @param accessToken You need to provide an access token that you previously generated with the EventsApi.
 * @param leaderboardId The id of the leaderboard that you want to listen for changes.
 * @param handler The callback function that is called whenever something changes in the backend for the leaderboard.
 * @param environment The optional SCILL enviromnent identifier.
 */
export function startMonitorLeaderboardUpdates(accessToken: string, leaderboardId: string, handler: (payload: BattlePassChallengeChangedPayload) => void, environment?: SCILLEnvironment) {
    return new LeaderboardUpdateMonitor(accessToken, leaderboardId, handler, environment);
}

export function startMonitorLeaderboardUpdatesV2(accessToken: string, leaderboardId: string, handler: (payload: BattlePassChallengeChangedPayload) => void, environment?: SCILLEnvironment) {
  return new LeaderboardUpdateMonitorV2(accessToken, leaderboardId, handler, environment);
}
