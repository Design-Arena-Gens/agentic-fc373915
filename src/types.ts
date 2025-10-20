import { Board, Card, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

export type BoardWithLists = Board & { lists: ListWithCards[] };