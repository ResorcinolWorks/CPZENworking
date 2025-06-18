import "./chunk-7ELT755Q.mjs";

// src/alternativePhoneCode.ts
var ALTERNATIVE_PHONE_CODE_PROVIDERS = [
  {
    channel: "whatsapp",
    name: "WhatsApp"
  }
];
var getAlternativePhoneCodeProviderData = (channel) => {
  if (!channel) {
    return null;
  }
  return ALTERNATIVE_PHONE_CODE_PROVIDERS.find((p) => p.channel === channel) || null;
};
export {
  ALTERNATIVE_PHONE_CODE_PROVIDERS,
  getAlternativePhoneCodeProviderData
};
//# sourceMappingURL=alternativePhoneCode.mjs.map