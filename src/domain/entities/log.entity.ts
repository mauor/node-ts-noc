export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity{
    public level: string;
    public message: string;
    public date: Date;

    constructor(level: LogSeverityLevel, message: string){
        this.level = level;
        this.message = message;
        this.date = new Date();
    }

    static fromJson = ( json: string ):LogEntity => {
        const { message, level,  date } = JSON.parse( json );
        const log = new LogEntity(level, message);
        log.date = new Date( date );
        return log;
    }
}