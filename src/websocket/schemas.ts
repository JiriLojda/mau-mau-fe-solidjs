import { z } from "zod";

// Common schemas
const UnknownCardSchema = z.object({
  cardType: z.literal("unknownType"),
  suite: z.literal("unknownSuite"),
});

const KnownCardSchema = z.object({
  cardType: z.enum(["ace", "king", "queen", "jack", "ten", "nine", "eight", "seven"]),
  suite: z.enum(["hearts", "diamonds", "spades", "clubs"]),
});

const CardSchema = z.union([KnownCardSchema, UnknownCardSchema]);

const PlayerSchema = z.object({
  name: z.string(),
  hand: z.array(CardSchema),
});

const TopCardStateSchema = z.discriminatedUnion("state", [
  z.object({
    state: z.literal("noEffect"),
  }),
  z.object({
    state: z.literal("aceActive"),
  }),
  z.object({
    state: z.literal("sevenActive"),
    cardsToDraw: z.number(),
  }),
  z.object({
    state: z.literal("queenPresent"),
    chosenSuite: z.enum(["hearts", "diamonds", "spades", "clubs"]),
  }),
]);

const GameStateSchema = z.object({
  nextPlayer: PlayerSchema,
  restPlayers: z.array(PlayerSchema),
  topCard: KnownCardSchema,
  discardPile: z.array(KnownCardSchema),
  drawPile: z.array(UnknownCardSchema),
  topCardState: TopCardStateSchema,
});

// Server message schemas
const LogInSuccessSchema = z.object({
  type: z.literal("logIn"),
  success: z.literal(true),
  availableGameIds: z.array(z.string()),
});

const LogInErrorSchema = z.object({
  type: z.literal("logIn"),
  error: z.object({
    code: z.union([z.literal("LIE-100"), z.literal("LIE-110"), z.literal("LIE-200")]),
    message: z.string(),
  }),
});

const HandshakeErrorSchema = z.object({
  type: z.literal("handshake"),
  error: z.object({
    code: z.literal("MUN-100"),
    message: z.string(),
  }),
});

const GameCreatedSchema = z.object({
  type: z.literal("gameCreation"),
  success: z.literal(true),
  gameId: z.string(),
  creator: z.string(),
});

const GameCreationErrorSchema = z.object({
  type: z.literal("gameCreation"),
  error: z.object({
    code: z.literal("CNG-100"),
    message: z.string(),
  }),
});

const PlayerJoinedSchema = z.object({
  type: z.literal("connectToGame"),
  success: z.literal(true),
  gameId: z.string(),
  userName: z.string(),
  usersInGame: z.array(z.string()),
});

const PlayerJoinedErrorSchema = z.object({
  type: z.literal("connectToGame"),
  error: z.object({
    code: z.union([
      z.literal("CTG-100"),
      z.literal("CTG-200"),
      z.literal("CTG-210"),
      z.literal("CTG-220"),
      z.literal("CTG-300"),
    ]),
    message: z.string(),
  }),
});

const PlayerDisconnectedSchema = z.object({
  type: z.literal("disconnectFromGame"),
  success: z.literal(true),
  gameId: z.string(),
  userName: z.string(),
  gameStatusAfterDisconnect: z.union([z.literal("remains"), z.literal("removed")]),
});

const PlayerDisconnectedErrorSchema = z.object({
  type: z.literal("disconnectFromGame"),
  error: z.object({
    code: z.literal("DFG-100"),
    message: z.string(),
  }),
});

const GameStartedSchema = z.object({
  type: z.literal("startGame"),
  success: z.literal(true),
  state: GameStateSchema,
});

const GameStartErrorSchema = z.object({
  type: z.literal("startGame"),
  error: z.object({
    code: z.union([
      z.literal("SCG-100"),
      z.literal("SCG-200"),
      z.literal("SCG-210"),
      z.literal("SCG-300"),
      z.literal("SCG-400"),
    ]),
    message: z.string(),
  }),
});

const TurnSuccessSchema = z.object({
  type: z.literal("turn"),
  success: z.literal(true),
  state: GameStateSchema,
});

const TurnErrorSchema = z.object({
  type: z.literal("turn"),
  error: z.object({
    code: z.union([
      z.literal("GTE-110"),
      z.literal("GTE-200"),
      z.literal("GTE-210"),
      z.literal("GTE-220"),
      z.literal("GTE-300"),
      z.literal("GTE-310"),
      z.literal("CIT-100"),
      z.literal("CIT-110"),
      z.literal("CIT-120"),
      z.literal("CIT-130"),
      z.literal("CIT-200"),
      z.literal("CIT-300"),
      z.literal("CIT-310"),
      z.literal("CIT-400"),
    ]),
    message: z.string(),
  }),
});

const GameEndedSchema = z.object({
  type: z.literal("gameEnded"),
  success: z.literal(true),
  state: GameStateSchema,
});

const InvalidMessageErrorSchema = z.object({
  type: z.literal("error"),
  error: z.object({
    code: z.literal("GPE-100"),
    message: z.string(),
  }),
});

export const ServerMessageSchema = z.union([
  LogInSuccessSchema,
  LogInErrorSchema,
  HandshakeErrorSchema,
  GameCreatedSchema,
  GameCreationErrorSchema,
  PlayerJoinedSchema,
  PlayerJoinedErrorSchema,
  PlayerDisconnectedSchema,
  PlayerDisconnectedErrorSchema,
  GameStartedSchema,
  GameStartErrorSchema,
  TurnSuccessSchema,
  TurnErrorSchema,
  GameEndedSchema,
  InvalidMessageErrorSchema,
]);

// Type exports
export type ServerMessage = z.infer<typeof ServerMessageSchema>;

export type ClientMessage = Readonly<
  | {
      type: "logIn";
      userName: string;
    }
  | {
      type: "createGame";
    }
  | {
      type: "connectToGame";
      gameId: string;
    }
  | {
      type: "disconnectFromGame";
    }
  | {
      type: "startGame";
    }
  | {
      type: "skipTurn";
    }
  | {
      type: "drawCards";
    }
  | {
      type: "playCard";
      card: z.infer<typeof KnownCardSchema>;
      chosenSuite?: z.infer<typeof KnownCardSchema.shape.suite>;
    }
>;
