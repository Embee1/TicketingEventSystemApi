import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport'
import { ConfigService } from "@nestjs/config";

interface JwtPayload{
    sub: string;
    role:string;
}


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService){
         super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
         });
    }

    validate(payload: JwtPayload){
return payload;
    }
}