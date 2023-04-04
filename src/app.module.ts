import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIndividualEntity,  } from './users/entities/user.IndividualEntity';
import { UserOrganizationEntity } from './users/entities/user.OrganizationEntity';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './auths/passport-strategy/access-token.strategy';
import { EventEntity } from './events/entities/event.entity';
import { TicketEntity } from './tickets/entities/ticket.entity';
import { paymentEntity } from './users/Payment/payment-entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'event',
      entities: [UserIndividualEntity, UserOrganizationEntity, EventEntity, TicketEntity, paymentEntity],
      synchronize: false,
    }),
    
    TypeOrmModule.forFeature([UserIndividualEntity, UserOrganizationEntity, EventEntity, TicketEntity, paymentEntity]),
    
    EventsModule, TicketsModule, UsersModule, AuthsModule, ],
  controllers: [AppController],
  providers: [AppService, AccessTokenStrategy],
})
export class AppModule {}
