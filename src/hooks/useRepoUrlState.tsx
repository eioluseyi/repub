import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { parseUrlContent } from "../utils";

const DEFAULT = {
  ERROR_MESSAGE: "Oops! Something went wrong. Try again.",
};

export const useRepoUrlState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [repoData, setRepoData] = useState<{
    full_name?: string;
    stargazers_count?: string | number;
    name?: string;
    description?: string;
  }>({});

  const navigate = useNavigate();

  const buttonLabel = isLoading ? "Loading..." : "Submit";
  const errorClass = `error-message ${isError ? "error" : ""}`;
  const { targetUrl, isValid, errMsg } = parseUrlContent(urlValue);

  const handleError = (value?: string | boolean) => {
    if (value === false) return setIsError(false);

    setIsError(true);
    if (typeof value === "string") return setErrorMessage(value);
    setErrorMessage(DEFAULT.ERROR_MESSAGE);
  };

  const parseError = (err: unknown) => {
    if (typeof err === "object") {
      const newErr = { message: "", ...err };
      return newErr?.message;
    }

    return undefined;
  };

  const getAsyncRepo = useCallback(async () => {
    try {
      const res = await fetch(targetUrl);
      const response = await res.json();

      if (res.status !== 200) throw response;

      setRepoData(response);
    } catch (err) {
      handleError(parseError(err));
    } finally {
      setIsLoading(false);
    }
  }, [targetUrl]);

  const submit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      setIsLoading(true);
      handleError(false);

      if (!isValid) setIsLoading(false);
      if (!isValid) return handleError(errMsg || "Invalid input");

      getAsyncRepo();
    },
    [isValid, getAsyncRepo]
  );

  const inputOnChange: ChangeEventHandler = (e) =>
    e.target instanceof HTMLInputElement && setUrlValue(e.target.value);

  useEffect(() => {
    const { full_name, stargazers_count, name, description } = repoData;

    if (!full_name) return handleError();

    const newUrl = `https://api.github.com/repos/${full_name}/branches`;
    setIsLoading(true);

    (async () => {
      try {
        const res = await fetch(newUrl);
        const response = await res.json();

        if (res.status !== 200) throw response;

        // validate response
        if (!Array.isArray(response)) throw response;
        navigate(`/${full_name}`, {
          state: { response, stargazers_count, name, description },
        });
      } catch (err) {
        handleError(parseError(err));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [repoData, navigate]);

  useEffect(() => {
    if (urlValue === "") setIsError(false);
  }, [urlValue]);

  return {
    buttonLabel,
    errorClass,
    submit,
    inputOnChange,
    urlValue,
    errorMessage,
  };
};
