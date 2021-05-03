import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Provider } from "./Provider";

@ObjectType()
export class Resource {
    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Int)
    @Column({ type: 'int'})
    quantity: number;

    @Field(() => Int)
    @Column({ type: 'int' })
    providerID: number;

    @ManyToOne(() => Provider, provider => provider.resources)
    provider: Provider;

    @PrimaryGeneratedColumn()
    _id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
