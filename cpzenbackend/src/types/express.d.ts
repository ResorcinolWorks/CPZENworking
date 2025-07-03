import { Request } from 'express';
import { LooseAuthProp } from "@clerk/clerk-sdk-node";

// This file tells TypeScript that the 'req' object from Express
// will have an 'auth' property added by the Clerk middleware.
declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

export {}; 