import type { SignInResponse, SignUpRequest } from "@/@types/auth";
import myAxios from "./myAxios";

export const signUp = async (request: SignUpRequest) => {
  const res = await myAxios.post("/member/sign-up", request);

  if (res.status === 201) {
    return res.data;
  }

  throw new Error("Failed to register");
};

export const signIn = async (loginId: string, password: string) => {
  try {
    const res = await myAxios.post("/member/sign-in", { loginId, password });

    if (res.status === 200) {
      const data = res.data as SignInResponse;
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }

  throw new Error("Failed to login");
};
