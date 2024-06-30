# Mancala-Gameplay

Library for two-row Mancala Game play.

# Types

**MancalaGameState**

- pockets - a 12 item array of all the pocket values
- stores - a two item
- activePlayer - 0 or 1 - (player 1 is "0")
- turns: - an array of the turns as they were taken
- lastTurnSteps: - an array that shows how the array mutated over the course of the previous turn
- resolution?: - an object that outlines the winner of the game

**MancalaTurn**

- player - player who took the turn
- pocketIndex - pocket that the player selected
- explanation - human-readable explanation of how the

**MancalaResolution**

- winner: player who won
- scores: value of the stores at the end of the game

# Mancala Game Play

- Game play is counter-clockwise, changes to the array will be applied in reverse. That's the way i chose to do it :shrug:
- Turn explainations are there to help explain what happened during the turn for new players.
- A player attempting to make an illegal move will result in en error - use `playerCanMakeMove` before calling applyTurnGameState

# Functions

**newMancalaGameState(): MancalaGameState** - genrate a new game, ready for use

**applyTurnGameState( incomingGameState: MancalaGameState, pocketIdx: number): MancalaGameState** - returns a new instance of MancalaGameState, with the specified turn applied, performed by the _activePlayer_

**isGameOver(pockets: Array<number>): boolean** - is the game over.

**playerCanMakeMove(gameState: MancalaGameState, pocketIndex: number ): boolean** - can the active player select the provided pocket

# Running tests

```
npm run test
```

# Building

Be srue to run a build for a release.

```
npm run build
```
