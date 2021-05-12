
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

    @Field(() => [Resource], { nullable: true })
    @OneToMany(() => Resource, resource => resource.provider, { eager: true })
    @JoinColumn()
    resources: Resource[];

    @Field(() => [Contact], { nullable: true })
    @OneToMany(() => Contact, contact => contact.provider, { eager: true })
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