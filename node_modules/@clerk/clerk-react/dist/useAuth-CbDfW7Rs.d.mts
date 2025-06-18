import * as _clerk_types from '@clerk/types';
import { Clerk, Without, ClerkOptions, ClientResource, DomainOrProxyUrl, MultiDomainAndOrProxy, InitialState, LoadedClerk, RedirectUrlProp, PendingSessionOptions, OrganizationCustomRoleKey, OrganizationCustomPermissionKey, CheckAuthorizationWithCustomPermissions, Autocomplete, HandleOAuthCallbackParams, UseAuthReturn } from '@clerk/types';
import React from 'react';

declare global {
    interface Window {
        __clerk_publishable_key?: string;
        __clerk_proxy_url?: Clerk['proxyUrl'];
        __clerk_domain?: Clerk['domain'];
    }
}
type IsomorphicClerkOptions = Without<ClerkOptions, 'isSatellite'> & {
    Clerk?: ClerkProp;
    /**
     * The URL that `@clerk/clerk-js` should be hot-loaded from.
     */
    clerkJSUrl?: string;
    /**
     * If your web application only uses [Control Components](https://clerk.com/docs/components/overview#control-components), you can set this value to `'headless'` and load a minimal ClerkJS bundle for optimal page performance.
     */
    clerkJSVariant?: 'headless' | '';
    /**
     * The npm version for `@clerk/clerk-js`.
     */
    clerkJSVersion?: string;
    /**
     * The Clerk Publishable Key for your instance. This can be found on the [API keys](https://dashboard.clerk.com/last-active?path=api-keys) page in the Clerk Dashboard.
     */
    publishableKey: string;
    /**
     * This nonce value will be passed through to the `@clerk/clerk-js` script tag. Use it to implement a [strict-dynamic CSP](https://clerk.com/docs/security/clerk-csp#implementing-a-strict-dynamic-csp). Requires the `dynamic` prop to also be set.
     */
    nonce?: string;
} & MultiDomainAndOrProxy;
/**
 * @interface
 */
type ClerkProviderProps = IsomorphicClerkOptions & {
    children: React.ReactNode;
    /**
     * Provide an initial state of the Clerk client during server-side rendering. You don't need to set this value yourself unless you're [developing an SDK](https://clerk.com/docs/references/sdk/overview).
     */
    initialState?: InitialState;
    /**
     * Indicates to silently fail the initialization process when the publishable keys is not provided, instead of throwing an error.
     * @default false
     * @internal
     */
    __internal_bypassMissingPublishableKey?: boolean;
};
interface BrowserClerkConstructor {
    new (publishableKey: string, options?: DomainOrProxyUrl): BrowserClerk;
}
interface HeadlessBrowserClerkConstructor {
    new (publishableKey: string, options?: DomainOrProxyUrl): HeadlessBrowserClerk;
}
type WithClerkProp<T = unknown> = T & {
    clerk: LoadedClerk;
    component?: string;
};
interface HeadlessBrowserClerk extends Clerk {
    load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
    updateClient: (client: ClientResource) => void;
}
interface BrowserClerk extends HeadlessBrowserClerk {
    onComponentsReady: Promise<void>;
    components: any;
}
type ClerkProp = BrowserClerkConstructor | BrowserClerk | HeadlessBrowserClerk | HeadlessBrowserClerkConstructor | undefined | null;
type SignInWithMetamaskButtonProps = {
    mode?: 'redirect' | 'modal';
    children?: React.ReactNode;
} & RedirectUrlProp;
type PageProps<T extends string> = {
    label: string;
    url: string;
    labelIcon: React.ReactNode;
} | {
    label: T;
    url?: never;
    labelIcon?: never;
};
type UserProfilePageProps = PageProps<'account' | 'security'>;
type UserProfileLinkProps = {
    url: string;
    label: string;
    labelIcon: React.ReactNode;
};
type OrganizationProfilePageProps = PageProps<'general' | 'members'>;
type OrganizationProfileLinkProps = UserProfileLinkProps;
type ButtonActionProps<T extends string> = {
    label: string;
    labelIcon: React.ReactNode;
    onClick: () => void;
    open?: never;
} | {
    label: T;
    labelIcon?: never;
    onClick?: never;
    open?: never;
} | {
    label: string;
    labelIcon: React.ReactNode;
    onClick?: never;
    open: string;
};
type UserButtonActionProps = ButtonActionProps<'manageAccount' | 'signOut'>;
type UserButtonLinkProps = {
    href: string;
    label: string;
    labelIcon: React.ReactNode;
};

