import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
@IsString()
@IsNotEmpty()
description: string;

@IsString()
@IsNotEmpty()
location: string;

@IsString()
@IsNotEmpty()
location_tip: string;

@IsString()
@IsNotEmpty()
event_type: string;

@IsString()
@IsNotEmpty()
virtual_meet_link: string

@IsString()
@IsNotEmpty()
category: string

@IsString()
@IsNotEmpty()
custom_url: string;

@IsString()
@IsNotEmpty()
frequency: string


// start_date
// start_time
// end_date
// end_time
// twitter_url
// facebook_url
// created_at
// update_at

}

