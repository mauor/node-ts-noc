import { CronService } from './../../../src/presentation/cron/cron-service';
describe('cron-service.ts', () => {
    
    const mockTickFunction = jest.fn();

    test('should create a job', (done) => {
        const job = CronService.CreateJob('* * * * * *', mockTickFunction );
        setTimeout(() => {
            expect( mockTickFunction ).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);
    })
})