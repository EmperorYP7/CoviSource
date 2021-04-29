import { User } from '../entities/User';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';

@InputType()
class UsernamePasswordInput {
    @Field()
    email: string

    @Field()
    password: string
}

@InputType()
class UserRegisterInput {
    @Field()
    email: string

    @Field()
    password: string

    @Field()
    contactNumber: string

    @Field()
    name: string
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
        @Arg('input') input: UserRegisterInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        if (input.email.length <= 4) {
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
        if (input.contactNumber.length < 10) {
            return {
                errors: [{
                    field: "contactNumber",
                    message: "Contact number is invalid. Enter 10 Digit number"
                }]
            }
        }
        if (input.name.length < 3) {
            return {
                errors: [{
                    field: "name",
                    message: "Enter valid name!"
                }]
            }
        }
        const hasedPassword = await argon2.hash(input.password);
        const user = em.create(User, {
            email: input.email,
            password: hasedPassword,
            name: input.name,
            contactNumber: input.contactNumber
        });
        try {
            await em.persistAndFlush(user);
        } catch (err) {
            // Duplicate user error
            if (err.code === '23505') {
                return {
                    errors: [{
                        field: "email",
                        message: "This user already exists!"
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
        const user = await em.findOne(User, { email: input.email });
        if (!user) {
            return {
                errors: [{
                    field: "email",
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

    @Mutation(() => Boolean)
    logout(
        @Ctx() {req, res}: MyContext
    ) {
        return new Promise((resolve) => 
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                res.clearCookie(COOKIE_NAME as string);
                resolve(true);
            })
        )
    }
}