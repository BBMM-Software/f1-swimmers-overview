import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EventS } from '../models/Event';
import * as events from "events";
import {Swimmer} from "../models/Swimmer";

export interface GlobalState {
    events: EventS[];
    totalNumber: number;
    swimmers: Swimmer[];
    selectedEvent: EventS|undefined;
}

export interface GlobalActions {
    addEvent: (event: EventS) => void;
    updateEvent: (event: EventS) => void;
    removeEvent: (id: number) => void;
    updateSwimmers : (swimmers: Swimmer[]) => void;
    setSelectedEvent: (event: EventS|undefined) => void;
}

const initialState: GlobalState = {
    events: [],
    totalNumber: 0,
    swimmers: [],
    selectedEvent: undefined,
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
            updateSwimmers : (swimmers: Swimmer[]) =>
                set((draft) => {
                    draft.swimmers = swimmers;
                }),
            setSelectedEvent: (event: EventS|undefined) =>
                set((draft) => {
                    draft.selectedEvent = event;
                }),
        })),
        {
            name: 'swimmers.global',
        }
    )
);