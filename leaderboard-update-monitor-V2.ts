import {LeaderboardV2UpdatePayload} from "./api";
import {getAuthApi, SCILLEnvironment} from "./scillclient";

import * as mqtt from "mqtt";

export class LeaderboardUpdateMonitorV2 {
  mqttClient: mqtt.MqttClient;
  public accessToken: string;

  constructor(accessToken: string, leaderboardId: string, handler: (payload: LeaderboardV2UpdatePayload) => void, environment?: SCILLEnvironment) {
    this.accessToken = accessToken;

    const authApi = getAuthApi(accessToken, environment);
    authApi.getLeaderboardNotificationTopic(leaderboardId).then(notificationTopic => {
      const mqttClient = mqtt.connect('wss://mqtt.scillgame.com/mqtt');
      this.mqttClient = mqttClient;

      mqttClient.on('connect', function () {
        mqttClient.subscribe(notificationTopic.topic, function (err) {
          if (err) {
            console.warn("Subscribing to MQTT failed");
          }
        })
      })

      mqttClient.on('message', function (topic, message) {
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
    if (this.mqttClient) {
      this.mqttClient.end(true);
      this.mqttClient = null;
    }
  }
}
