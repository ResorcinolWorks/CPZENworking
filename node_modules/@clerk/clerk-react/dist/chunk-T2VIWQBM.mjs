// src/errors/errorThrower.ts
import { buildErrorThrower } from "@clerk/shared/error";
var errorThrower = buildErrorThrower({ packageName: "@clerk/clerk-react" });
function setErrorThrowerOptions(options) {
  errorThrower.setMessages(options).setPackageName(options);
}

// src/hooks/useAuth.ts
import { createCheckAuthorization, resolveAuthState } from "@clerk/shared/authorization";
import { eventMethodCalled } from "@clerk/shared/telemetry";
import { useCallback } from "react";

// src/contexts/AuthContext.ts
import { createContextAndHook } from "@clerk/shared/react";
var [AuthContext, useAuthContext] = createContextAndHook("AuthContext");

// src/contexts/IsomorphicClerkContext.tsx
import { ClerkInstanceContext, useClerkInstanceContext } from "@clerk/shared/react";
var IsomorphicClerkContext = ClerkInstanceContext;
var useIsomorphicClerkContext = useClerkInstanceContext;

// src/errors/messages.ts
var multipleClerkProvidersError = "You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.";
var multipleChildrenInButtonComponent = (name) => `You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
var invalidStateError = "Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support";
var unsupportedNonBrowserDomainOrProxyUrlFunction = "Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.";
var userProfilePageRenderedError = "<UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
var userProfileLinkRenderedError = "<UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
var organizationProfilePageRenderedError = "<OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
var organizationProfileLinkRenderedError = "<OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
var customPagesIgnoredComponent = (componentName) => `<${componentName} /> can only accept <${componentName}.Page /> and <${componentName}.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`;
var customPageWrongProps = (componentName) => `Missing props. <${componentName}.Page /> component requires the following props: url, label, labelIcon, alongside with children to be rendered inside the page.`;
var customLinkWrongProps = (componentName) => `Missing props. <${componentName}.Link /> component requires the following props: url, label and labelIcon.`;
var noPathProvidedError = (componentName) => `The <${componentName}/> component uses path-based routing by default unless a different routing strategy is provided using the \`routing\` prop. When path-based routing is used, you need to provide the path where the component is mounted on by using the \`path\` prop. Example: <${componentName} path={'/my-path'} />`;
var incompatibleRoutingWithPathProvidedError = (componentName) => `The \`path\` prop will only be respected when the Clerk component uses path-based routing. To resolve this error, pass \`routing='path'\` to the <${componentName}/> component, or drop the \`path\` prop to switch to hash-based routing. For more details please refer to our docs: https://clerk.com/docs`;
var userButtonIgnoredComponent = `<UserButton /> can only accept <UserButton.UserProfilePage />, <UserButton.UserProfileLink /> and <UserButton.MenuItems /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`;
var customMenuItemsIgnoredComponent = "<UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.";
var userButtonMenuItemsRenderedError = "<UserButton.MenuItems /> component needs to be a direct child of `<UserButton />`.";
var userButtonMenuActionRenderedError = "<UserButton.Action /> component needs to be a direct child of `<UserButton.MenuItems />`.";
var userButtonMenuLinkRenderedError = "<UserButton.Link /> component needs to be a direct child of `<UserButton.MenuItems />`.";
var userButtonMenuItemLinkWrongProps = "Missing props. <UserButton.Link /> component requires the following props: href, label and labelIcon.";
var userButtonMenuItemsActionWrongsProps = "Missing props. <UserButton.Action /> component requires the following props: label.";

// src/hooks/useAssertWrappedByClerkProvider.ts
import { useAssertWrappedByClerkProvider as useSharedAssertWrappedByClerkProvider } from "@clerk/shared/react";
var useAssertWrappedByClerkProvider = (source) => {
  useSharedAssertWrappedByClerkProvider(() => {
    errorThrower.throwMissingClerkProviderError({ source });
  });
};

