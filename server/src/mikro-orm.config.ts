import { Books } from "./entities/Books";
import config from './config'
import { MikroORM } from "mikro-orm";

export default {
    entities: [Books],
    dbName: "reading-list",
    type: "mongo",
    clientUrl: config.MONGO_DB_URI,
    entitiesDirsTs: ["./src/entities"],
    debug: config.__prod__,
} as Parameters<typeof MikroORM.init>[0]