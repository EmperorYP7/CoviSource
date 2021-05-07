import { Resource } from '../entities/Resource';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';

@InputType()
class ResourceInput {
    @Field()
    name: string;

    @Field()
    quantity: number;
}

@InputType()
class ResourceUpdateInput {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    quantity: number;
}

@ObjectType()
class ErrorFormat {
    @Field()
    field: string;

    @Field()
    message: string;
}


@ObjectType()
class ResourceResponse {
    @Field(() => [ErrorFormat], { nullable: true })
    errors?: ErrorFormat[];

    @Field(() => Resource, { nullable: true })
    resource?: Resource;
}

@Resolver()
export class ResourceResolver {

    @Query(() => [Resource])
    allResources(): Promise<Resource[]> {
        return Resource.find();
    }

    @Mutation(() => ResourceResponse)
    async createResource(
        @Arg('input') input: ResourceInput,
        @Ctx() { req }: MyContext
    ): Promise<ResourceResponse> {
        if (input.name.length <= 3) {
            return {
                errors: [{
                    field: "name",
                    message: "Invalid Name"
                }]
            }
        }
        if (input.quantity < 0) {
            return {
                errors: [{
                    field: "quantity",
                    message: "quantity should be greater than 0"
                }]
            }
        }
        const resource = await Resource.create({
            ...input,
            providerID: req.session.providerID,
        }).save();

        return { resource };
    }

    @Mutation(() => ResourceResponse)
    async updateResource(
        @Arg('input') input: ResourceUpdateInput,
    ): Promise<ResourceResponse | undefined> {
        if (input.name.length <= 3) {
            return {
                errors: [{
                    field: "name",
                    message: "Invalid Name"
                }]
            }
        }
        if (input.quantity < 0) {
            return {
                errors: [{
                    field: "quantity",
                    message: "quantity should be greater than 0"
                }]
            }
        }
        const resource = await Resource.findOne(input.id);
        if (!resource) {
            return {
                errors: [{
                    field: "name",
                    message: "Resource not found for this provider"
                }]
            }
        } else {
            await Resource.update(input.id, {
                name: input.name,
                quantity: input.quantity
            });
    
            return { resource };
        }
    }
}
