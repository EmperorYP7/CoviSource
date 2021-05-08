import { Contact } from '../entities/Contact';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { isRegistered } from '../middleware/isRegistered';

@InputType()
class ContactInput {
    @Field()
    name: string;

    @Field()
    phoneNumber: string;
}

@InputType()
class ContactUpdateInput {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    phoneNumber: string;
}

@ObjectType()
class ContactErrorFormat {
    @Field()
    field: string;

    @Field()
    message: string;
}


@ObjectType()
class ContactResponse {
    @Field(() => [ContactErrorFormat], { nullable: true })
    errors?: ContactErrorFormat[];

    @Field(() => Contact, { nullable: true })
    contact?: Contact;
}

@Resolver()
export class ContactResolver {

    @Query(() => [Contact])
    allContacts(): Promise<Contact[]> {
        return Contact.find();
    }

    @Mutation(() => ContactResponse)
    @UseMiddleware(isAuth)
    async createContact(
        @Arg('input') input: ContactInput,
        @Ctx() { req }: MyContext
    ): Promise<ContactResponse> {
        if (input.name.length <= 3) {
            return {
                errors: [{
                    field: "name",
                    message: "Invalid Name"
                }]
            }
        }
        if (input.phoneNumber.length < 10) {
            return {
                errors: [{
                    field: "phoneNumber",
                    message: "phoneNumber should be at least 10 digits long"
                }]
            }
        }
        const contact = await Contact.create({
            ...input,
            providerID: req.session.providerID,
        }).save();

        return { contact };
    }

    @Mutation(() => ContactResponse)
    @UseMiddleware(isAuth, isRegistered)
    async updateContact(
        @Arg('input') input: ContactUpdateInput,
    ): Promise<ContactResponse | undefined> {
        if (input.name.length <= 3) {
            return {
                errors: [{
                    field: "name",
                    message: "Invalid Name"
                }]
            }
        }
        if (input.phoneNumber.length < 10) {
            return {
                errors: [{
                    field: "phoneNumber",
                    message: "phoneNumber should be at least 10 digits long"
                }]
            }
        }
        var contact = await Contact.findOne(input.id);
        if (!contact) {
            return {
                errors: [{
                    field: "name",
                    message: "Contact not found for this provider"
                }]
            }
        } else {
            await Contact.update(input.id, {
                name: input.name,
                phoneNumber: input.phoneNumber
            });
            contact = await Contact.findOne(input.id);
            return { contact };
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isRegistered)
    async deleteContact(
        @Arg('id') id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean | undefined> {
        return new Promise(async (resolve) => {
            const contact = await Contact.findOne({ id: id, providerID: req.session.providerID });
            if (!contact) {
                console.log("Contact not found!");
                resolve(false);
            } else {
                try {
                    await Contact.delete({ id: id, providerID: req.session.providerID });
                } catch (err) {
                    console.log(err);
                    resolve(false);
                }
                resolve(true);
            }
        })
    }
}
