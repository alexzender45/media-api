"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_errors_1 = require("./app.errors");
const app_module_1 = require("./app.module");
const configs_1 = require("./configs");
class Server {
    static async start() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        Server.mountMiddlewares(app);
        Server.swaggerSetup(app);
        await app.listen(configs_1.EnvironmentService.getValue('PORT'));
        await app.startAllMicroservices();
    }
    static swaggerSetup(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Teesas Service APIs')
            .setDescription('The Teesas Service API Documentation')
            .setVersion('1.0')
            .addTag('teesas-service', 'Teesas Service APIs')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
    static mountMiddlewares(app) {
        app.useGlobalFilters(new app_errors_1.AllExceptionsFilter());
        app.useGlobalPipes(new common_1.ValidationPipe());
    }
}
Server.env = configs_1.EnvironmentService.getAll();
Server.start().then();
//# sourceMappingURL=main.js.map