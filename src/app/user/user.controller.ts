import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiAcceptedResponse, ApiParam } from '@nestjs/swagger';
import { UserResponseDto } from '@user/dto';

@Controller({
  path: 'user'
})
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get(':id')
  @ApiAcceptedResponse({
    status: HttpStatus.OK,
    type: () => UserResponseDto,
    description: 'Full data of a user record'
  })
  @ApiParam({
    name: 'id',
    type: () => String,
    description: 'id of user u want to find'
  })
  @HttpCode(HttpStatus.OK)
  public getUser(@Param('id') id: string) {
    return this.userService.getDetail(id);
  }
}
