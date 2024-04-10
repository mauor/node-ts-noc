import { EmailService } from './email/email.service';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { SendEmailLogs } from '../domain/use-cases/email/send-logs-email';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
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
        //             fileSystemLogRepository,
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

    }
}
