import { Provider } from '../entities/Provider';
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import slugify from 'slugify';
import { MyContext } from 'src/types';
import { isAuth } from '../middleware/isAuth';
import { isRegistered } from '../middleware/isRegistered';

@InputType()
class LocationTemplate {
    @Field()
    latitude: number;

    @Field()
    longitude: number;
}

@InputType()
class NewProviderInput {
    @Field()
    providerName: string;

    @Field()
    address: string;

    @Field(() => LocationTemplate)
    location: LocationTemplate;
}

@Resolver()
export class ProviderResolver {
    @Query(() => [Provider])
    allProviders(): Promise<Provider[]> {
        return Provider.find();
    }

    @Query(() => Provider, { nullable: true })
    @UseMiddleware(isAuth, isRegistered)
    myProvider(
        @Ctx() { req }: MyContext
    ): Promise<Provider | undefined> {
        return Provider.findOne(req.session.providerID);
    }

    @Query(() => Provider, { nullable: true })
    findProviderbySlug(
        @Arg('slug', () => String) slug: string,
    ): Promise<Provider | undefined> {
        return Provider.findOne({ where: { slug: slug } });
    }

    @Mutation(() => Provider)
    @UseMiddleware(isAuth)
    async createProvider(
        @Arg('input') input: NewProviderInput,
        @Ctx() { req }: MyContext
    ): Promise<Provider | undefined> {
        if (req.session.providerID) {
            throw Error("Provider already created!");
        }
        var provider;
        try {
            provider = await Provider.create({
                ...input,
                slug: slugify(input.providerName, { lower: true }),
                ownerID: req.session.userID,
                resources: [],
            }).save();
        } catch {
            return undefined;
        }
        req.session.providerID = provider._id;
        return provider;
    }

    @Mutation(() => Provider, { nullable: true })
    @UseMiddleware(isAuth, isRegistered)
    async updateProvider(
        @Arg('input') input: NewProviderInput,
        @Ctx() { req }: MyContext
    ): Promise<Provider | null> {
        const provider = await Provider.findOne(req.session.providerID);
        if (!provider) {
            return null;
        }
        if (provider) {
            await Provider.update(req.session.providerID as number, {
                ...input,
                slug: slugify(input.providerName, { lower: true }),
            });
        }
        const updatedProvider = await Provider.findOne(req.session.providerID);
        if (updatedProvider) {
            return updatedProvider;
        }
        return null;
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth, isRegistered)
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
