import type { SignUpRequest } from "@/@types/auth";
import { PageState } from "@/@types/page";
import { signUp } from "@/services/auth";
import { usePageState } from "@/store/pageStateStore";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { setPageState } = usePageState();

  const { register, handleSubmit } = useForm<SignUpRequest>({
    mode: "onSubmit",
    defaultValues: {
      loginId: "",
      password: "",
      name: "",
      age: 20,
      gender: "MALE",
      isPregnant: false,
    },
  });

  const onRegister = async (data: SignUpRequest) => {
    try {
      const res = await signUp(data);
      if (res) {
        alert("회원가입이 완료되었습니다.");
        setPageState(PageState.LOGIN);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <form
        className="flex w-[400px] flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
        onSubmit={handleSubmit(onRegister)}
      >
        <h1 className="text-2xl font-bold text-blue-600">회원가입</h1>

        <div className="flex flex-col gap-2">
          <input
            type="loginId"
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
          <input
            type="text"
            placeholder="이름"
            className="w-full rounded border border-slate-200 p-2 text-sm"
            {...register("name", { required: true })}
          />
          <input
            type="number"
            placeholder="나이"
            className="w-full rounded border border-slate-200 p-2 text-sm"
            {...register("age", { required: true })}
          />
          <div className="flex gap-2">
            남성
            <input
              type="radio"
              className="mr-2 rounded border border-slate-200 p-2 text-sm"
              value="MALE"
              {...register("gender", { required: true })}
            />{" "}
            여성
            <input
              type="radio"
              className="rounded border border-slate-200 p-2 text-sm"
              value="FEMALE"
              {...register("gender", { required: true })}
            />{" "}
          </div>

          <div className="flex gap-2">
            임신 여부
            <input
              type="checkbox"
              className="rounded border border-slate-200 p-2 text-sm"
              {...register("isPregnant")}
            />{" "}
          </div>
        </div>

        <button
          className="w-full rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
