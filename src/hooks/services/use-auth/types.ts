export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};