// src/hooks/utils.ts
var clerkLoaded = (isomorphicClerk) => {
  return new Promise((resolve) => {
    const handler = (status) => {
      if (["ready", "degraded"].includes(status)) {
        resolve();
        isomorphicClerk.off("status", handler);
      }
    };
    isomorphicClerk.on("status", handler, { notify: true });
  });
};
var createGetToken = (isomorphicClerk) => {
  return async (options) => {
    await clerkLoaded(isomorphicClerk);
    if (!isomorphicClerk.session) {
      return null;
    }
    return isomorphicClerk.session.getToken(options);
  };
};
var createSignOut = (isomorphicClerk) => {
  return async (...args) => {
    await clerkLoaded(isomorphicClerk);
    return isomorphicClerk.signOut(...args);
  };
};

// src/hooks/useAuth.ts
var useAuth = (initialAuthStateOrOptions = {}) => {
  var _a, _b;
  useAssertWrappedByClerkProvider("useAuth");
  const { treatPendingAsSignedOut, ...rest } = initialAuthStateOrOptions != null ? initialAuthStateOrOptions : {};
  const initialAuthState = rest;
  const authContextFromHook = useAuthContext();
  let authContext = authContextFromHook;
  if (authContext.sessionId === void 0 && authContext.userId === void 0) {
    authContext = initialAuthState != null ? initialAuthState : {};
  }
  const isomorphicClerk = useIsomorphicClerkContext();
  const getToken = useCallback(createGetToken(isomorphicClerk), [isomorphicClerk]);
  const signOut = useCallback(createSignOut(isomorphicClerk), [isomorphicClerk]);
  (_a = isomorphicClerk.telemetry) == null ? void 0 : _a.record(eventMethodCalled("useAuth", { treatPendingAsSignedOut }));
  return useDerivedAuth(
    {
      ...authContext,
      getToken,
      signOut
    },
    {
      treatPendingAsSignedOut: treatPendingAsSignedOut != null ? treatPendingAsSignedOut : (_b = isomorphicClerk.__internal_getOption) == null ? void 0 : _b.call(isomorphicClerk, "treatPendingAsSignedOut")
    }
  );
};
function useDerivedAuth(authObject, { treatPendingAsSignedOut = true } = {}) {
  const { userId, orgId, orgRole, has, signOut, getToken, orgPermissions, factorVerificationAge, sessionClaims } = authObject != null ? authObject : {};
  const derivedHas = useCallback(
    (params) => {
      if (has) {
        return has(params);
      }
      return createCheckAuthorization({
        userId,
        orgId,
        orgRole,
        orgPermissions,
        factorVerificationAge,
        features: (sessionClaims == null ? void 0 : sessionClaims.fea) || "",
        plans: (sessionClaims == null ? void 0 : sessionClaims.pla) || ""
      })(params);
    },
    [has, userId, orgId, orgRole, orgPermissions, factorVerificationAge]
  );
  const payload = resolveAuthState({
    authObject: {
      ...authObject,
      getToken,
      signOut,
      has: derivedHas
    },
    options: {
      treatPendingAsSignedOut
    }
  });
  if (!payload) {
    return errorThrower.throw(invalidStateError);
  }
  return payload;
}

// src/hooks/useEmailLink.ts
import React from "react";
function useEmailLink(resource) {
  const { startEmailLinkFlow, cancelEmailLinkFlow } = React.useMemo(() => resource.createEmailLinkFlow(), [resource]);
  React.useEffect(() => {
    return cancelEmailLinkFlow;
  }, []);
  return {
    startEmailLinkFlow,
    cancelEmailLinkFlow
  };
}

