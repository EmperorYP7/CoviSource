import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { ProviderResolver } from "./resolvers/Provider";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ProviderResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app }); 

    app.listen(4000, () => {
        console.log("connected to DB!");
    })
    // const data = { providerName: 'D.Y. Patil Hospital'};
    // const provider = orm.em.create(Provider, data);
    // await orm.em.persistAndFlush(provider);

    // const post = await orm.em.find(Provider, {});
    // console.log(post);
};

main();
