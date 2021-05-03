import { Column } from "typeorm";

export class Location {

    @Column({ type: "float", unique: true })
    latitude!: number;

    @Column({ type: "float", unique: true })
    longitude!: number;

}
