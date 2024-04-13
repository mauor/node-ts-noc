import { EmailService } from './../../../src/presentation/email/email.service';
import { SendEmailOptions } from './../../../src/presentation/email/email.service';
import nodemailer from 'nodemailer';


describe('EmailService', () => {

    const mockSendMail = jest.fn();

    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailSevice = new EmailService();


    test('should send email', async () => {


        const options: SendEmailOptions = {
            to: 'fernando@google.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        };

        await emailSevice.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "fernando@google.com",
        });

    });

    test('should send email with attachements', async () => {

        const email = 'fernando@google.com';
        await emailSevice.sendEmailWithFileSystemLogs(email);


        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-low.log', path: './logs/logs-low.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });



    });


});