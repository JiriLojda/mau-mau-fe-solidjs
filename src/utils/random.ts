import { allCards } from "../models/card";

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomCard = () => allCards[randomInt(0, allCards.length - 1)];
