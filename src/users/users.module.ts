import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthsModule } from 'src/auths/auths.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIndividualEntity } from './entities/user.IndividualEntity';
import { UserOrganizationEntity } from './entities/user.OrganizationEntity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/auths/passport-strategy/access-token.strategy';
import { EventEntity } from 'src/events/entities/event.entity';
import { TicketEntity } from 'src/tickets/entities/ticket.entity';
import { paymentEntity } from './Payment/payment-entity';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, AccessTokenStrategy],
  imports: [ forwardRef(() => AuthsModule),
    TypeOrmModule.forFeature([UserIndividualEntity, UserOrganizationEntity, EventEntity, TicketEntity, paymentEntity]),  JwtModule.register({})]
})
export class UsersModule {}
