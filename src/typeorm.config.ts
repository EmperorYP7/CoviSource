import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { Provider } from "./entities/Provider";
import { ConnectionOptions } from "typeorm";

export default {
    type: 'postgres',
    database: 'covisourcedb',
    username: 'postgres',
    password: 'postgress',
    logging: !__prod__,
    synchronize: true,
    entities: [Provider, User],
} as ConnectionOptions;
