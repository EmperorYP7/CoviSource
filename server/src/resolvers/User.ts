import { User } from '../entities/User';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';
import { getConnection } from 'typeorm';
import { isAuth } from '../middleware/isAuth';
import { Provider } from '../entities/Provider';

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
    phoneNumber: string

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
    @UseMiddleware(isAuth)
    async me(@Ctx() { req } : MyContext): Promise<User | undefined | null> {
        // Not logged in
        if (!req.session.userID) {
            return null;
        }
        return User.findOne({ where: { _id: req.session.userID } });
    }

    @Query(() => [User])
    allUsers(): Promise<User[]> {
        return User.find();
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('input') input: UserRegisterInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        if (req.session.userID) {
            return {
                errors: [{
                    field: "user",
                    message: "Already logged in"
                }]
            }
        }
        if (input.email.length <= 4 || !input.email.includes('@')) {
            return {
                errors: [{
                    field: "email",
                    message: "Invalid emailID"
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
        if (input.phoneNumber.length < 10 || input.phoneNumber.length > 13) {
            return {
                errors: [{
                    field: "phoneNumber",
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
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([{
                    email: input.email,
                    password: hasedPassword,
                    name: input.name,
                    phoneNumber: input.phoneNumber,
                    providerID: req.session.providerID || undefined,
                }])
                .returning('*')
                .execute();
            user = result.raw[0];
        } catch (err) {
            if (err.detail.includes("already exists")) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "This user already exists!"
                        }
                    ]
                };
            }
        }
        // Store userID session
        req.session.userID = user._id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('input') input: UsernamePasswordInput,
        @Ctx() { req } : MyContext
    ): Promise<UserResponse> {
        if (req.session.userID !== undefined) {
            return {
                errors: [{
                    field: "email",
                    message: "You're already logged in!",
                }]
            }
        }
        const user = await User.findOne({where: { email: input.email }});
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
        const provider = await Provider.findOne({ where: { ownerID: user._id } });
        req.session.userID = user._id;
        if (provider) {
            req.session.providerID = provider._id;
        }
        return { user };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
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
                res.clearCookie(COOKIE_NAME);
                resolve(true);
            })
        )
    }
}
