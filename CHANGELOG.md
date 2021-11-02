# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.10.0] - 2021-11-02
### Added
- Added a method resetLeaderboardRankings to Leaderboards v1 to reset leaderboard data for specific users
- Added Leaderboards V2 - with methods getLeaderboardV2, getLeaderboardsV2, getLeaderboardV2Rankings, getLeaderboardV2Ranking, resetLeaderboardV2Rankings, and accompanying scheme. The responses have changed, as well as the mechanics under the hood of how leaderboards operate
- Added leaderboard v2 update monitor 
- Added leaderboard v2 API fetcher to the client

## [1.8.0] - 2021-03-29
### Added
- Class `LeaderboardUpdateMonitor` has been updated. Use to get notified one the leaderboard changes.
- `startMonitorLeaderboardUpdates` has been added to start listening on leaderboard updates
- Added models for leaderboard updates

## [1.7.1] - 2021-03-18
### Fixed
- One minor thing with brower deploment has been fixed

## [1.7.0] - 2021-03-18
This release primary focus has been on adding leaderboards. We added ready-to-use leaderboard prefabs. More Info on the leaderboards can be found in our [developer documentation](https://developers.scillgame.com/products/product-leaderboards.html)

### Added
- Added `setUserInfo` and `setUserInfo` to `AuthApi` to set usernames and avatars
- Added Leaderboards (Classes, Models, ...)

## [1.6.0] - 2021-03-02
### Added
- `challenge_xp` added to `BattlePassLevelChallenge` object.

## [1.5.0] - 2021-03-01
### Added
- `user_token` added to `ChallengeWebhookPayload` object.
- `challenge_auto_activated` added to `Challenge` object. Indicates if a challenge is automatically handled by the SCILL backend.  
- `challenge_description` added to `Challenge` object.

## [1.4.0] - 2021-02-03
### Changed
- `displayShortTimeleft` paramater(optional) added to the `timeLeft` function as boolean. 
- Default is `false` and display time remaining as `Time remaining: 1hour, 39 minutes, 16 seconds`, if `true` time remaining is displayed as `Time remaining: 1d 01:39:16` format.

## [1.3.0] - 2021-02-02
### Added
- Added `getUnresolvedPersonalChallenges` function to the `ChallengesApi` which is a duplicate of getPersonalChallenges right now.
- Added `getAllPersonalChallenges` function to the `ChallengesApi` which also returns finished challenges.

## [1.2.6] - 2021-02-02
### Fixed
- Fixed calculation of minutes in `timeLeft` helper function.

## [1.2.5] - 2021-02-01
### Added
- Added number of days to `timeLeft` helper function.

## [1.2.4] - 2021-01-23
### Added
- Added pre-built browser bundle to published package.

## [1.2.3] - 2021-01-23
### Changed
- Use `prepare` instead of `postinstall` for improved npm compatibility.

## [1.2.2] - 2021-01-22
### Fixed
- Resolved circular dependency related to monitoring of Challenges and Battle Passes.

### Changed
- Improved compatibility with Angular, Vue.js and React apps.

## [1.2.1] - 2020-12-08
### Added
- Added `challenge_goal_condition` to the `BattlePassLevel` object.
- Added `level_reward_type` to the `BattlePassLevel` object.

### Deprecated
- `challenge_reward_type` should not be used anymore as it has been replaced by `level_reward_type` in `BattlePassLevel`

## [1.2.0] - 2020-12-07
### Added
- Added `challenge_goal_condition` to the `Challenge` object.
- Added `challenge_reward_type` to the `Challenge` object.
- Added `image_xs`, `image_s`, `image_m`, `image_l` and `image_xl` to `BattlePass` object.

### Changed
- Changed type of `challenge_reward` in the `Challenge` object from integer to string

## [1.1.0] - 2020-12-04
### Added
- Added Realtime Notification System for Challenges and Battle Passes.

### Changed
- Reworked Battle Pass System.
