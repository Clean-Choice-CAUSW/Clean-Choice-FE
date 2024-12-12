export interface SignUpRequest {
  loginId: string;
  password: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  isPregnant: boolean;
}

export interface SignInResponse {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  loginId: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  isPregnant: boolean;
}
