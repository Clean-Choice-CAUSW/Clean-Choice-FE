const detectMarket = (url: string) => {
  if (url.includes("amazon")) return "AMAZON";
  if (url.includes("iherb")) return "IHERB";
  if (url.includes("gnc")) return "GNC";
  return "ETC";
};

export default detectMarket;
