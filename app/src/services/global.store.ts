import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EventS } from '../models/Event';

export interface GlobalState {
    events: EventS[];
    totalNumber: number;
}

export interface GlobalActions {
    addEvent: (event: EventS) => void;
    removeEvent: (id: number) => void;
}

const initialState: GlobalState = {
    events: [],
    totalNumber: 0,
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
        })),
        {
            name: 'swimmers.global',
        }
    )
);