// src/hooks/useSignIn.ts
import { useClientContext } from "@clerk/shared/react";
import { eventMethodCalled as eventMethodCalled2 } from "@clerk/shared/telemetry";
var useSignIn = () => {
  var _a;
  useAssertWrappedByClerkProvider("useSignIn");
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  (_a = isomorphicClerk.telemetry) == null ? void 0 : _a.record(eventMethodCalled2("useSignIn"));
  if (!client) {
    return { isLoaded: false, signIn: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signIn: client.signIn,
    setActive: isomorphicClerk.setActive
  };
};

// src/hooks/useSignUp.ts
import { useClientContext as useClientContext2 } from "@clerk/shared/react";
import { eventMethodCalled as eventMethodCalled3 } from "@clerk/shared/telemetry";
var useSignUp = () => {
  var _a;
  useAssertWrappedByClerkProvider("useSignUp");
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext2();
  (_a = isomorphicClerk.telemetry) == null ? void 0 : _a.record(eventMethodCalled3("useSignUp"));
  if (!client) {
    return { isLoaded: false, signUp: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signUp: client.signUp,
    setActive: isomorphicClerk.setActive
  };
};

// src/hooks/index.ts
import {
  useClerk,
  useOrganization,
  useOrganizationList,
  useSessionList,
  useUser,
  useSession,
  useReverification
} from "@clerk/shared/react";

// src/components/controlComponents.tsx
import { deprecated } from "@clerk/shared/deprecated";
import React3 from "react";

// src/contexts/SessionContext.tsx
import { SessionContext, useSessionContext } from "@clerk/shared/react";

// src/components/withClerk.tsx
import React2 from "react";
var withClerk = (Component, displayNameOrOptions) => {
  const passedDisplayedName = typeof displayNameOrOptions === "string" ? displayNameOrOptions : displayNameOrOptions == null ? void 0 : displayNameOrOptions.component;
  const displayName = passedDisplayedName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const options = typeof displayNameOrOptions === "string" ? void 0 : displayNameOrOptions;
  const HOC = (props) => {
    useAssertWrappedByClerkProvider(displayName || "withClerk");
    const clerk = useIsomorphicClerkContext();
    if (!clerk.loaded && !(options == null ? void 0 : options.renderWhileLoading)) {
      return null;
    }
    return /* @__PURE__ */ React2.createElement(
      Component,
      {
        ...props,
        component: displayName,
        clerk
      }
    );
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};

// src/components/controlComponents.tsx
var SignedIn = ({ children, treatPendingAsSignedOut }) => {
  useAssertWrappedByClerkProvider("SignedIn");
  const { userId } = useAuth({ treatPendingAsSignedOut });
  if (userId) {
    return children;
  }
  return null;
};
var SignedOut = ({ children, treatPendingAsSignedOut }) => {
  useAssertWrappedByClerkProvider("SignedOut");
  const { userId } = useAuth({ treatPendingAsSignedOut });
  if (userId === null) {
    return children;
  }
  return null;
};
var ClerkLoaded = ({ children }) => {
  useAssertWrappedByClerkProvider("ClerkLoaded");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (!isomorphicClerk.loaded) {
    return null;
  }
  return children;
};
var ClerkLoading = ({ children }) => {
  useAssertWrappedByClerkProvider("ClerkLoading");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.status !== "loading") {
    return null;
  }
  return children;
};
var ClerkFailed = ({ children }) => {
  useAssertWrappedByClerkProvider("ClerkFailed");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.status !== "error") {
    return null;
  }
  return children;
};
var ClerkDegraded = ({ children }) => {
  useAssertWrappedByClerkProvider("ClerkDegraded");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.status !== "degraded") {
    return null;
  }
  return children;
};
var Protect = ({ children, fallback, treatPendingAsSignedOut, ...restAuthorizedParams }) => {
  useAssertWrappedByClerkProvider("Protect");
  const { isLoaded, has, userId } = useAuth({ treatPendingAsSignedOut });
  if (!isLoaded) {
    return null;
  }
  const unauthorized = fallback != null ? fallback : null;
  const authorized = children;
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    if (restAuthorizedParams.condition(has)) {
      return authorized;
    }
    return unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission || restAuthorizedParams.feature || restAuthorizedParams.plan) {
    if (has(restAuthorizedParams)) {
      return authorized;
    }
    return unauthorized;
  }
  return authorized;
};
var RedirectToSignIn = withClerk(({ clerk, ...props }) => {
  const { client, session } = clerk;
  const hasSignedInSessions = client.signedInSessions ? client.signedInSessions.length > 0 : (
    // Compat for clerk-js<5.54.0 (which was released with the `signedInSessions` property)
    client.activeSessions && client.activeSessions.length > 0
  );
  React3.useEffect(() => {
    if (session === null && hasSignedInSessions) {
      void clerk.redirectToAfterSignOut();
    } else {
      void clerk.redirectToSignIn(props);
    }
  }, []);
  return null;
}, "RedirectToSignIn");
var RedirectToSignUp = withClerk(({ clerk, ...props }) => {
  React3.useEffect(() => {
    void clerk.redirectToSignUp(props);
  }, []);
  return null;
}, "RedirectToSignUp");
var RedirectToUserProfile = withClerk(({ clerk }) => {
  React3.useEffect(() => {
    deprecated("RedirectToUserProfile", "Use the `redirectToUserProfile()` method instead.");
    void clerk.redirectToUserProfile();
  }, []);
  return null;
}, "RedirectToUserProfile");
var RedirectToOrganizationProfile = withClerk(({ clerk }) => {
  React3.useEffect(() => {
    deprecated("RedirectToOrganizationProfile", "Use the `redirectToOrganizationProfile()` method instead.");
    void clerk.redirectToOrganizationProfile();
  }, []);
  return null;
}, "RedirectToOrganizationProfile");
var RedirectToCreateOrganization = withClerk(({ clerk }) => {
  React3.useEffect(() => {
    deprecated("RedirectToCreateOrganization", "Use the `redirectToCreateOrganization()` method instead.");
    void clerk.redirectToCreateOrganization();
  }, []);
  return null;
}, "RedirectToCreateOrganization");
var AuthenticateWithRedirectCallback = withClerk(
  ({ clerk, ...handleRedirectCallbackParams }) => {
    React3.useEffect(() => {
      void clerk.handleRedirectCallback(handleRedirectCallbackParams);
    }, []);
    return null;
  },
  "AuthenticateWithRedirectCallback"
);
var MultisessionAppSupport = ({ children }) => {
  useAssertWrappedByClerkProvider("MultisessionAppSupport");
  const session = useSessionContext();
  return /* @__PURE__ */ React3.createElement(React3.Fragment, { key: session ? session.id : "no-users" }, children);
};

