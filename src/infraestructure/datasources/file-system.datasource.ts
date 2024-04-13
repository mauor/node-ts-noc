import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs/logs-low.log";
    private readonly mediumLogsPath = "logs/logs-medium.log";
    private readonly highLogsPath = "logs/logs-high.log";

    constructor(){
        this.createLogsFile();
    }
    private createLogsFile(){
        
        if ( !fs.existsSync( this.logPath )){
            fs.mkdirSync( this.logPath )
        }
        [
            this.logPath,
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if ( fs.existsSync( path )) return;
            
            fs.writeFileSync( path, '' )
        })

    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(log)}\n`;

        fs.appendFileSync( this.allLogsPath, logAsJson );

        if( log.level === LogSeverityLevel.low ) return;
        
        if( log.level === LogSeverityLevel.medium )
            fs.appendFileSync( this.mediumLogsPath , logAsJson);
        if( log.level === LogSeverityLevel.high )
            fs.appendFileSync( this.highLogsPath , logAsJson);
    }
    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        switch( severity  ){
            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.allLogsPath );

            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );

            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath );

            default:
                throw new Error('Not implemented');

        }
    }

    private getLogsFromFile = ( path:string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf8' );
        if (content === '') return [];
        const  logs = content.split('\n').map( 
            log => LogEntity.fromJson(log)
        );
        return logs;
    }

}