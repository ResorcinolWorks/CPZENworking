import "./chunk-7ELT755Q.mjs";

// src/buildAccountsBaseUrl.ts
function buildAccountsBaseUrl(frontendApi) {
  if (!frontendApi) {
    return "";
  }
  const accountsBaseUrl = frontendApi.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.");
  return `https://${accountsBaseUrl}`;
}
export {
  buildAccountsBaseUrl
};
//# sourceMappingURL=buildAccountsBaseUrl.mjs.map