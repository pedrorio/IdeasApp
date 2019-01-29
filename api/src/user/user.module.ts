import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { IdeaEntity } from "../idea/idea.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity])],
  controllers: [UserController],
  providers: [
    UserService
  ]
})
export class UserModule {}
