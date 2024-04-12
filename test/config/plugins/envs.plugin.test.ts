import { envs } from "../../../src/config/plugins/envs.plugin";

describe('config/plugins/envs.plugint.ts', () => {

    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'mauricioro158@gmail.com',
            MAILER_KEY_SECRET: 'stjwboqwjzwcongv',
            PROD: false,
            MONGO_URL: 'mongodb://mauricio:12345678@localhost:27017/',
            MONGO_DB_NAME: 'noc-test',
            MONGO_USER: 'mauricio',
            MONGO_PASSWORD: '12345678',
            POSTGRES_URL: "postgresql://postgres:12345678@localhost:5433/noc-test",
            POSTGRES_USER: 'postgres',
            POSTGRES_PASSWORD: "12345678",
            POSTGRES_DB: 'noc-test'
        });
    })

    test('should return error if not fouund env', async () => {
        jest.resetModules();
        process.env.PORT = "ABC";

        try {
            await import('./../../../src/config/plugins/envs.plugin');
            expect(true).toBe(false);
        }
        catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })

})