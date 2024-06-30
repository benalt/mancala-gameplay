"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("newMancalaGameState", () => {
    it("returns a new Mancala Game State", () => {
        const newGame = (0, index_1.newMancalaGameState)();
        expect(newGame.pockets.every((pocket) => pocket === 4)).toBe(true);
        expect(newGame.activePlayer).toBe(0);
        expect(newGame.turns).toMatchObject([]);
        expect(newGame.stores).toMatchObject([0, 0]);
    });
});
describe("isGameOver", () => {
    it("returns false if both sides have seeds in the pockets", () => {
        const newSeeds = new Array(12).fill(4);
        expect((0, index_1.isGameOver)(newSeeds)).toBe(false);
        const almostDone = new Array(12).fill(0);
        almostDone[0] = 1;
        almostDone[11] = 1;
        expect((0, index_1.isGameOver)(almostDone)).toBe(false);
    });
    it("returns true if top sides has no seeds in the pockets", () => {
        const oneSideEmpty = new Array(6).fill(0).concat(new Array(6).fill(1));
        expect((0, index_1.isGameOver)(oneSideEmpty)).toBe(true);
    });
    it("returns true if bottom sides has no seeds in the pockets", () => {
        const oneSideEmpty = new Array(6).fill(1).concat(new Array(6).fill(0));
        expect((0, index_1.isGameOver)(oneSideEmpty)).toBe(true);
    });
});
describe("playerCanMakeMove", () => {
    it("returns false if the pocket has no seeds", () => {
        const newGame = (0, index_1.newMancalaGameState)();
        newGame.activePlayer = 0;
        newGame.pockets[0] = 0;
        expect((0, index_1.playerCanMakeMove)(newGame, 0)).toBe(false);
    });
    it("returns player 1 and caon only move on pockets 0-5", () => {
        const newGame = (0, index_1.newMancalaGameState)();
        newGame.activePlayer = 0;
        expect((0, index_1.playerCanMakeMove)(newGame, 0)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 1)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 2)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 3)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 4)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 5)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 6)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 7)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 8)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 9)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 10)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 11)).toBe(false);
    });
    it("player 2 can only move one pockets 6-11", () => {
        const newGame = (0, index_1.newMancalaGameState)();
        newGame.activePlayer = 1;
        expect((0, index_1.playerCanMakeMove)(newGame, 0)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 1)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 2)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 3)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 4)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 5)).toBe(false);
        expect((0, index_1.playerCanMakeMove)(newGame, 6)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 7)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 8)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 9)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 10)).toBe(true);
        expect((0, index_1.playerCanMakeMove)(newGame, 11)).toBe(true);
    });
});
describe("applyTurnGameState", () => {
    it("redistributes seeds correctly across a single turn", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState = (0, index_1.applyTurnGameState)(gameState, 4);
        const expected = {
            pockets: [5, 5, 5, 5, 0, 4, 4, 4, 4, 4, 4, 4],
            stores: [0, 0],
            activePlayer: 1,
            turns: [{ explanation: "", player: 0, pocketIndex: 4 }],
        };
        expect(gameState).toMatchObject(expected);
    });
    it("redistributes seeds correctly acrosss multiple turns", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState = (0, index_1.applyTurnGameState)(gameState, 4);
        gameState = (0, index_1.applyTurnGameState)(gameState, 10);
        const expected = {
            pockets: [5, 5, 5, 5, 0, 4, 5, 5, 5, 5, 0, 4],
            stores: [0, 0],
            activePlayer: 0,
            turns: [
                { explanation: "", player: 0, pocketIndex: 4 },
                { explanation: "", player: 1, pocketIndex: 10 },
            ],
        };
        expect(gameState).toMatchObject(expected);
    });
    it("redistributes circularly", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState.pockets[4] = 15;
        gameState = (0, index_1.applyTurnGameState)(gameState, 4);
        const expected = {
            pockets: [5, 5, 6, 6, 1, 5, 5, 5, 5, 5, 5, 5],
            stores: [1, 0],
            activePlayer: 1,
            turns: [{ explanation: "", player: 0, pocketIndex: 4 }],
        };
        expect(gameState).toMatchObject(expected);
    });
    it("adds to the store when appropriate", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState = (0, index_1.applyTurnGameState)(gameState, 1);
        const expected = {
            pockets: [5, 0, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5],
            stores: [1, 0],
            activePlayer: 1,
            turns: [{ explanation: "", player: 0, pocketIndex: 1 }],
        };
        expect(gameState).toMatchObject(expected);
    });
    it("switches active players between turns", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        expect(gameState.activePlayer).toBe(0);
        gameState = (0, index_1.applyTurnGameState)(gameState, 1);
        expect(gameState.activePlayer).toBe(1);
        gameState = (0, index_1.applyTurnGameState)(gameState, 6);
        expect(gameState.activePlayer).toBe(0);
        gameState = (0, index_1.applyTurnGameState)(gameState, 2);
        expect(gameState.activePlayer).toBe(1);
    });
    it("keeps the same active players if the last seed goes into the store", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        expect(gameState.activePlayer).toBe(0);
        gameState = (0, index_1.applyTurnGameState)(gameState, 3);
        expect(gameState.activePlayer).toBe(0);
        expect(gameState.stores[0]).toBe(1);
        gameState = (0, index_1.applyTurnGameState)(gameState, 4);
        expect(gameState.activePlayer).toBe(1);
        gameState = (0, index_1.applyTurnGameState)(gameState, 9);
        expect(gameState.activePlayer).toBe(1);
        expect(gameState.stores[1]).toBe(1);
        gameState = (0, index_1.applyTurnGameState)(gameState, 10);
        expect(gameState.activePlayer).toBe(0);
        expect(gameState.stores).toMatchObject([1, 1]);
    });
    it("takes the seed if going into an empty pocket and takes opposite", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState.pockets = [4, 4, 7, 4, 4, 4, 4, 4, 0, 4, 4, 4];
        gameState = (0, index_1.applyTurnGameState)(gameState, 2);
        expect(gameState.stores[0]).toBe(6);
        expect(gameState.pockets).toMatchObject([
            5, 5, 0, 0, 4, 4, 4, 4, 0, 5, 5, 5,
        ]); //  ^  ^              ^
        //      |  |              |-- will land here, it's empty, so it goes into the store
        //      |  | --- this is the opposite, it's empty
        //      | --- this is the starting point
    });
    it("throws errors on illegal an illegal move", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        expect(() => {
            (0, index_1.applyTurnGameState)(gameState, 10);
        }).toThrow(Error);
    });
    it("includes a resolution if the game is over ", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState.pockets = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
        gameState = (0, index_1.applyTurnGameState)(gameState, 0);
        expect(gameState.resolution).toMatchObject({
            winner: 1,
            scores: [1, 2],
        });
    });
    it("winner is null if the game is a tie", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState.pockets = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        gameState = (0, index_1.applyTurnGameState)(gameState, 0);
        expect(gameState.resolution).toMatchObject({
            winner: null,
            scores: [1, 1],
        });
    });
    it("rolls up remaining seeds into its respective players store when if the game is over ", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState.pockets = [1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4];
        gameState = (0, index_1.applyTurnGameState)(gameState, 0);
        expect(gameState.resolution).toMatchObject({
            winner: 1,
            scores: [1, 24],
        });
    });
    it("tracks multiple turns ", () => {
        let gameState = (0, index_1.newMancalaGameState)();
        gameState = (0, index_1.applyTurnGameState)(gameState, 3);
        gameState = (0, index_1.applyTurnGameState)(gameState, 4); // player 0 goes again
        gameState = (0, index_1.applyTurnGameState)(gameState, 11);
        gameState = (0, index_1.applyTurnGameState)(gameState, 2);
        gameState = (0, index_1.applyTurnGameState)(gameState, 8);
        gameState = (0, index_1.applyTurnGameState)(gameState, 5);
        expect(gameState.turns.length).toBe(6);
        expect(gameState.turns.map((turn) => turn.player)).toMatchObject([
            0, 0, 1, 0, 1, 0,
        ]);
        expect(gameState.turns.map((turn) => turn.pocketIndex)).toMatchObject([
            3, 4, 11, 2, 8, 5,
        ]);
    });
});
//# sourceMappingURL=index.spec.js.map