import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

( async () => {
    main();
})();

async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
    // const newLog = await LogModel.create({
    //     message: 'Test message from app',
    //     level: 'low',
    //     origin: 'app.ts'
    // })
    // await newLog.save();
    // const logs = await LogModel.find();
    // console.log(logs)

    Server.start();
}