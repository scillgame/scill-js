import * as mqtt from "mqtt";
import {BattlePassChallengeChangedPayload, ChallengeWebhookPayload} from "./api";
import {getAuthApi, SCILLEnvironment} from "./scillclient";

export class UserBattlePassUpdateMonitor {
  mqttClient: mqtt.MqttClient;

  public battlePassId: string;
  public accessToken: string;

  constructor(accessToken: string, battlePassId: string, handler: (payload: BattlePassChallengeChangedPayload) => void, environment?: SCILLEnvironment) {
    this.battlePassId = battlePassId;
    this.accessToken = accessToken;

    const authApi = getAuthApi(accessToken, environment);
    authApi.getUserBattlePassNotificationTopic(battlePassId).then(notificationTopic => {
      console.log("Received notification topic", notificationTopic);

      const client = mqtt.connect('wss://mqtt.scillgame.com/mqtt');
      this.mqttClient = client;

      client.on('connect', function () {
        client.subscribe(notificationTopic.topic, function (err) {
          if (err) {
            console.warn("Subscribing to MQTT failed");
          }
        })
      })

      client.on('message', function (topic, message) {
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
