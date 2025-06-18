import { JwtPayload, SharedSignedInAuthObjectProperties } from '@clerk/types';

declare const parsePermissions: ({ per, fpm }: {
    per?: string;
    fpm?: string;
}) => {
    permissions: string[];
    featurePermissionMap: number[][];
};
/**
 * @experimental
 *
 * Resolves the signed-in auth state from JWT claims.
 */
declare const __experimental_JWTPayloadToAuthObjectProperties: (claims: JwtPayload) => SharedSignedInAuthObjectProperties;

export { __experimental_JWTPayloadToAuthObjectProperties, parsePermissions };
