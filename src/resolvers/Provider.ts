import { Provider } from '../entities/Provider';
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import slugify from 'slugify';
import { User } from 'src/entities/User';

type ResourceTemplate = {
    name: string;
    quantity: number;
}

type LocationTemplate = {
    latitude: number;
    longitude: number;
}

@InputType()
class NewProviderInput {
    @Field()
    providerName: string;

    @Field()
    address: string;

    @Field()
    resources: Array<ResourceTemplate>;

    @Field()
    location: LocationTemplate;

    @Field()
    owner: User;
};

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
    async createProvider(@Arg('providerName', () => String) providerName: string): Promise<Provider> {
        return Provider.create({ providerName: providerName, slug: slugify(providerName) }).save();
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
            await Provider.update(id, {providerName: providerName, slug: slugify(providerName)})
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