import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";


export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    if (!context.req.session.userID) {
        throw new Error("Not authenticated");
    }
    return next();
}