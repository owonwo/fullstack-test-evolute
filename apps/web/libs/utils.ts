export const isSSR = () => typeof window === "undefined";

export const safeJsonParse = (str: any, fallback = null): any => {
  try {
    const value = JSON.parse(str);
    if (value === null) return fallback;
    return value;
  } catch (e) {
    return fallback;
  }
};
