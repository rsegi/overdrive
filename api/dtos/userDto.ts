export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const getUserDto = (u: any): UserDto => {
  const { id, firstName, lastName, email } = u.dataValues;

  return {
    id,
    firstName,
    lastName,
    email,
  };
};
