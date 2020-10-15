const scill = require('@scillgame/scill-js');
let eventsApi = scill.getEventsApi("ai728S-1aSdgb9GP#R]Po[P!1Z(HSSTpdULDMUAlYX", 'development');
eventsApi.sendEvent({
    event_name: "kill-enemy",
    event_type: "single",
    user_id: "1234",
    session_id: "1234",
    meta_data: {
        amount: 1,
        enemy_type: "Cloud",
        kill_type: "Headshot",
        map_name: "Level 1",
        player_character: "Human",
        weapon_used: "Knife",
        realm: "Europe"
    }
}).then(result => {
    console.log("Sending event: ", result);
}).catch(error => {
    console.warn("Failed to send event", error);
});
