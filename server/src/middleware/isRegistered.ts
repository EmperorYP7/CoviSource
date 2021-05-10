import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";


export const isRegistered: MiddlewareFn<MyContext> = ({ context }, next) => {
    if (!context.req.session.providerID) {
        throw new Error("Not registered as a provider");
    }
    return next();
}