import type { AnalyzeRequest, Market } from "@/@types/product";

const marketParser: Record<
  Exclude<Market, "ETC">,
  (url: string) => Promise<AnalyzeRequest>
> = {
  AMAZON: async (url) => {
    const html = await fetch(url).then((res) => res.text());
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const productName = doc.querySelector("#productTitle")?.textContent?.trim();
    if (!productName) {
      throw new Error("상품명을 찾을 수 없습니다.");
    }
    const imageUrl = doc.querySelector("#landingImage")?.getAttribute("src");
    if (!imageUrl) {
      throw new Error("이미지를 찾을 수 없습니다.");
    }
    const brandName = doc
      .querySelector(
        "#productOverview_feature_div > div > table > tbody > tr.a-spacing-small.po-brand > td.a-span9 > span",
      )
      ?.textContent?.trim();
    if (!brandName) {
      throw new Error("브랜드명을 찾을 수 없습니다.");
    }
    const priceWhole = doc
      .querySelector(
        "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center.aok-relative > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole",
      )
      ?.textContent?.trim();
    const priceFraction = doc
      .querySelector(
        "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center.aok-relative > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-fraction",
      )
      ?.textContent?.trim();
    if (!priceWhole) {
      throw new Error("가격을 찾을 수 없습니다.");
    }
    console.log(priceWhole, priceFraction);
    const price = Number(priceWhole + (priceFraction ? priceFraction : ""));
    // TODO : other than USD
    const priceUnit = "USD";

    return {
      url,
      productName,
      brandName,
      imageUrl,
      price,
      priceUnit,
    };
  },

  IHERB: async (url) => {
    const html = await fetch(url).then((res) => res.text());

    return {
      url,
      productName: "",
      brandName: "",
      imageUrl: "",
      price: 0,
      priceUnit: "",
    };
  },

  GNC: async (url) => {
    const html = await fetch(url).then((res) => res.text());

    return {
      url,
      productName: "",
      brandName: "",
      imageUrl: "",
      price: 0,
      priceUnit: "",
    };
  },
};

export default marketParser;
