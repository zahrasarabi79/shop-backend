import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isproduction = configService.get('NODE_ENV') === 'production';
        return {
          pinoHttp: {
            transport: isproduction
              ? undefined
              : { target: 'pino-pretty', options: { singleLine: false } },
            level: isproduction ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }), 
    //ConfigModule for use .env global //use config pakage of nest
    ConfigModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
