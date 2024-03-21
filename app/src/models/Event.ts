import { Swimmer } from "./Swimmer";

export type EventS = { /// 'Event' deja exista ca type
    id: number;
    name: string;
    series: Array<Swimmer[]>;
}