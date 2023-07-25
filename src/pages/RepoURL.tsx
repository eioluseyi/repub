import { useRepoUrlState } from "../hooks/useRepoUrlState";

export default function RepoURL() {
  const {
    buttonLabel,
    errorClass,
    submit,
    inputOnChange,
    urlValue,
    errorMessage
  } = useRepoUrlState();

  return (
    <div className="repo-url">
      <div className="logo-container">
        <span className="logo-text">REPUB</span>
      </div>
      <div className="action-container">
        <h1 className="text-01 headline">
          Start by pasting the repository <span className="accent">URL</span>.
        </h1>
        <div className="text-04 sub-text">
          A proof of concept application that shows an overview of the active
          branches on a GitHub repository.
        </div>
        <form className="url-input-wrapper" onSubmit={submit}>
          <input
            className="url-input text-03"
            value={urlValue}
            autoFocus
            onChange={inputOnChange}
            placeholder="https://"
          />
          <button
            className="url-submit-btn text-03"
            disabled={!urlValue}
            type="submit"
          >
            {buttonLabel}
          </button>
        </form>
        <div className={errorClass}>{errorMessage}</div>
      </div>
    </div>
  );
}