export {
  errorThrower,
  setErrorThrowerOptions,
  multipleClerkProvidersError,
  multipleChildrenInButtonComponent,
  unsupportedNonBrowserDomainOrProxyUrlFunction,
  userProfilePageRenderedError,
  userProfileLinkRenderedError,
  organizationProfilePageRenderedError,
  organizationProfileLinkRenderedError,
  customPagesIgnoredComponent,
  customPageWrongProps,
  customLinkWrongProps,
  noPathProvidedError,
  incompatibleRoutingWithPathProvidedError,
  userButtonIgnoredComponent,
  customMenuItemsIgnoredComponent,
  userButtonMenuItemsRenderedError,
  userButtonMenuActionRenderedError,
  userButtonMenuLinkRenderedError,
  userButtonMenuItemLinkWrongProps,
  userButtonMenuItemsActionWrongsProps,
  IsomorphicClerkContext,
  withClerk,
  AuthContext,
  useAuth,
  useDerivedAuth,
  useEmailLink,
  useSignIn,
  useSignUp,
  useClerk,
  useOrganization,
  useOrganizationList,
  useSessionList,
  useUser,
  useSession,
  useReverification,
  SignedIn,
  SignedOut,
  ClerkLoaded,
  ClerkLoading,
  ClerkFailed,
  ClerkDegraded,
  Protect,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToUserProfile,
  RedirectToOrganizationProfile,
  RedirectToCreateOrganization,
  AuthenticateWithRedirectCallback,
  MultisessionAppSupport
};
//# sourceMappingURL=chunk-T2VIWQBM.mjs.map