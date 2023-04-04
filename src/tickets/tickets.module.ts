import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIndividualEntity } from 'src/users/entities/user.IndividualEntity';
import { UserOrganizationEntity } from 'src/users/entities/user.OrganizationEntity';
import { EventEntity } from 'src/events/entities/event.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/auths/passport-strategy/access-token.strategy';
import { TicketEntity } from './entities/ticket.entity';
import { paymentEntity } from 'src/users/Payment/payment-entity';

@Module({
  exports: [TicketsService],
  controllers: [TicketsController],
  providers: [TicketsService, AccessTokenStrategy],
imports: [TypeOrmModule.forFeature([UserIndividualEntity, UserOrganizationEntity, EventEntity, TicketEntity, paymentEntity]),  JwtModule.register({})]
  
})
export class TicketsModule {}