declare const SignedIn: ({ children, treatPendingAsSignedOut }: React.PropsWithChildren<PendingSessionOptions>) => React.ReactNode;
declare const SignedOut: ({ children, treatPendingAsSignedOut }: React.PropsWithChildren<PendingSessionOptions>) => React.ReactNode;
declare const ClerkLoaded: ({ children }: React.PropsWithChildren<unknown>) => React.ReactNode;
declare const ClerkLoading: ({ children }: React.PropsWithChildren<unknown>) => React.ReactNode;
declare const ClerkFailed: ({ children }: React.PropsWithChildren<unknown>) => React.ReactNode;
declare const ClerkDegraded: ({ children }: React.PropsWithChildren<unknown>) => React.ReactNode;
type ProtectProps = React.PropsWithChildren<({
    condition?: never;
    role: OrganizationCustomRoleKey;
    permission?: never;
    feature?: never;
    plan?: never;
} | {
    condition?: never;
    role?: never;
    feature?: never;
    plan?: never;
    permission: OrganizationCustomPermissionKey;
} | {
    condition: (has: CheckAuthorizationWithCustomPermissions) => boolean;
    role?: never;
    permission?: never;
    feature?: never;
    plan?: never;
} | {
    condition?: never;
    role?: never;
    permission?: never;
    feature: Autocomplete<`user:${string}` | `org:${string}`>;
    plan?: never;
} | {
    condition?: never;
    role?: never;
    permission?: never;
    feature?: never;
    plan: Autocomplete<`user:${string}` | `org:${string}`>;
} | {
    condition?: never;
    role?: never;
    permission?: never;
    feature?: never;
    plan?: never;
}) & {
    fallback?: React.ReactNode;
} & PendingSessionOptions>;
/**
 * Use `<Protect/>` in order to prevent unauthenticated or unauthorized users from accessing the children passed to the component.
 *
 * Examples:
 * ```
 * <Protect permission="a_permission_key" />
 * <Protect role="a_role_key" />
 * <Protect condition={(has) => has({permission:"a_permission_key"})} />
 * <Protect condition={(has) => has({role:"a_role_key"})} />
 * <Protect fallback={<p>Unauthorized</p>} />
 * ```
 */
declare const Protect: ({ children, fallback, treatPendingAsSignedOut, ...restAuthorizedParams }: ProtectProps) => React.ReactNode;
declare const RedirectToSignIn: {
    (props: _clerk_types.Without<WithClerkProp<_clerk_types.SignInRedirectOptions>, "clerk">): React.JSX.Element | null;
    displayName: string;
};
declare const RedirectToSignUp: {
    (props: _clerk_types.Without<WithClerkProp<_clerk_types.SignUpRedirectOptions>, "clerk">): React.JSX.Element | null;
    displayName: string;
};
/**
 * @function
 * @deprecated Use [`redirectToUserProfile()`](https://clerk.com/docs/references/javascript/clerk#redirect-to-user-profile) instead.
 */
declare const RedirectToUserProfile: {
    (props: _clerk_types.Without<{
        clerk: _clerk_types.LoadedClerk;
        component?: string;
    }, "clerk">): React.JSX.Element | null;
    displayName: string;
};
/**
 * @function
 * @deprecated Use [`redirectToOrganizationProfile()`](https://clerk.com/docs/references/javascript/clerk#redirect-to-organization-profile) instead.
 */
declare const RedirectToOrganizationProfile: {
    (props: _clerk_types.Without<{
        clerk: _clerk_types.LoadedClerk;
        component?: string;
    }, "clerk">): React.JSX.Element | null;
    displayName: string;
};
/**
 * @function
 * @deprecated Use [`redirectToCreateOrganization()`](https://clerk.com/docs/references/javascript/clerk#redirect-to-create-organization) instead.
 */
declare const RedirectToCreateOrganization: {
    (props: _clerk_types.Without<{
        clerk: _clerk_types.LoadedClerk;
        component?: string;
    }, "clerk">): React.JSX.Element | null;
    displayName: string;
};
declare const AuthenticateWithRedirectCallback: {
    (props: _clerk_types.Without<WithClerkProp<HandleOAuthCallbackParams>, "clerk">): React.JSX.Element | null;
    displayName: string;
};
declare const MultisessionAppSupport: ({ children }: React.PropsWithChildren<unknown>) => React.JSX.Element;

/**
 * @inline
 */
