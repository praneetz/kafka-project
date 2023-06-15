import { IsString } from "class-validator";

export class CreateJoineeDto {
    @IsString()
    email: string

    @IsString()
    username: string

    @IsString()
    event: string
}
