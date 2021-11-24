export interface UserDto {
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const getUserDto = (u: any): UserDto => {
  const { id, firstname, lastname, email } = u.dataValues;

  return {
    user_id: id,
    firstname: firstname,
    lastname: lastname,
    email,
  };
};
