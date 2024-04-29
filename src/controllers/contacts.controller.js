import { ContactsRepository } from '../repositories/contacts.repository.js';

export class ContactsController {
    constructor() {
        this.repository = new ContactsRepository();
    }

    getAllContacts = async (req, res) => {
        const allContacts = await this.repository.getContacts();
        return res.json(allContacts);
    }

    createContact = async (req, res) => {
        const contact = req.body;

        const createdContact = await this.repository.createContact(contact);

        return res.json(createdContact);
    }

    updateContact = async (req, res) => {
        const id = Number(req.params.id);
        const contact = req.body;

        const updatedContact = await this.repository.updateContact({ id, ...contact });

        return res.json(updatedContact);
    }

    deleteContact = async (req, res) => {
        const id = Number(req.params.id);

        await this.repository.deleteContact(id);

        return res.json({ ok: true });
    }
}