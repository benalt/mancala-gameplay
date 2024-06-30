export type MancalaTurn = {
  player: number;
  pocketIndex: number;
  explanation: string;
};

export type MancalaResolution = {
  winner: number | null;
  scores: [number, number];
};

export type MancalaGameState = {
  pockets: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  stores: [number, number];
  activePlayer: 0 | 1;
  turns: Array<MancalaTurn>;
  resolution?: MancalaResolution;
};

const NEW_GAME: MancalaGameState = {
  pockets: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  stores: [0, 0],
  activePlayer: 0,
  turns: [],
};

export function newMancalaGameState(): MancalaGameState {
  return structuredClone(NEW_GAME);
}
exports.newMancalaGameState = newMancalaGameState;

export function applyTurnGameState(
  incomingGameState: MancalaGameState,
  pocketIdx: number
): MancalaGameState {
  if (!playerCanMakeMove(incomingGameState, pocketIdx)) {
    throw new Error(
      `IllegalMoveError - Player ${incomingGameState.activePlayer} cannot select pocket ${pocketIdx}`
    );
  }
  const outgoingGameState = structuredClone(incomingGameState);
  const turn: MancalaTurn = {
    player: incomingGameState.activePlayer,
    pocketIndex: pocketIdx,
    explanation: "",
  };

  let numberOfSeeds = outgoingGameState.pockets[pocketIdx];
  let whatJustHappened = "";

  let shouldSwitchActivePlayer = true;

  // take all the stones from the selcected pocket
  outgoingGameState.pockets[pocketIdx] = 0;

  while (numberOfSeeds > 0) {
    // should we add it to the active player's store?
    if (
      (pocketIdx === 0 && outgoingGameState.activePlayer === 0) ||
      (pocketIdx === 6 && outgoingGameState.activePlayer === 1)
    ) {
      numberOfSeeds -= 1;
      outgoingGameState.stores[outgoingGameState.activePlayer] += 1;

      // we landed on the AP's store, so they get to go again
      if (numberOfSeeds === 0) {
        whatJustHappened = `Player ${
          outgoingGameState.activePlayer + 1
        }'s last seed went into their mancala, they get to go again.`;
        shouldSwitchActivePlayer = false;
        continue;
      }
    }

    pocketIdx = pocketIdx === 0 ? 11 : pocketIdx - 1;
    numberOfSeeds -= 1;
    outgoingGameState.pockets[pocketIdx] += 1;

    // if we added to an empty pocket take from the opposite pocket
    if (numberOfSeeds === 0 && outgoingGameState.pockets[pocketIdx] === 1) {
      const oppositeIdx = Math.abs(pocketIdx - 11);
      const newStore =
        1 +
        outgoingGameState.stores[outgoingGameState.activePlayer] +
        outgoingGameState.pockets[oppositeIdx];

      whatJustHappened = `Player ${
        outgoingGameState.activePlayer + 1
      }'s last seed went into an empty pocket, they get to keep that seed and they capture seeds from the opposite pocket.`;

      outgoingGameState.stores[outgoingGameState.activePlayer] = newStore;
      outgoingGameState.pockets[pocketIdx] = 0;
      outgoingGameState.pockets[oppositeIdx] = 0;
    }
  }

  // end the game if either side is all 0
  const postUpdateGameOver = isGameOver(outgoingGameState.pockets);

  if (postUpdateGameOver) {
    // add all pocketedStones to the proper store
    const adds = [0, 0];
    for (let i = 0; i < outgoingGameState.pockets.length; i++) {
      adds[i < 6 ? 0 : 1] += outgoingGameState.pockets[i];
      outgoingGameState.pockets[i] = 0;
    }

    outgoingGameState.stores[0] += adds[0];
    outgoingGameState.stores[1] += adds[1];

    whatJustHappened = `Player 1 added ${adds[0]} seed from their side, and Player 2 added ${adds[1]} seeds from their side.`;
    outgoingGameState.resolution = {
      scores: [...outgoingGameState.stores],
      winner:
        outgoingGameState.stores[0] === outgoingGameState.stores[1]
          ? null
          : outgoingGameState.stores[0] > outgoingGameState.stores[1]
            ? 0
            : 1,
    };
  } else if (shouldSwitchActivePlayer) {
    outgoingGameState.activePlayer =
      outgoingGameState.activePlayer === 0 ? 1 : 0;
  }
  turn.explanation = whatJustHappened;
  outgoingGameState.turns.push(turn);

  return outgoingGameState;
}
exports.applyTurnGameState = applyTurnGameState;

export function isGameOver(pockets: Array<number>): boolean {
  return (
    pockets.slice(0, 6).every((val) => val === 0) ||
    pockets.slice(6).every((val) => val === 0)
  );
}
exports.isGameOver = isGameOver;

export function playerCanMakeMove(
  gameState: MancalaGameState,
  pocketIndex: number
): boolean {
  return gameState.pockets[pocketIndex] > 0 && gameState.activePlayer === 0
    ? pocketIndex < 6
    : pocketIndex > 5;
}
exports.playerCanMakeMove = playerCanMakeMove;
