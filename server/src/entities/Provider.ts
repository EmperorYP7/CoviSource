
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./Contact";
import { Location } from "./Location";
import { Resource } from "./Resource";
import { User } from "./User";

@ObjectType()
@Entity()
export class Provider extends BaseEntity {

    @Field(() => String)
    @Column()
    providerName!: string;

    @Field(() => String)
    @Column()
    address!: string;

    @OneToMany(() => Resource, resource => resource.provider)
    @JoinColumn()
    resources: Resource[];

    @OneToMany(() => Contact, contact => contact.provider)
    @JoinColumn()
    contacts: Contact[];

    @Field(() => Location)
    @Column(() => Location)
    location: Location;

    @Field()
    @Column()
    ownerID: number;

    @OneToOne(() => User, user => user.provider)
    @JoinColumn()
    owner: User;

    @Field(() => String)
    @Column({ unique: true })
    slug!: string;

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}