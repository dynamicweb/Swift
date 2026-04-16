/**
 * Authentication module
 * - Manages JWT token for authenticated API requests (e.g., favorites, etc.)
 * - Provides a method to ensure and retrieve the token, with proper caching of in-flight requests
 * - Used by swift-auth and can be extended for token refresh in the future if needed
 */

const Authentication = (function () {
  let token = null;
  let tokenPromise = null;

  /**
   * Returns the JWT token, fetching and caching it if necessary.
   * Ensures only one request is in flight at a time.
   * @returns {Promise<string|null>} Resolves to JWT token or null if failed.
   */
  function EnsureToken() {
    if (token) {
      return Promise.resolve(token);
    }
    if (!tokenPromise) {
      tokenPromise = fetch('/dwapi/users/token', { method: 'POST', credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Token fetch failed');
          }
          return response.json();
        })
        .then((data) => {
          token = typeof data === "object" ? data.token : null;
          return token;
        })
        .catch(() => {
          tokenPromise = null;
          return null;
        });
    }
    return tokenPromise;
  }

  return {
    get token() {
      return token;
    },
    get tokenPromise() {
      return tokenPromise;
    },
    EnsureToken,
  };
})();

export { Authentication };