type UseAuthOptions = Record<string, any> | PendingSessionOptions | undefined | null;
/**
 * The `useAuth()` hook provides access to the current user's authentication state and methods to manage the active session.
 *
 * > [!NOTE]
 * > To access auth data server-side, see the [`Auth` object reference doc](https://clerk.com/docs/references/backend/types/auth-object).
 *
 * <If sdk="nextjs">
 * By default, Next.js opts all routes into static rendering. If you need to opt a route or routes into dynamic rendering because you need to access the authentication data at request time, you can create a boundary by passing the `dynamic` prop to `<ClerkProvider>`. See the [guide on rendering modes](https://clerk.com/docs/references/nextjs/rendering-modes) for more information, including code examples.
 * </If>
 *
 * @unionReturnHeadings
 * ["Initialization", "Signed out", "Signed in (no active organization)", "Signed in (with active organization)"]
 *
 * @param [initialAuthStateOrOptions] - An object containing the initial authentication state or options for the `useAuth()` hook. If not provided, the hook will attempt to derive the state from the context. `treatPendingAsSignedOut` is a boolean that indicates whether pending sessions are considered as signed out or not. Defaults to `true`.
 *
 * @function
 *
 * @example
 *
 * The following example demonstrates how to use the `useAuth()` hook to access the current auth state, like whether the user is signed in or not. It also includes a basic example for using the `getToken()` method to retrieve a session token for fetching data from an external resource.
 *
 * <Tabs items='React,Next.js'>
 * <Tab>
 *
 * ```tsx {{ filename: 'src/pages/ExternalDataPage.tsx' }}
 * import { useAuth } from '@clerk/clerk-react'
 *
 * export default function ExternalDataPage() {
 *   const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth()
 *
 *   const fetchExternalData = async () => {
 *     const token = await getToken()
 *
 *     // Fetch data from an external API
 *     const response = await fetch('https://api.example.com/data', {
 *       headers: {
 *         Authorization: `Bearer ${token}`,
 *       },
 *     })
 *
 *     return response.json()
 *   }
 *
 *   if (!isLoaded) {
 *     return <div>Loading...</div>
 *   }
 *
 *   if (!isSignedIn) {
 *     return <div>Sign in to view this page</div>
 *   }
 *
 *   return (
 *     <div>
 *       <p>
 *         Hello, {userId}! Your current active session is {sessionId}.
 *       </p>
 *       <button onClick={fetchExternalData}>Fetch Data</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * </Tab>
 * <Tab>
 *
 * {@include ../../docs/use-auth.md#nextjs-01}
 *
 * </Tab>
 * </Tabs>
 */
declare const useAuth: (initialAuthStateOrOptions?: UseAuthOptions) => UseAuthReturn;
/**
 * A hook that derives and returns authentication state and utility functions based on the provided auth object.
 *
 * @param authObject - An object containing authentication-related properties and functions.
 *
 * @returns A derived authentication state with helper methods. If the authentication state is invalid, an error is thrown.
 *
 * @remarks
 * This hook inspects session, user, and organization information to determine the current authentication state.
 * It returns an object that includes various properties such as whether the state is loaded, if a user is signed in,
 * session and user identifiers, organization roles, and a `has` function for authorization checks.
 * Additionally, it provides `signOut` and `getToken` functions if applicable.
 *
 * @example
 * ```tsx
 * const {
 *   isLoaded,
 *   isSignedIn,
 *   userId,
 *   orgId,
 *   has,
 *   signOut,
 *   getToken
 * } = useDerivedAuth(authObject);
 * ```
 */
declare function useDerivedAuth(authObject: any, { treatPendingAsSignedOut }?: PendingSessionOptions): UseAuthReturn;

export { AuthenticateWithRedirectCallback as A, type BrowserClerk as B, type ClerkProviderProps as C, type HeadlessBrowserClerk as H, MultisessionAppSupport as M, type OrganizationProfilePageProps as O, Protect as P, RedirectToSignIn as R, type SignInWithMetamaskButtonProps as S, type UserProfilePageProps as U, type WithClerkProp as W, type UserProfileLinkProps as a, type UserButtonActionProps as b, type UserButtonLinkProps as c, type OrganizationProfileLinkProps as d, type ClerkProp as e, ClerkLoaded as f, ClerkLoading as g, ClerkDegraded as h, ClerkFailed as i, SignedOut as j, SignedIn as k, RedirectToSignUp as l, RedirectToUserProfile as m, RedirectToCreateOrganization as n, RedirectToOrganizationProfile as o, type ProtectProps as p, useAuth as q, useDerivedAuth as u };
