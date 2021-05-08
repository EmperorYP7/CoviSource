import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Provider } from "./Provider";

@ObjectType()
@Entity()
export class Resource extends BaseEntity {
    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Int)
    @Column({ type: 'int'})
    quantity: number;

    @Field(() => Int)
    @PrimaryColumn()
    providerID: number;

    @ManyToOne(() => Provider, provider => provider.resources)
    @JoinColumn()
    provider: Provider;

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
