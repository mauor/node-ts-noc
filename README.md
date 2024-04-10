# Proyecto MOC

El objetivo es cerar una serie de tares aplicando arquitectura limpia con Typescript

# dev
1. Clonar el archivo .env y renombrarlo a .env
2. Configurar las variables de de entorno

```
    PORT=
    MAILER_EMAIL=
    MAILER_KEY_SECRET=
    PROD=
```
3. Ejecutar ```npm i```
4. Levantar las bases de datos
    ```
        docker compose up -d
    ```
5. Ejecutar ```npm run dev```