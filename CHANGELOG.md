# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
