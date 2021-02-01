import {ChallengeWebhookPayload} from "./api";
import {getAuthApi, SCILLEnvironment} from "./scillclient";

import * as mqtt from "mqtt";

export class ChallengeUpdateMonitor {
  challengeClient: mqtt.MqttClient;
  public accessToken: string;

  constructor(accessToken: string, handler: (payload: ChallengeWebhookPayload) => void, environment?: SCILLEnvironment) {
    this.accessToken = accessToken;

    const authApi = getAuthApi(accessToken, environment);
    authApi.getUserChallengesNotificationTopic().then(notificationTopic => {
      console.log("Received notification topic", notificationTopic);

      const challengesClient = mqtt.connect('wss://mqtt.scillgame.com:8083/mqtt');
      this.challengeClient = challengesClient;

      challengesClient.on('connect', function () {
        challengesClient.subscribe(notificationTopic.topic, function (err) {
          if (err) {
            console.warn("Subscribing to MQTT failed");
          }
        })
      })

      challengesClient.on('message', function (topic, message) {
        if (message && message.length > 0) {
          try {
            var payload = JSON.parse(message.toString("utf8"));
            if (payload) {
              handler(payload);
            }
          } catch (e) {
            console.warn("MQTT payload could not be parsed", topic, message.toString("utf8"));
          }
        }
      });
    });
  }

  public stop() {
    if (this.challengeClient) {
      this.challengeClient.end(true);
      this.challengeClient = null;
    }
  }
}
