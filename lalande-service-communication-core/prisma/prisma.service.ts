import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    //const dbUrl = new URL(process.env.DATABASE_URL!);
    const adapter = new PrismaMariaDb({
      host: 'localhost',
      port: 3306,
      user: 'user_lalande_datastore_001_loc',
      password: 'Root12345',
      database: 'db_lalande_datastore_communication',
    });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexión exitosa a MySQL local con Prisma 7 Adapter.');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(
        'Error al conectar a la base de datos: ' + errorMessage,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
