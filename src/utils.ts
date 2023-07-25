const removeLeadingSlash = (txt: string) => txt.replace(/^\/|\/$/g, "");

const removeTrailingSubString = (txt: string, substring: string) =>
  txt.includes(substring) ? txt.substring(0, txt.indexOf(substring)) : txt;

const prependProtocol = (txt: string) =>
  !txt.startsWith("https://") && !txt.startsWith("http://")
    ? `https://${txt}`
    : txt;

export const parseUrlContent: (
  url: string
) => { targetUrl: string; isValid: boolean } = (url) => {
  let isValid = false,
    testUrl: URL | null = null,
    path = "";

  try {
    let urlString = prependProtocol(url);

    testUrl = new URL(urlString);

    path = testUrl.pathname;
    path = removeLeadingSlash(path);
    path = removeTrailingSubString(path, ".git");

    isValid = Boolean(path);
  } catch {}

  return {
    targetUrl: `https://api.github.com/repos/${path}`,
    isValid
  };
};
