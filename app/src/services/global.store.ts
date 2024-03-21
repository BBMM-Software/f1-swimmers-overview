import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EventS } from '../models/Event';

export interface GlobalState {
    events: EventS[];
}

export interface GlobalActions {
    addEvent: (event: EventS) => void;
    removeEvent: (id: string) => void;
}

const initialState: GlobalState = {
    events: [],
};

export const useGlobal = create<GlobalState & GlobalActions>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            addEvent: (event: EventS) =>
                set((draft) => {
                    draft.events = [event, ...get().events];
                }),
            removeEvent: (id: string) =>
                set((draft) => {
                    draft.events = get().events.filter(event => event.id !== id);
                }),
        })),
        {
            name: 'swimmers.global',
        }
    )
);