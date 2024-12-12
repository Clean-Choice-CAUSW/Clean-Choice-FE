import type { ProductResponseDto } from "../../@types/product";
export default function ProductTable({
  productResponseDto,
}: {
  productResponseDto: ProductResponseDto;
}) {
  const {
    name,
    koreanProductType,
    koreanOtherIngredients,
    koreanSuggestedUse,
    koreanNetContent,
    servingSize,
    brandName,
    madeInCountry,
    koreanSupplementForm,
    productIngredientJoinResponseDtoList,
  } = productResponseDto;

  const ingredients = productIngredientJoinResponseDtoList
    .map((i) => {
      const aPerServing = Number.isNaN(Number(i.amountPerServing))
        ? Number(i.amountPerServing.replace(i.amountPerServingUnit, ""))
        : Number(i.amountPerServing);

      return (
        i.ingredientResponseDto.englishName +
        " " +
        aPerServing +
        i.amountPerServingUnit
      );
    })
    .join("\n");

  return (
    <div className="rounded-md border border-gray-300">
      <table className="table">
        <colgroup>
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>제품 명</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>상품 대분류</td>
            <td>{koreanProductType}</td>
          </tr>
          <tr>
            <td>섭취 형태</td>
            <td>{koreanSupplementForm}</td>
          </tr>
          <tr>
            <td>유효 성분 (1회당)</td>
            <td>{ingredients}</td>
          </tr>
          <tr>
            <td>이외 성분</td>
            <td>{koreanOtherIngredients}</td>
          </tr>
          <tr>
            <td>1회 복용 단위</td>
            <td>{servingSize}</td>
          </tr>
          <tr>
            <td>총량</td>
            <td>{koreanNetContent}</td>
          </tr>
          <tr>
            <td>권장 복용법</td>
            <td>{koreanSuggestedUse}</td>
          </tr>
          <tr>
            <td>제조국</td>
            <td>{madeInCountry}</td>
          </tr>
          <tr>
            <td>브랜드/제조사명</td>
            <td>{brandName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
