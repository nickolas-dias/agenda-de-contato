import { Router } from 'express';
import { ContactsController } from '../controllers/contacts.controller.js';

export const contactsRouter = Router();
export const contactsController = new ContactsController();

contactsRouter.get('/', contactsController.getAllContacts);
contactsRouter.post('/', contactsController.createContact);
contactsRouter.patch('/:id', contactsController.updateContact);
contactsRouter.delete('/:id', contactsController.deleteContact);