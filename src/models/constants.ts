import { Hero, HeroStatic } from "./types";

export const INITIAL_HERO_STATE: Hero = {
  name: "",
  attributes: {
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
  },
  stats: {
    health: {
      value: 3,
      maxValue: 3,
    },
    stamina: {
      value: 0,
      maxValue: 0,
    },
    evasion: {
      value: 10,
    },
  },
  skills: {
    attack: 0,
    stealth: 0,
    archery: 0,
    trainability: 0,
    survival: 0,
    medicine: 0,
    intimidation: 0,
    insight: 0,
    appearance: 0,
    manipulation: 0,
  },
};

export const HERO_STATIC: HeroStatic = {
  attributes: {
    strength: ["attack"],
    agility: ["stealth", "archery"],
    intelligence: ["trainability", "survival", "medicine"],
    charisma: ["intimidation", "insight", "appearance", "manipulation"],
  },
  stats: {
    health: ["strength"],
    stamina: ["agility", "intelligence"],
    evasion: ["agility"],
  },
  skills: {
    attack: ["strength"],
    stealth: ["agility"],
    archery: ["agility"],
    trainability: ["intelligence"],
    survival: ["intelligence"],
    medicine: ["intelligence"],
    intimidation: ["charisma"],
    insight: ["charisma"],
    appearance: ["charisma"],
    manipulation: ["charisma"],
  },
};

export const ATTRIBUTES_CAP = 10;

export const MASTERY = [
  "Untrained",
  "Beginner",
  "Scholar",
  "Adept",
  "Expert",
  "Master",
];

export const DB_LINK =
  "https://abstract-rpg-default-rtdb.europe-west1.firebasedatabase.app/hero.json";

export const NOTIFICATIONS = {
  saveWithNoName: {
    title: "Error!",
    message: "Set hero name",
  },
  saveSuccess: {
    title: "Saved!",
    message: "Your hero has been saved",
  },
  loadSuccess: {
    title: "Load succeed!",
    message: "Your hero has been loaded",
  },
  heroDeath: {
    title: "Your hero died...",
    message: "Be more careful next time",
  },
};
