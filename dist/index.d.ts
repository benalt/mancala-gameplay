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
        number
    ];
    stores: [number, number];
    activePlayer: 0 | 1;
    turns: Array<MancalaTurn>;
    resolution?: MancalaResolution;
};
export declare function newMancalaGameState(): MancalaGameState;
export declare function applyTurnGameState(incomingGameState: MancalaGameState, pocketIdx: number): MancalaGameState;
export declare function isGameOver(pockets: Array<number>): boolean;
export declare function playerCanMakeMove(gameState: MancalaGameState, pocketIndex: number): boolean;
//# sourceMappingURL=index.d.ts.map