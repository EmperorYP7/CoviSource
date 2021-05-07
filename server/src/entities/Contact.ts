import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Provider } from "./Provider";

@ObjectType()
@Entity()
export class Contact {

    @Field(() => Int)
    @PrimaryColumn()
    providerID: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column()
    phoneNumber: string;

    @ManyToOne(() => Provider, provider => provider.contacts)
    @JoinColumn()
    provider: Provider;
}
