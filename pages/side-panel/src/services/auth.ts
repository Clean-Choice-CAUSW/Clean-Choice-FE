import type { SignInResponse, SignUpRequest, User } from "@/@types/auth";
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
  } catch (error: any) {
    alert(error.message);
  }

  throw new Error("Failed to login");
};

export const fetchMe = async (authHeader: string) => {
  try {
    const res = await myAxios.get("/member/me", {
      headers: {
        Authorization: authHeader,
      },
    });

    if (res.status === 200) {
      return res.data as User;
    }
  } catch (error: any) {
    alert(error.message);
  }
  return null;
};
