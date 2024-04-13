import { EmailService } from './email/email.service';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { SendEmailLogs } from '../domain/use-cases/email/send-logs-email';
import { MongoLogDatasource } from '../infraestructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infraestructure/datasources/postgres-log.datasource';
import { MultipleCheckService } from '../domain/use-cases/checks/multiple-check-services';

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new MongoLogDatasource(),
    // new PostgresLogDatasource(),
)

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)

const emailService = new EmailService();

export class Server{
    static start(){
        console.log("Server started...");

        // CronService.CreateJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckService(
        //             LogRepository,
        //             () => console.log( `${url} is ok`),
        //             ( error ) => console.log(error)
        //         ).execute( url );
        //     }
        // );

        
        // emailService.sendEmail({
            //     to: 'mauiricioro158@gmail.com>',
            //     subject: 'Logs de sistema',
            //     htmlBody:`
            //         <h3>Logs de sistema</h3>
            //         <p>Lorem ipsum dolor sit amet con la base</p>    
            //     `,
            // })
            
            // emailService.sendEmailWithFileSystemLogs(
        //     ['mauiricioro158@gmail.com', 
        //     'mauorozcoo@gmail.com']
        // );
        
        // new SendEmailLogs(
            //     emailService,
            //     fileSystemLogRepository
            // ).execute(['mauiricioro158@gmail.com', 'mauorozcoo@gmail.com'])
            

            // CronService.CreateJob(
            //     '*/5 * * * * *',
            //     () => {
            //         const url = 'https://google.com';
            //         new MultipleCheckService(
            //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
            //             () => console.log(`${url} is ok`),
            //             (error) => console.log(error)
            //         ).execute(url);
            //     }
            // );
        }
    }
