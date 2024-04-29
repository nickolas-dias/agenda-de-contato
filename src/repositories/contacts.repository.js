import { PrismaClient } from "@prisma/client";

export class ContactsRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createContact({ name, number }) {
            try {
                const contact = await this.prisma.contacts.create({
                data: {
                    name,
                    number: number,
                }
            });

            return contact;
        }
        catch(err) {
            console.error(err)
        }
        
    }

    async getContacts() {
        const contacts = await this.prisma.contacts.findMany();
        console.log(contacts);
        return contacts;
    }

    async updateContact({ id, name, number }) {
        const contact = await this.prisma.contacts.update({
            where: {
                id,
            },
            data: {
                name,
                number,
            }
        });

        return contact;
    }

    async deleteContact(id) {
        await this.prisma.contacts.delete({ where: { id } });
    }
}
