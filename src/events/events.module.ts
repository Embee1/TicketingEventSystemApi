import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIndividualEntity } from 'src/users/entities/user.IndividualEntity';
import { UserOrganizationEntity } from 'src/users/entities/user.OrganizationEntity';
import { JwtModule } from '@nestjs/jwt';
import { EventEntity } from './entities/event.entity';
import { PaymentEntity} from 'src/users/Payment/payment-entity';
import { LoginUserEntity } from 'src/users/entities/login-userEntity';

@Module({
  exports: [EventsService],
  imports: [TypeOrmModule.forFeature([UserIndividualEntity, UserOrganizationEntity, EventEntity, PaymentEntity, LoginUserEntity]),  JwtModule.register({})],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
