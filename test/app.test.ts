// import { PrismaClient } from "@prisma/client";
// import { envs } from "./config/plugins/envs.plugin";
// import { LogModel, MongoDataBase } from "./data/mongo";
// import { Server } from "./presentation/server";

// ( async () => {
//     main();
// })();

// async function main() {
//     Server.start();
//     await MongoDataBase.connect({
//         mongoUrl: envs.MONGO_URL,
//         dbName: envs.MONGO_DB_NAME
//     })
    // const newLog = await LogModel.create({
    //     message: 'Test message from app',
    //     level: 'low',
    //     origin: 'app.ts'
    // })

    // await newLog.save();
    // const logs = await LogModel.find();
    // console.log(logs)

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'app.ts'
    //     }
    // })
    // console.log({newLog})

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log( logs );
// }

describe('app.ts', () => {
    test("app.ts", () => {
        
    })
})