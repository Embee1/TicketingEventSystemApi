import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIndividualEntity } from 'src/users/entities/user.IndividualEntity';
import { UserOrganizationEntity } from 'src/users/entities/user.OrganizationEntity';
import { JwtModule } from '@nestjs/jwt';
import { EventEntity } from './entities/event.entity';
import { paymentEntity } from 'src/users/Payment/payment-entity';

@Module({
  exports: [EventsService],
  imports: [TypeOrmModule.forFeature([UserIndividualEntity, UserOrganizationEntity, EventEntity, paymentEntity]),  JwtModule.register({})],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
