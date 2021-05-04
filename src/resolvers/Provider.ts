import { Provider } from '../entities/Provider';
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import slugify from 'slugify';
import { MyContext } from 'src/types';

@InputType()
class LocationTemplate {
    @Field()
    latitude: number;

    @Field()
    longitude: number;
}

@InputType()
class ContactTemplate {
    @Field()
    name: string;

    @Field()
    number: string;
}

@InputType()
class NewProviderInput {
    @Field()
    providerName: string;

    @Field()
    address: string;

    @Field(() => LocationTemplate)
    location: LocationTemplate;

    @Field(() => [ContactTemplate])
    contacts: [ContactTemplate];
}

@Resolver()
export class ProviderResolver {
    @Query(() => [Provider])
    providers(): Promise<Provider[]> {
        return Provider.find();
    }

    @Query(() => Provider, { nullable: true })
    findProvider(
        @Arg('id', () => Int) id: number,
    ): Promise<Provider | undefined> {
        return Provider.findOne(id);
    }

    @Mutation(() => Provider)
    async createProvider(
        @Arg('input') input: NewProviderInput,
        @Ctx() { req }: MyContext
        // @UseMiddleware(onAuth)
    ): Promise<Provider | undefined> {
        if (typeof req.session.providerID !== 'undefined') {
            throw Error("Provider already created!");
        }
        var provider;
        try {
            provider = await Provider.create({
                ...input,
                location: input.location,
                slug: slugify(input.providerName),
                ownerID: req.session.userID,
                resources: [],
            }).save();
        } catch {
            return undefined;
        }
        req.session.providerID = provider._id;
        return provider;
    }

    @Mutation(() => Provider, {nullable: true})
    async updateProvider(
        @Arg('id', () => Int) id: number,
        @Arg('providerName', () => String) providerName: string,
    ): Promise<Provider | null> {
        const provider = await Provider.findOne(id);
        if (!provider) {
            return null;
        }
        if (typeof providerName !== 'undefined') {
            await Provider.update(id, { providerName: providerName, slug: slugify(providerName) });
        }
        return provider;
    }

    @Mutation(() => Boolean, {nullable: true})
    async deleteProvider(
        @Arg('id', () => Int) id: number,
    ): Promise<boolean> {
        try {
            await Provider.delete(id);
        } catch {
            return false;
        }
        return true;
    }
} 