import { MultipleCheckService } from './../../../../src/domain/use-cases/checks/multiple-check-services';
import { LogEntity } from '../../../../src/domain/entities/log.entity';

describe('domain/use-cases/checks/multiple-ckeck-services.ts', () => {

    const firsMockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const secondMockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new MultipleCheckService(
        [firsMockRepository, secondMockRepository],
        successCallback,
        errorCallback,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://google.com/uysdhcbaud/udsh');

        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
    })

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(firsMockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(secondMockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })

})