import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from './../../../../src/domain/use-cases/email/send-logs-email';

describe('domain/use-cases/email/send-logs-email.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue( true )
    }
    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );

    beforeEach( () => {
        jest.clearAllMocks();
    })

    test('should call sendEmailand and saveLog', async() => {

        const result = await sendEmailLogs.execute('test@test.com');

        expect( result ).toBeTruthy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            date: expect.any( Date ),
            level: "low",
            message: "Email log sent",
            origin: "send-logs-email.ts",
        })
    })

    test('should log in case of error', async() => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('test@test.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            date: expect.any(Date),
            level: "high",
            message: "Error: Could not send email",
            origin: "send-logs-email.ts",
        })
    })

})