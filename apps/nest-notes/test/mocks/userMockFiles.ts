import {
  UserCreateInputDto,
  UserViewDto,
} from '../../src/features/users/api/user-api-dto';

export const mockUserData = {
  userInputCreateData(number: number): UserCreateInputDto {
    return {
      userName: `newUser${number}`,
      email: `user${number}mail@some.xxx`,
    };
  },

  userViewData(number: number): UserViewDto {
    return {
      id: expect.any(String),
      userName: `newUser${number}`,
      email: `user${number}mail@some.xxx`,
    };
  },
};
