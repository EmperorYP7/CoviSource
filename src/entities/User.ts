import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Provider } from "./Provider";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => String)
    @Column({ unique: true })
    email!: string;

    @Field(() => String)
    @Column({ nullable: true, unique: true })
    contactNumber!: string;

    @Field(() => String)
    @Column({})
    name!: string;

    @OneToOne(() => Provider, provider => provider.owner)
    @JoinColumn()
    provider!: Provider;

    @Column({})
    password!: string;
}