import { Series } from "./Series";

export type EventS = { /// 'Event' deja exista ca type
    id: number;
    name: string;
    series: Array<Series>;
}