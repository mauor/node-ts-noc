import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendEmailOptions{
    to: string | string[] ;
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}
interface Attachment {   
    filename: string;
    path: string;
}

export class EmailService {
    private trasnporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_KEY_SECRET
        }
    });

    constructor(){}

    async sendEmail( options: SendEmailOptions ):Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options

        try{
            const sentInformation = await this.trasnporter.sendMail({
                to, 
                subject, 
                html: htmlBody,
                attachments
            })
            // const log = new LogEntity( {
            //     level: LogSeverityLevel.low,
            //     message: 'Email sent',
            //     origin: 'email.service.ts'
            // })
            // this.logRepository.saveLog( log );
            return true;
        }
        catch(error){
            // const log = new LogEntity({
            //     level: LogSeverityLevel.high,
            //     message: 'Email not send',
            //     origin: 'email.service.ts'
            // })
            // this.logRepository.saveLog(log);
            return false;
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs del servidor</h3>
            <p>Lorem ipsum dolor sit amet con la base</p>
            <p>ver logs del servidor adjuntos</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-low.log', path: './logs/logs-low.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
             { filename: 'logs-high.log', path: './logs/logs-high.log' }
        ];
        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }
}