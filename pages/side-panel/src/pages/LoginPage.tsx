import { PageState } from "@/@types/page";
import { signIn } from "@/services/auth";
import { usePageState } from "@/store/pageStateStore";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm } from "react-hook-form";

interface LoginForm {
  loginId: string;
  password: string;
}

export default function LoginPage() {
  const { setPageState } = usePageState();
  const tokenSignIn = useSignIn();
  const { register, handleSubmit } = useForm<LoginForm>({
    mode: "onSubmit",
    defaultValues: {
      loginId: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginForm) => {
    const { loginId, password } = data;
    const res = await signIn(loginId, password);
    if (!res) {
      alert("회원 정보가 일치하지 않습니다.");
      return;
    }
    if (
      tokenSignIn({
        auth: {
          token: res.accessToken,
          type: "Bearer",
        },
        // refresh: res.refreshToken,
      })
    ) {
      setPageState(PageState.ANALYSIS);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <form
        className="flex w-[400px] flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-2xl font-bold text-blue-600">로그인</h1>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="아이디"
            className="w-full rounded border border-slate-200 p-2 text-sm"
            {...register("loginId", { required: true })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full rounded border border-slate-200 p-2 text-sm"
            {...register("password", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-700"
        >
          시작하기
        </button>
        <button
          type="button"
          onClick={() => setPageState(PageState.REGISTER)}
          className="w-full text-sm text-slate-500"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
