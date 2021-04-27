import { __prod__ } from "./constants";
import { Provider } from "./entities/Provider";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Provider],
    dbName: 'covisourcedb',
    debug: !__prod__,
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];
