import type {
  IngredientResponseDto,
  IntakeResponseDto,
} from "@/@types/product";
import myAxios from "./myAxios";

export const searchIngredientWithId = async (
  id: number,
  authHeader: string,
) => {
  try {
    const res = await myAxios.get("/ingredient/search/name", {
      headers: {
        Authorization: authHeader,
      },
      params: {
        name,
      },
    });
    if (res.status === 200) return res.data as IngredientResponseDto;
  } catch (error: any) {
    throw new Error(error.message);
  }
  return null;
};

export const searchIngredientWithExactName = async (
  name: string,
  authHeader: string,
) => {
  try {
    const res = await myAxios.get("/ingredient/search/name", {
      headers: {
        Authorization: authHeader,
      },
      params: {
        name,
      },
    });
    if (res.status === 200) return res.data as IngredientResponseDto;
  } catch (error: any) {
    throw new Error(error.message);
  }
  return null;
};

export const searchIngredientWithPart = async (
  name: string,
  authHeader: string,
) => {
  try {
    const res = await myAxios.post(
      "/ingredient/search/name/part",
      { name },
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    if (res.status === 200) return res.data as IngredientResponseDto[];
  } catch (error: any) {
    throw new Error(error.message);
  }
  return null;
};

export const getUserIntake = async (authHeader: string) => {
  try {
    const res = await myAxios.get("/intake-ingredient/all", {
      headers: {
        Authorization: authHeader,
      },
    });
    if (res.status === 200) return res.data as IntakeResponseDto;
  } catch (error: any) {
    throw new Error(error.message);
  }
  return null;
};

export const addUserIntake = async (
  ingredientId: number,
  authHeader: string,
) => {
  try {
    const res = await myAxios.post(
      "/intake-ingredient/create",
      {
        ingredientId,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    if (res.status === 201) return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
  return false;
};

export const deleteUserIntake = async (
  intakeId: number,
  authHeader: string,
) => {
  try {
    const res = await myAxios.delete(`/intake-ingredient/${intakeId}`, {
      headers: {
        Authorization: authHeader,
      },
    });
    if (res.status === 200) return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
  return false;
};

export const getAdvice = async (
  age: number,
  gender: "MALE" | "FEMALE",
  isPregnant: boolean,
  intakeIngredientListString: string[],
  productMarketId: number,
  authHeader: string,
) => {
  try {
    const res = await myAxios.post(
      "/member/advice",
      {
        isCurrentMember: false,
        age,
        gender,
        isPregnant,
        intakeIngredientListString,
        question: "",
        productMarketId,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );
    if (res.status === 200) return res.data as string;
  } catch (error: any) {
    throw new Error(error.message);
  }
  return null;
};
