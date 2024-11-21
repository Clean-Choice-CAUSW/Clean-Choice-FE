interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <div className="flex w-[400px] flex-col gap-4 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600">로그인</h1>

        <div className="flex flex-col gap-2">
          <input type="email" placeholder="Email" className="w-full rounded border border-slate-200 p-2 text-sm" />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded border border-slate-200 p-2 text-sm"
          />
        </div>

        <button
          onClick={() => onLogin('', '')}
          className="w-full rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-700">
          시작하기
        </button>
        <button onClick={() => onLogin('', '')} className="w-full text-sm text-slate-500">
          회원가입
        </button>
      </div>
    </div>
  );
}
