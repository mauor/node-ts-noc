import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../src/domain/repository/log.repository';
import { LogRepositoryImpl } from './../../../src/infraestructure/repositories/log.repository.implementation';

describe('log.repository.ts', () => {

    const mockLogDataSource: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    beforeEach( () => {
        jest.clearAllMocks();
    })

    const logRepository = new LogRepositoryImpl(mockLogDataSource);
    
    test('saveLog should call the datasource with arguments', () => {
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'log.repository.implementation.ts'
        })
        
        const spyLogRepository = jest.spyOn(logRepository, 'saveLog');
        
        logRepository.saveLog(log);

        expect(spyLogRepository).toHaveBeenCalledTimes(1);
        expect(logRepository.saveLog).toHaveBeenCalledWith( log );

    })

    test('getLogs should call the datasource with arguments', () => {
        const spyLogRepository = jest.spyOn(logRepository, 'getLogs');

        logRepository.getLogs(LogSeverityLevel.low);

        expect(spyLogRepository).toHaveBeenCalledTimes(1);
        expect(logRepository.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);

    })
})