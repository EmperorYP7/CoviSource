import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import slugify from "slugify";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Provider {
    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field(() => String)
    @Property({ type: 'date', default: 'NOW()' })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date(), default: 'NOW()' })
    updatedAt = new Date();

    @Field(() => String)
    @Property({ type: 'text' })
    providerName!: string;

    @Field(() => String)
    @Property({ type: 'text' })
    slug!: string;

    // @Property()
    // location: Geolocation;

    // @Property()
    // adhaar: number;

}