import { useForm } from "react-hook-form";

interface ICustomForm {
  gender: "MALE" | "FEMALE";
  age: number;
  isPregnant: boolean;
}

export default function CustomForm() {
  const { register } = useForm<ICustomForm>({
    mode: "onChange",
  });
  return <></>;
}
