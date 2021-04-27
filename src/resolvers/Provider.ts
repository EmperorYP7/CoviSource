import { Provider } from 'src/entities/Provider';
import { MyContext } from 'src/types';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class ProviderResolver {
    @Query(() => [Provider])
    providers(@Ctx() {em}: MyContext): Promise<Provider[]> {
        return em.find(Provider, {});
    }
} 