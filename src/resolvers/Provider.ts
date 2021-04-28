import { Provider } from '../entities/Provider';
import { MyContext } from '../types';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class ProviderResolver {
    @Query(() => [Provider])
    providers(@Ctx() {em}: MyContext): Promise<Provider[]> {
        return em.find(Provider, {});
    }

    @Query(() => Provider, { nullable: true })
    findProvider(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Provider | null> {
        return em.findOne(Provider, { _id: id });
    }

    @Mutation(() => Provider)
    async createProvider(
        @Arg('providerName', () => String) providerName: string,
        @Ctx() { em }: MyContext
    ): Promise<Provider> {
        const provider = em.create(Provider, { providerName: providerName });
        await em.persistAndFlush(provider);
        return provider;
    }

    @Mutation(() => Provider, {nullable: true})
    async updateProvider(
        @Arg('id', () => Int) id: number,
        @Arg('providerName', () => String) providerName: string,
        @Ctx() { em }: MyContext
    ): Promise<Provider | null> {
        const provider = await em.findOne(Provider, { _id: id });
        if (!provider) {
            return null;
        }
        if (typeof providerName !== 'undefined') {
            provider.providerName = providerName;
            await em.persistAndFlush(provider);
        }
        return provider;
    }

    @Mutation(() => Boolean, {nullable: true})
    async deleteProvider(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try {
            await em.nativeDelete(Provider, { _id: id });
        } catch {
            return false;
        }
        return true;
    }
} 