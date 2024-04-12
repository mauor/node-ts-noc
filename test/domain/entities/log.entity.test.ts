import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"

describe('domain/entities/log.entity', () => {

    const lobObject = {
        level: LogSeverityLevel.low,
        message: 'Test message',
        origin: 'log.datasource.ts'
    };

    test('should create a log entity instance', () => {
        const log = new LogEntity(lobObject);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.level ).toBe( lobObject.level );
        expect( log.message ).toBe( lobObject.message );
        expect( log.origin ).toBe( lobObject.origin );
        expect( log.date ).toBeInstanceOf( Date );
    })

    test('shoul create a log entity from json', () => {
        const json = `{ "level": "high", "message": "https://scsdcd.com is not ok. TypeError: fetch failed", "origin": "check-service.ts", "date": "2024-04-11T04:20:30.024Z" }`

        const log = LogEntity.fromJson(json);

        expect( log).toBeInstanceOf( LogEntity );
        expect( log.level).toBe("high");
        expect( log.message).toBe( "https://scsdcd.com is not ok. TypeError: fetch failed" );
        expect( log.origin).toBe( "check-service.ts" );
        expect( log.date ).toBeInstanceOf( Date );
    })

    test('should create a LogEntity instance from object',() =>{
        const log = LogEntity.fromObject(lobObject);

        expect( log ).toBeInstanceOf( LogEntity );
        expect(log.level).toBe(lobObject.level);
        expect(log.message).toBe(lobObject.message);
        expect(log.origin).toBe(lobObject.origin);
        expect(log.date).toBeInstanceOf(Date);
    } )
})