import { User } from '../entities/User';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string

    @Field()
    message: string
}


@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User
}

@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req, em } : MyContext
    ) {
        // Not logged in
        if (!req.session.userID) {
            return null;
        }
        const user = em.findOne(User, { _id: req.session.userID });
        return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('input') input: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        if (input.username.length <= 4) {
            return {
                errors: [{
                    field: "username",
                    message: "Username too small"
                }]
            }
        }
        if (input.password.length <= 5) {
            return {
                errors: [{
                    field: "password",
                    message: "Password too small"
                }]
            }
        }
        const hasedPassword = await argon2.hash(input.password);
        const user = em.create(User, { username: input.username, password: hasedPassword });
        try {
            await em.persistAndFlush(user);
        } catch (err) {
            // Duplicate user error
            if (err.code === '23505' || err.detail.includes('already exists')) {
                return {
                    errors: [{
                        field: "username",
                        message: "This username is already taken"
                    }]
                }
            }
            console.log(err);
        }

        // Store userID session
        req.session.userID = user._id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('input') input: UsernamePasswordInput,
        @Ctx() {em, req} : MyContext
    ) : Promise<UserResponse> {
        const user = await em.findOne(User, { username: input.username });
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "That username doesn't exist!"
                }],
            };
        }
        const valid = await argon2.verify(user.password, input.password);
        if (!valid) {
            return {
                errors: [{
                    field: "password",
                    message: "Incorrect password!"
                }]
            }
        }

        req.session.userID = user._id;

        return { user };
    }
}