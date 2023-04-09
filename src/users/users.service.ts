import { HttpException, Injectable } from '@nestjs/common';
import { CreateIndividualUserDto } from './dto/create-IndividualUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserIndividualEntity, acct_type } from './entities/user.IndividualEntity';
import { UserOrganizationEntity } from './entities/user.OrganizationEntity';
import { Repository } from 'typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';
import {hash, compare} from 'bcrypt'
import { CreateOrganizationUserDto } from './dto/create-OrganizationUder.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaymentEntity, } from './Payment/payment-entity';
import { LoginUserEntity } from './entities/login-userEntity';
import * as bcrypt from 'bcrypt'
import { error, log } from 'console';
import { encryptData, decryptData} from './utils/encrypt';
import { PaymentDto } from './Payment/payment.dto';


// import { PaymentDto } from './Payment/payment.dto';
// import { createCipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';



export interface JWTToken {
  token: string;
  refreshToken: string;
}

export enum UserRole{
  USER = 'user',
  ADMIN = 'admin'
}

@Injectable()
export class UsersService {

constructor(
  @InjectRepository(UserIndividualEntity, ) private userRepository: Repository<UserIndividualEntity>,

  @InjectRepository(UserOrganizationEntity,) private userRepo: Repository<UserOrganizationEntity>,

  @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,

  @InjectRepository(LoginUserEntity) private loginRepo: Repository<LoginUserEntity>,

  private readonly jwtService: JwtService,

   private readonly configService: ConfigService,
){}

// register for individualUser
 async create(registerDto: CreateIndividualUserDto) {
    // return 'This action adds a new user';
    const existingUser = await this.userRepository.findOne({
      where: {
        email: registerDto.email
      }
    });
    // if(!existingUser){
    //   throw new HttpException('Email already registered!', 400);
    // }

    const protectedPassword = await this.hashPassword(registerDto.password)

    return await this.userRepository.save({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      // role: userRole.USER,
      acct_type: acct_type.INDIVIDUAL,
      password: protectedPassword,
      country: registerDto.country
     });
  }


  

// register for organizationUser

async registerr(register: CreateOrganizationUserDto) {
  // return 'This action adds a new user';
  const existingUser = await this.userRepo.find({
    where: {
      email: register.email
    }
  });
  // if(!existingUser){
  //   throw new HttpException('Email already registered!', 400);
  // }

   const protectedPassword = await this.hashPassword(register.password)

  return await this.userRepo.save({
    businessName: register.businessName,
   email: register.email,
   acct_type: acct_type.ORGANIZATION,
   password: register.password,
    country: register.country
   });

  
}

// Login user individual
  async login(loginUserDto: LoginUserDto): Promise<JWTToken>{
    const { email, password} = loginUserDto;

    const user = await this.userRepository.findOneBy({email})

    if (!user){
      throw new HttpException('Invalid credentials!', 400)
    }

    const validPassword = await compare(password, user.password);

    // if(validPassword){
    //   throw new HttpException('invalid credentials', 400);
    // }
    return this.getTokens(user);
  }

// Login user Organization

  async loginOrganization(loginUserDto: LoginUserDto): Promise<JWTToken>{
    const { email, password} = loginUserDto;

    const user = await this.userRepo.findOneBy({email});

    if (!user){
      throw new HttpException('Invalid credentials!', 400)
    }

    const validPassword = await compare(password, user.password);

    if(validPassword){
      throw new HttpException('invalid credentials', 400);
    }
    return this.getTokens(user);
  }

// find all individual user
  async findAll():Promise<UserIndividualEntity[]> {
    return this.userRepository.find()
  }

  // find all organization user
  async findAllO():Promise<UserOrganizationEntity[]> {
    return this.userRepo.find()
  }


  // find one individual user
  async findOne(id: number): Promise<UserIndividualEntity> {
    const ticket = await this.userRepository.findOne({
      where: {id}
    })

    return ticket;
  }

    // find one organization user
  async findOne2(id: number): Promise<UserOrganizationEntity> {
      const ticket = await this.userRepo.findOne({
        where: {id}
      })
  
      return ticket;
    }

// find update individual user by email
 async update(id: number, email: string): Promise<void> {
    await this.userRepository.update(id, {email})
  }

  // find update individual user by password

  async updatee(id: number, password: string): Promise<void> {
    await this.userRepository.update(id, {password})
  }
// find update Organization user by email

async updatee2(id: number, email: string): Promise<void> {
  await this.userRepo.update(id, {email})
}

// find update Organization user by password
async update2(id: number, password: string): Promise<void> {
  await this.userRepo.update(id, {password})
}
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }


  private hashPassword(password: string): Promise<string>{
    return hash(password, 10)
  }

  private async getTokens(UserIndividualEntity): Promise<JWTToken>{

    const [token, refreshToken] = await Promise.all([

    
    this.jwtService.signAsync({
      SUB: UserIndividualEntity.email, role: UserIndividualEntity.role
    },
    {secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
  expiresIn: this.configService.get<string>(
    'JWT_ACCESS_TOKEN_EXPIRATION'
    ),
  }
    ),

    this.jwtService.signAsync({
      SUB: UserIndividualEntity.email, role: UserIndividualEntity.role
    },
    {secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
  expiresIn: this.configService.get<string>(
    'JWT_REFRESH_TOKEN_EXPIRATION'
    ),
  }
    )
  ]);

  return {
    
    token,
    refreshToken
  }
}

//refreshToken User Individual
async refreshToken1(token: string): Promise<JWTToken>{
try{
  const {sub: email} =await this.jwtService.verifyAsync(token, {
    secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
  });
const user = await this.userRepository.findOneOrFail({
  where: {email}
})
return this.getTokens(user);

}catch(err){
  throw new HttpException('invalid credentials', 400);
}
  
}

//refreshToken User organization
async refreshToken2(token: string): Promise<JWTToken>{
  try{
    const {sub: email} =await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
    });
  const user = await this.userRepository.findOneOrFail({
    where: {email}
  })
  return this.getTokens(user);
  
  }catch(err){
    throw new HttpException('invalid credentials', 400);
  }
    
  }

   //get payment details
  async findAllPayment():Promise<PaymentEntity[]> {
    return this.paymentRepository.find()
  }

async createToken(id: number): Promise<PaymentEntity>{

  const token = Math.random().toString(20).substr(2, 20)


  const forgot = await this.paymentRepository.create({
    id,
    token
  });

return forgot

}



async loginUser(email: string, password: string): Promise<string>{
const user = await this.loginRepo.findOneBy({email});
if(user){
  const match = await bcrypt.compare(password, user.password);
if(match) return 'Credentials are correct!';
return 'invalid credentials!';
}
return 'invalid Invalid!';
}

async sendMessage(token:string): Promise<object>{
const encrypedMessage = encryptData(token);
const decryptedMessage = decryptData(encrypedMessage);

return {
  'Encrypted Message': encrypedMessage.toString(),
'Decrypted Message': decryptedMessage.toString(),
}
}
  };

  

