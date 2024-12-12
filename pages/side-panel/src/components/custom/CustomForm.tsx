/* eslint-disable react-hooks/rules-of-hooks */
import type { User } from "@/@types/auth";
import type {
  IngredientResponseDto,
  IntakeResponseDto,
  ProductMarketResponseDto,
} from "@/@types/product";
import {
  addUserIntake,
  deleteUserIntake,
  getAdvice,
  getUserIntake,
  searchIngredientWithPart,
} from "@/services/ingredient";
import userStore from "@/store/userStore";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "../ui/button";

const GenderSelect = ({
  value,
  onChange,
}: {
  value: "MALE" | "FEMALE";
  onChange: Dispatch<SetStateAction<User>>;
}) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value: "MALE" | "FEMALE") => {
        console.log(value);
        if (value === undefined) return;
        onChange((prev) => ({ ...prev, gender: value }));
      }}
      className="h-8 w-[88px] rounded-md bg-gray-300 p-1"
    >
      <ToggleGroupItem
        value="MALE"
        className={`${value === "MALE" ? "bg-white shadow-sm" : "bg-transparent"} h-full w-[40px] rounded-md`}
      >
        남성
      </ToggleGroupItem>
      <ToggleGroupItem
        value="FEMALE"
        className={`${value === "FEMALE" ? "bg-white shadow-sm" : "bg-transparent"} h-full w-[40px] rounded-md`}
      >
        여성
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const AgeInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: Dispatch<SetStateAction<User>>;
}) => {
  return (
    <>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const age = parseInt(e.target.value);
          if (isNaN(age)) return;
          onChange((prev) => ({ ...prev, age }));
        }}
        className="input input-sm input-bordered w-[50px]"
      />
      세
    </>
  );
};

const IsPregnantToggle = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: Dispatch<SetStateAction<User>>;
}) => {
  return (
    <div className="flex items-center gap-2">
      임신 여부
      <input
        type="checkbox"
        className="toggle toggle-success"
        checked={value}
        onChange={(e) => {
          onChange((prev) => ({ ...prev, isPregnant: e.target.checked }));
        }}
      />
    </div>
  );
};

export default function CustomForm({
  selectedProduct,
}: {
  selectedProduct: ProductMarketResponseDto | null;
}) {
  const { user } = userStore();
  if (!user) return null;
  const [currUser, setCurrUser] = useState<User>(user);
  const [searchIngredientName, setSearchIngredientName] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IngredientResponseDto[]>([]);
  const [searchResultLoading, setSearchResultLoading] =
    useState<boolean>(false);
  const [intakingList, setIntakingList] = useState<IntakeResponseDto>([]);
  const [advice, setAdvice] = useState<string>("");
  const authHeader = useAuthHeader();
  const [adviceLoading, setAdviceLoading] = useState<boolean>(false);

  if (!currUser || !authHeader) return null;

  useEffect(() => {
    if (searchIngredientName === "" || !searching) return;
    const fetchSearchResult = async () => {
      setSearchResultLoading(true);
      try {
        const res = await searchIngredientWithPart(
          searchIngredientName,
          authHeader,
        );
        if (res) setSearchResult(res);
      } finally {
        setSearchResultLoading(false);
      }
    };
    fetchSearchResult();
  }, [searchIngredientName, authHeader, searching]);

  const fetchIntaking = useCallback(async () => {
    const res = await getUserIntake(authHeader);
    if (res) setIntakingList(res);
  }, [authHeader]);

  const handleAdvice = async () => {
    if (!selectedProduct) {
      alert("제품을 선택해주세요.");
      return;
    }
    setAdviceLoading(true);
    try {
      const res = await getAdvice(
        currUser.age,
        currUser.gender,
        currUser.isPregnant,
        intakingList.map((i) => i.ingredientResponseDto.englishName),
        selectedProduct.productResponseDto.id,
        authHeader,
      );
      if (res) setAdvice(res);
    } finally {
      setAdviceLoading(false);
    }
  };

  useEffect(() => {
    fetchIntaking();
  }, [fetchIntaking]);

  return (
    <>
      <div className="flex flex-col gap-2 border-b border-gray-300 p-[13px]">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <GenderSelect value={currUser.gender} onChange={setCurrUser} />
            <AgeInput value={currUser.age} onChange={setCurrUser} />
          </div>
          <IsPregnantToggle
            value={currUser.isPregnant}
            onChange={setCurrUser}
          />
        </div>
        <div className="grid grid-cols-[220px_1fr] items-center gap-2">
          <p className="text-sm">현재 복용중인 약 / 영양성분이 있나요?</p>
          <div className="relative w-full">
            <input
              type="text"
              className="input input-sm input-bordered"
              value={searchIngredientName}
              placeholder="약 / 영양성분 검색"
              onChange={(e) => {
                setSearchIngredientName(e.target.value);
                setSearching(true);
              }}
              onFocus={() => setSearching(true)}
              onBlur={() => {
                setSearching(false);
              }}
            />
            {searching && (
              <div className="absolute top-[38px] flex min-h-5 w-full flex-col rounded-md border border-gray-300 bg-white shadow-md">
                {searchResultLoading && "검색 중..."}
                {!searchResultLoading &&
                  searchResult.map((r) => {
                    return (
                      <button
                        key={r.id}
                        className="w-full p-2 text-left"
                        onClick={async () => {
                          await addUserIntake(r.id, authHeader);
                          await fetchIntaking();
                        }}
                      >
                        {r.englishName}
                      </button>
                    );
                  })}
                {!searchResultLoading &&
                  searchResult.length === 0 &&
                  "검색 결과가 없습니다."}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[220px_1fr] items-end gap-3 pb-1">
          <div className="flex flex-col justify-start gap-2">
            <p>현재 복용중인 성분</p>
            <div className="min-h-[30px] rounded-md border border-gray-300">
              {intakingList.length === 0 && "복용중인 성분이 없습니다."}
              {intakingList.map((i) => {
                return (
                  <div
                    key={i.id}
                    className="flex items-center justify-between gap-2 p-2"
                  >
                    <p>{i.ingredientResponseDto.englishName}</p>
                    <button
                      className="size-[16px]"
                      onClick={async () => {
                        await deleteUserIntake(i.id, authHeader);
                        await fetchIntaking();
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            onClick={handleAdvice}
            className={adviceLoading ? "animate-pulse" : ""}
          >
            {adviceLoading ? "맞춤 조회중..." : "맞춤 조회하기"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] overflow-y-auto">
        <p className="text-lg">
          입력하신 정보를 바탕으로 주의 사항을 알려드려요
        </p>
        <p className="size-full rounded-md border border-gray-300">{advice}</p>
      </div>
    </>
  );
}
