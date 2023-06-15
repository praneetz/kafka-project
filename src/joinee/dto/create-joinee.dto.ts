import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateJoineeDto {
    @ApiProperty({ description: ' email ', example: 'test@01@gmail.com' })
    @IsString()
    email: string

    @ApiProperty({ description: 'username', example: 'test' })
    @IsString()
    username: string

    @ApiProperty({ description: 'event', example: '1' })
    @IsString()
    event: string
}
