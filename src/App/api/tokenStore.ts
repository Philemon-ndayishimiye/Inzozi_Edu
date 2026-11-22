// The access token lives only here, in memory - never in localStorage,
// sessionStorage or a JS-readable cookie, so it can't be lifted by an XSS
// payload. It's lost on a full page reload by design; UserProvider
// rehydrates it on mount via /auth/refresh, which relies on the separate
// httpOnly refresh-token cookie the browser (not this code) holds.
let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};
