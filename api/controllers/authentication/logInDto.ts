interface LogInDto {
  email: string;
  password: string;
}

export const getLoginDto = (l: any) => {
  const { password, email } = l.dataValues;

  const loginUser: LogInDto = {
    password,
    email,
  };

  return loginUser;
};

export default LogInDto;
