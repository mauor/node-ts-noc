import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server{
    static start(){
        console.log("Server started...");

        CronService.CreateJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    () => console.log( `${url} is ok`),
                    ( error ) => console.log(error)
                ).execute( url );
            }
        );

    }
}
