import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRespository } from './prisma/repositories/PrismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRespository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
