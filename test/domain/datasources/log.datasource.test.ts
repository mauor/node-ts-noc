import { LogDatasource } from "../../../src/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";

describe('domain/datasources/log.datasuorce.ts', () => {

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Test message',
        origin: 'log.datasource.ts'
    })

    
    class MockLogDatasource implements LogDatasource {
        
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        
        async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
           return [newLog];
        }

    }

    test('shoul test abstract class', async() => {
        const mockLogDatasource = new MockLogDatasource();
        await mockLogDatasource.saveLog( newLog );
        const logs = await mockLogDatasource.getLogs( LogSeverityLevel.low );

        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
        expect(typeof mockLogDatasource.getLogs).toBe( 'function' );

        expect( logs ).toHaveLength( 1 );
        logs.forEach( log => {
            expect( log ).toBeInstanceOf( LogEntity );
        } );

    })

})