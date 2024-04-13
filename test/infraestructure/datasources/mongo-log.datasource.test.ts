import { MongoLogDatasource } from './../../../src/infraestructure/datasources/mongo-log.datasource';
import mongoose from 'mongoose';
import { envs } from '../../../src/config/plugins/envs.plugin';
import { MongoDataBase } from './../../../src/data/mongo/init';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';
describe('infraestructure/datasource/mongo-log.datasource.ts',() => {
    
    const logDataSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message',
        origin: 'mongo-log.datasource.ts',
    })

    beforeAll( async() => {
        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    });

    afterEach( async () => {
        await LogModel.deleteMany();
    })

    afterAll(async () => {
        mongoose.connection.close();
    })

    test('should create a log', async() => {
        const logSpy = jest.spyOn(console, 'log');
        await logDataSource.saveLog( log );

        expect( logSpy ).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created:", expect.any(String));
    })

    test('should get logs', async() => {
        await logDataSource.saveLog(log);
        const logs = await logDataSource.getLogs( LogSeverityLevel.low );

        expect( logs.length ).toBe(1);
        expect( logs[0].level ).toBe( LogSeverityLevel.low)
    })

})