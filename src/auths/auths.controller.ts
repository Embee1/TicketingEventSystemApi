import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateIndividualUserDto } from 'src/users/dto/create-IndividualUser.dto';
import { CreateOrganizationUserDto } from 'src/users/dto/create-OrganizationUder.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenDto } from 'src/users/refresh-token.dto';
import { AccessTokenGuard } from './guard/access-token-strategy';


@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService,
     private readonly userService: UsersService
    ) {}

  // register for individualUser
  @Post('register')
  create(@Body() registerDto: CreateIndividualUserDto) {
    return this.userService.create(registerDto);
  }

  // register for organizationUser
  @Post('registerr')
  registerr(@Body() register:CreateOrganizationUserDto) {
    return  this.userService.registerr(register);
  } 

//login user individual
// @UseGuards(AccessTokenGuard)
@Post('login')
async login(@Body() loginUserDto: LoginUserDto){
  return await this.userService.login
  (loginUserDto)
}

//login user organization
@Post('loginn')
async loginOrganization(@Body() loginUserDto: LoginUserDto){
  return await this.userService.loginOrganization
  (loginUserDto)
}

//refreshToken User Individual
@Post('refreshToken')
async refreshToken1(@Body() {refreshToken}: RefreshTokenDto){
  return await this.userService.refreshToken1(refreshToken)
}

//refreshToken User organization
@Post('refreshToken')
async refreshToken2(@Body() {refreshToken}: RefreshTokenDto){
  return await this.userService.refreshToken2(refreshToken)
}


// @Patch(':id')
//   async updateEmail(
//     @Param('id') id: number,
//     // @Param('email') email: string, 
//     @Body() updateAuthDto: UpdateAuthDto,
//     @Request() req
//   ) {
// const {sub} = req.user;
// return await this.userService.update(id,  updateAuthDto, sub)

//   }

// find update individual user by email
@Patch(':id')
 async update(@Body('id') id: number, @Body() email: string) {
    return this.userService.update(id, email);
}

// find update individual user by password
@Patch(':id')
 async updatee(@Body('id') id: number, @Body() password: string) {
    return this.userService.update(id, password);
}


// find update Organization user by email
@Patch(':id')
 async updatee2(@Body('id') id: number, @Body() email: string) {
    return this.userService.update(id, email);
}

// find update Organization user by password
@Patch(':id')
 async update2(@Body('id') id: number, @Body() password: string) {
    return this.userService.update(id, password);
}

// find all individual user
  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  // find all organization user
  @Get('all')
  async findAllO() {
    return this.userService.findAll();
  }

   // find one individual user
  @Get(':id')
  async findOne(@Body('id') id: number) {
    return this.userService.findOne(id);
  }

    // find one organization user
    @Get(':id')
  async findOne2(@Body('id') id: number) {
    return this.userService.findOne(id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authsService.remove(+id);
  }

  // @Post('refreshToken')
  // refreshToken(@Body() {refreshToken}: RefreshToken){
  //   return await this.authsService.refreshTokens(refreshToken)
  // }
}
