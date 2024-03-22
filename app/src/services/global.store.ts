import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EventS } from '../models/Event';
import * as events from "events";
import {RankedSwimmer} from "../models/RankedSwimmer";

export interface GlobalState {
    events: EventS[];
    totalNumber: number;
    rankedSwimmers: RankedSwimmer[];
}

export interface GlobalActions {
    addEvent: (event: EventS) => void;
    updateEvent: (event: EventS) => void;
    removeEvent: (id: number) => void;
}

const initialState: GlobalState = {
    events: [],
    totalNumber: 0,
    rankedSwimmers: [
        {place: 1, name: "Leonor Morcos", age: 8, team: "Acuatica", time: 1.22},
        {place: 1, name: "Leonor Morcos", age: 8, team: "Acuatica", time: 1.22},
        {place: 1, name: "Leonor Morcos", age: 8, team: "Acuatica", time: 1.22},
        {place: 1, name: "Leonor Morcos", age: 8, team: "Acuatica", time: 1.22},
    ],
};

export const useGlobal = create<GlobalState & GlobalActions>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            addEvent: (event: EventS) =>
                set((draft) => {
                    draft.events = [event, ...get().events];
                    draft.totalNumber = get().totalNumber + 1;
                }),
            removeEvent: (id: number) =>
                set((draft) => {
                    draft.events = get().events.filter(event => event.id !== id);
                }),
            updateEvent: (updatedEvent: EventS) =>
                set((draft) => {
                    const events = get().events.filter(event => event.id !== updatedEvent.id);
                    draft.events = [...events, updatedEvent];
                }),
        })),
        {
            name: 'swimmers.global',
        }
    )
);