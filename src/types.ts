export type GameMode = "normal" | "adult";

export type GameId =
  | "highlow"
  | "kingscup"
  | "roulette"
  | "ojisan"
  | "oogiri"
  | "songroulette"
  | "cabajou";

export interface Game {
  id: GameId;
  title: string;
  description: string;
}
