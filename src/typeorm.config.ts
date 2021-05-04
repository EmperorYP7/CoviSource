import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { Provider } from "./entities/Provider";
import { ConnectionOptions } from "typeorm";
import { Resource } from "./entities/Resource";
import { Contact } from "./entities/Contact";

export default {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    synchronize: true,
    entities: [Provider, User, Resource, Contact],
} as ConnectionOptions;
