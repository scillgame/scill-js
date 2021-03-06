// This example implements a NodeJS backend receiving sessions from your client and asking SCILL
// to generate an access token for the userId "encoded" in/via the session.

const express = require('express');
const bodyParser = require('body-parser');
const scill = require('@scillgame/scill-js');
const path = require('path');
const clients = {
    production: {},
    staging: {},
    development: {}
};

const app = express();
const port = 80;

const apiKey = "ai728S-1aSdgb9GP#R]Po[P!1Z(HSSTpdULDMUAlYX";

const expressWs = require('express-ws')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('static'));

app.get('/scill/generate-access-token', (req, res) => {
    // In this example we use a session sent to this endpoint from the client to extract a user id from the session
    // How you implement that is up to you and depends on your user system
    const session = req.query.sessionid;
    const environment = req.query.environment;
    const userId = '1234';

    // Generate an instance of the SCILL Admin SDK with example API-Key
    const auth = scill.getAuthApi(apiKey, environment);

    // Call SCILL backend to generate an access token encoding user and API-Key
    return auth.generateAccessToken({
        user_id: userId
    }).then(accessToken => {
        // return access token
        return res.send(accessToken);
    }).catch(error => {
        console.log(error);
        return res.send(null);
    });
});

app.get('/scill/send-event/user-invite', (req, res) => {
    // In this example we use a session sent to this endpoint from the client to extract a user id from the session
    // How you implement that is up to you and depends on your user system
    const session = req.query.sessionid;
    const environment = req.query.environment;
    const userId = '1234';

    let eventsApi = scill.getEventsApi(apiKey, environment);
    eventsApi.sendEvent({
        event_name: "user-invite",
        event_type: "single",
        user_id: "1234",
        session_id: "1234",
        meta_data: {
            amount: 1
        }
    }).then(result => {
        console.log("Sending event user-invite: ", environment, result);
        return res.send(result);
    }).catch(error => {
        console.warn("Failed to send event", error);
        return res.send({
            error: error.error
        });
    });
});

app.get('/scill/send-event/deal-damage', (req, res) => {
    // In this example we use a session sent to this endpoint from the client to extract a user id from the session
    // How you implement that is up to you and depends on your user system
    const session = req.query.sessionid;
    const environment = req.query.environment;
    const userId = '1234';

    let eventsApi = scill.getEventsApi(apiKey, environment);
    eventsApi.sendEvent({
        event_name: "deal-damage",
        event_type: "single",
        user_id: "1234",
        session_id: "1234",
        meta_data: {
            damage_amount: 10,
            player_character: 'Phillip',
            required_time: 500
        }
    }).then(result => {
        console.log("Sending event deal-damage: ", environment, result);
        return res.send(result);
    }).catch(error => {
        console.warn("Failed to send event", error);
        return res.send({
            error: error.error
        });
    });
});

app.get('/scill/send-event/kill-enemy', (req, res) => {
    // In this example we use a session sent to this endpoint from the client to extract a user id from the session
    // How you implement that is up to you and depends on your user system
    const session = req.query.sessionid;
    const environment = req.query.environment;
    const userId = '1234';

    let eventsApi = scill.getEventsApi(apiKey, environment);
    eventsApi.sendEvent({
        event_name: "kill-enemy",
        event_type: "single",
        user_id: userId,
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
        console.log("Sending event kill-enemy: ", environment, result);
        return res.send(result);
    }).catch(error => {
        console.warn("Failed to send event", error);
        return res.send({
            error: error.error
        });
    });
});

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});
