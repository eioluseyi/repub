const removeLeadingSlash = (txt: string) => txt.replace(/^\/|\/$/g, "");

const removeTrailingSubString = (txt: string, substring: string) =>
  txt.includes(substring) ? txt.substring(0, txt.indexOf(substring)) : txt;

const prependProtocol = (txt: string) =>
  !txt.startsWith("https://") && !txt.startsWith("http://")
    ? `https://${txt}`
    : txt;

export const parseUrlContent: (url: string) => {
  targetUrl: string;
  isValid: boolean;
  errMsg: string;
} = (url) => {
  let isValid = false,
    errMsg = "",
    testUrl: URL | null = null,
    path = "";

  try {
    let urlString = prependProtocol(url);

    testUrl = new URL(urlString);

    path = testUrl.pathname;
    path = removeLeadingSlash(path);
    path = removeTrailingSubString(path, ".git");

    isValid = Boolean(path);
    if (path.split("/").length < 2) isValid = false;
    if (testUrl.hostname !== "github.com") {
      isValid = false;
      errMsg = "Only github repos, please";
    }
  } catch {
    // Set error message
    errMsg = "Invalid url";
  }
  return {
    targetUrl: `https://api.github.com/repos/${path}`,
    isValid,
    errMsg,
  };
};
