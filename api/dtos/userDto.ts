export interface UserDto {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const getUserDto = (u: any): UserDto => {
  const { id, firstName, lastName, email } = u.dataValues;

  return {
    user_id: id,
    firstName,
    lastName,
    email,
  };
};
