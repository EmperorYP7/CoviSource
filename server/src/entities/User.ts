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
    @Column({ unique: true })
    email!: string;

    @Field(() => String)
    @Column({ nullable: true, unique: true })
    phoneNumber!: string;

    @Field(() => String)
    @Column({})
    name!: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    providerID: number;

    @OneToOne(() => Provider, provider => provider.owner)
    @JoinColumn()
    provider: Provider;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}