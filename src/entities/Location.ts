import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Location {

    @Field()
    @Column({ type: "float", unique: true })
    latitude!: number;

    @Field()
    @Column({ type: "float", unique: true })
    longitude!: number;

}
