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
    console.log(productName);
    if (!productName) {
      throw new Error("상품명을 찾을 수 없습니다.");
    }
    const imageUrl = doc.querySelector("#landingImage")?.getAttribute("src");
    if (!imageUrl) {
      throw new Error("이미지를 찾을 수 없습니다.");
    }

    const brandName =
      doc
        .querySelector(
          "#productOverview_feature_div > div > table > tbody > tr.a-spacing-small.po-brand > td.a-span9 > span",
        )
        ?.textContent?.trim() ||
      doc
        .querySelector(
          "#poExpander > div.a-expander-content.a-expander-partial-collapse-content > div > table > tbody > tr.a-spacing-small.po-brand > td.a-span9 > span",
        )
        ?.textContent?.trim() ||
      doc
        .querySelector(
          "#detailBullets_feature_div > ul > li:nth-child(5) > span > span:nth-child(2)",
        )
        ?.textContent?.trim() ||
      doc.querySelector("#sellerProfileTriggerId")?.textContent?.trim();

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

    const price = priceWhole
      ? Number(priceWhole + (priceFraction ? priceFraction : ""))
      : null;
    // TODO : other than USD
    const priceUnit = "USD";

    const imagesUl = doc.querySelector("#altImages > ul");
    const imageUrlList = imagesUl
      ? Array.from(imagesUl.querySelectorAll("img")).map(
          (img) => img.getAttribute("src") || "",
        )
      : undefined;
    if (!imageUrlList) {
      throw new Error("이미지 목록을 찾을 수 없습니다.");
    }

    const titlePriceBrandHtml =
      doc.querySelector("#centerCol")?.textContent?.trim() || "";
    const productDescription =
      doc
        .querySelector("#productDescription_feature_div")
        ?.textContent?.trim() || "";
    const productDetails =
      doc
        .querySelector("#detailBulletsWrapper_feature_div")
        ?.textContent?.trim() || "";
    const importantInfo =
      doc.querySelector("#important-information")?.textContent?.trim() || "";
    const infoHtml = (
      titlePriceBrandHtml +
      productDescription +
      productDetails +
      importantInfo
    )
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();

    return {
      url,
      productName,
      brandName,
      imageUrl,
      price,
      priceUnit,
      imageUrlList,
      html: infoHtml,
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
      imageUrlList: [],
      html: "",
    };
  },

  GNC: async (url) => {
    const html = await fetch(url).then((res) => res.text());
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const productName = doc
      .querySelector(
        "#product-content > section > div.product-detail-area-container.container > div.row.parent-row.prod-quick-view-container.product-redesign > div.product-image-container-redesign.col-lg-5 > div.pdp__product-details__product-title.d-none.d-lg-flex > h1",
      )
      ?.textContent?.trim();
    if (!productName) {
      throw new Error("상품명을 찾을 수 없습니다.");
    }
    const brandName = doc
      .querySelector(
        "#product-content > section > div.product-detail-area-container.container > div.row.parent-row.prod-quick-view-container.product-redesign > div.product-image-container-redesign.col-lg-5 > div.brand-item-wrapper.pdp-redesign.d-sm-none.d-lg-block > div > a",
      )
      ?.textContent?.trim();
    if (!brandName) {
      throw new Error("브랜드명을 찾을 수 없습니다.");
    }
    let price: number | null = Number(
      doc
        .querySelector(
          "#product-content > section > div.product-detail-area-container.container > div.row.parent-row.prod-quick-view-container.product-redesign > div.col-lg-7.pdp__product-details.product-detail.test3.col-xs-12 > div.sale-content.d-none.d-lg-flex > div > div.pdp__product-details__product-price-wrap.d-flex.align-items-center > span",
        )
        ?.getAttribute("content")
        ?.trim(),
    );
    if (Number.isNaN(price)) {
      price = null;
    }
    const priceUnit = "USD";

    const imageListDiv = doc.querySelector("#thumbnails > div");
    const imageUrlList = imageListDiv
      ? Array.from(imageListDiv.querySelectorAll("a")).map(
          (img) => img.getAttribute("preview-src") || "",
        )
      : undefined;
    if (!imageUrlList) {
      throw new Error("이미지 목록을 찾을 수 없습니다.");
    }
    const imageUrl = imageUrlList[0];
    if (!imageUrl) {
      throw new Error("gnc 이미지를 찾을 수 없습니다.");
    }

    const details =
      doc.querySelector("#productDetailsTab > div")?.textContent?.trim() || "";
    const ingredients = doc
      .querySelector("#productNutritionTab > div")
      ?.textContent?.trim();
    const usage = doc
      .querySelector("#productHowToUseTab > div")
      ?.textContent?.trim();

    const productDetailsHtml = (details + ingredients + usage)
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();

    return {
      url,
      productName,
      brandName,
      imageUrl,
      price,
      priceUnit,
      imageUrlList: imageUrlList || [imageUrl],
      html: productDetailsHtml,
    };
  },
};

export default marketParser;
