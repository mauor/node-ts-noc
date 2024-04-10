import { PrismaClient } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient()

export class PostgresLogDatasource implements LogDatasource{

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}