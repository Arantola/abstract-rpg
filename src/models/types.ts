export interface AppState {
  isMenuOpen: boolean;
  isHeroExist: boolean;
  notification: Notification | null;
}

export interface Notification {
  title: string;
  message: string;
}

export interface Hero {
  name: string;
  stats: Stats;
  attributes: Attributes;
  skills: Skills;
}

export type HeroSlices = keyof Omit<Hero, "name">;

export interface Stats {
  health: Indicator;
  stamina: Indicator;
  evasion: Indicator;
}

export interface Indicator {
  value: number;
  maxValue?: number;
}

export type SliceName = keyof Pick<Hero, "attributes" | "skills">;

export interface Attributes {
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
}

export interface Skills {
  attack: number;
  stealth: number;
  archery: number;
  trainability: number;
  survival: number;
  medicine: number;
  intimidation: number;
  insight: number;
  appearance: number;
  manipulation: number;
}

export type ParameterName = keyof Attributes | keyof Skills;

export interface HeroStatic {
  attributes: Dependencies;
  stats: Dependencies;
  skills: Dependencies;
}

export interface Dependencies {
  [key: string]: string[];
}
