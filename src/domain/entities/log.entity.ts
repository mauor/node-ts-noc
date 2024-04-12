export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions{
    level: LogSeverityLevel;
    message: string;
    origin: string;
    date?: Date;
}

export class LogEntity{
    public level: string;
    public message: string;
    public date: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, date = new Date(), origin } = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.date = date;
    }

    static fromJson = ( json: string ):LogEntity => {
        json = ( json === '') ? '{}': json;
        const { message, level,  date, origin } = JSON.parse( json );
        const log = new LogEntity({
            level,
            message,
            date: new Date(date),
            origin,
        });
        return log;
    }

    static fromObject = ( object: { [ key: string ]: any } ):LogEntity => {
        const { message, level, date, origin } = object;
        const log = new LogEntity({
            message,
            level,
            date,
            origin
        });
        return log;
    }
}