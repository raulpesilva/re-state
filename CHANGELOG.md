# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.2.32] - 2022-09-07

### Fix
- error when create a state with createReStateMethods with initial value undefined or null

## [1.2.31] - 2022-09-03

### added
- add createReStateMethods
- add createReStateMethods tests

## [1.2.30] - 2022-06-12

### Added

- add setReStateInitialValue
- add resetReState

## [1.2.29] - 2022-06-10

### Added

- add onReStateChange
- add test to onReStateChange

## [1.2.28] - 2022-02-19

### Added

- add rollup build and separate core and react features
- minimize bundle size (depending on features imported)
- add more support to different bundlers and remove warning type on js

### Breaking changes

- move import useReState to named exports (import useReState... -> import { useReState }...)

## [1.1.16] - 2021-06-23

### Breaking changes

- new createReStateSelect is CreateGetReState (is the same old interface)

### Added

- add change log
- add createGetReState (like old createReStateSelect)
- add advanced example
- export all types

### Fixed

- fix createReState select to return a hook
- useReStateSelector is equal params

### Changed

- convert createReStateSelect to observe one state in the store
- Update Readme
- Update types in documentation - useReStateSelector

## [1.1.14] - 2021-05-19

### Added

- add reStateSelect
- example
- docs
- advanced example
- demo basic usage
