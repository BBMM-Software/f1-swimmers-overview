import { Swimmer } from "./Swimmer";

export type EventS = { /// 'Event' deja exista ca type
    id: string;
    name: string;
    series: Array<Swimmer[]>;
}