import { Resource } from '../entities/Resource';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { isRegistered } from '../middleware/isRegistered';

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
    @UseMiddleware(isAuth)
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
        const result = await Resource.findOne({
            where: {
                providerID: req.session.providerID,
                name: input.name,
            }
        });
        if (result) {
            return {
                errors: [{
                    field: "resource",
                    message: "This resource already exists"
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
    @UseMiddleware(isAuth, isRegistered)
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

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isRegistered)
    async deleteResource(
        @Arg('id') id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean | undefined> {
        return new Promise(async (resolve) => {
            const resource = await Resource.findOne({ id: id, providerID: req.session.providerID });
            if (!resource) {
                console.log("Resource not found!");
                resolve(false);
            } else {
                try {
                    await Resource.delete({ id: id, providerID: req.session.providerID });
                } catch (err) {
                    console.log(err);
                    resolve(false);
                }
                resolve(true);
            }
        })
    }
}
