import { FileSystemDatasource } from './../../../src/infraestructure/datasources/file-system.datasource';
import fs from 'fs';
import path from 'path';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('file-system.datasource', () => {

    const logPath = path.join(__dirname, '../../../logs');
    
    beforeEach(() => {
        fs.rmSync(logPath, {recursive: true, force: true});
    })

    test('should cerate logs files if they not exist', () => {
        new FileSystemDatasource();
        const file = fs.readdirSync(logPath);

        expect(file).toEqual(["logs-high.log", "logs-low.log", "logs-medium.log"]);
    });

    test('should save a log in logs-low.log', () => {
        const logDataSorce = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: "test log",
            origin: "file-system.datasource.ts",
        })
        logDataSorce.saveLog( log );
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, { encoding: 'utf8' });

        expect(allLogs).toContain( JSON.stringify(log) );
    });

    test('should save a log in logs-medium.log', () => {
        const logDataSorce = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: "test log",
            origin: "file-system.datasource.ts",
        })
        logDataSorce.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, { encoding: 'utf8' });
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, { encoding: 'utf8' });

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-high.log', () => {
        const logDataSorce = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: "test log",
            origin: "file-system.datasource.ts",
        })
        logDataSorce.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, { encoding: 'utf8' });
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, { encoding: 'utf8' });

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs in logs-low.log', async() => {
        const logDataSorce = new FileSystemDatasource();
        const lowLog = new LogEntity({
            level: LogSeverityLevel.low,
            message: "test log",
            origin: "file-system.datasource.ts",
        })
        const mediumLog = new LogEntity({
            level: LogSeverityLevel.medium,
            message: "test log",
            origin: "file-system.datasource.ts",
        })
        const highLog = new LogEntity({
            level: LogSeverityLevel.high,
            message: "test log",
            origin: "file-system.datasource.ts",
        })
        await logDataSorce.saveLog(lowLog);
        await logDataSorce.saveLog(mediumLog);
        await logDataSorce.saveLog(highLog);

        const logsLow = await logDataSorce.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSorce.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSorce.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining( [lowLog, mediumLog, highLog]));
        expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]));
        expect(logsHigh).toEqual(expect.arrayContaining([highLog]));
        
    });

    test('should not throw an error if path exist', () => {
        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy();
    })

    test('should throw an error if severity level is not defined', async () => {
        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'ULTRA' as LogSeverityLevel;

        try{
            await logDatasource.getLogs( customSeverityLevel );
            expect(true).toBe(false)
        }
        catch(error){
            const errorString = `${error}`;
            expect(errorString).toContain("Error: Not implemented");
        }
    });

});