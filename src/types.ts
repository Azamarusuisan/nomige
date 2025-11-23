export type GameMode = "normal" | "adult";

// Normal mode game slugs
export type NormalGameSlug =
  | "kingcup"
  | "roulette"
  | "king"
  | "wolf"
  | "truth"
  | "love"
  | "roles"
  | "vote"
  | "pointfinger"
  | "seatroulette";

// Adult mode game slugs
export type AdultGameSlug =
  | "a_truth"
  | "a_oogiri"
  | "a_pointfinger"
  | "a_vote"
  | "a_roulette"
  | "a_story"
  | "a_rank"
  | "a_secret"
  | "a_mission"
  | "a_fantasy";

export type GameSlug = NormalGameSlug | AdultGameSlug;

export interface Game {
  id: string;
  title: string;
  description: string;
  emoji: string;
}
