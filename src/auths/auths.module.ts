import { Module, forwardRef } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganizationEntity } from 'src/users/entities/user.OrganizationEntity';
import { UserIndividualEntity } from 'src/users/entities/user.IndividualEntity';

import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './passport-strategy/access-token.strategy';
import { EventEntity } from 'src/events/entities/event.entity';
import { TicketEntity } from 'src/tickets/entities/ticket.entity';
import { paymentEntity } from 'src/users/Payment/payment-entity';

@Module({
  exports: [AuthsService],
  controllers: [AuthsController],
  providers: [AuthsService, AccessTokenStrategy, ],
  imports: [forwardRef(() => UsersModule),
  
    TypeOrmModule.forFeature([UserIndividualEntity, UserOrganizationEntity, EventEntity, TicketEntity, paymentEntity]),
  JwtModule.register({})
  
  ]
})
export class AuthsModule {}
