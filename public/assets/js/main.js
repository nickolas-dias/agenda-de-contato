const inputAddContactName = document.querySelector('.name');
const inputAddContactPhone = document.querySelector('.phone');
const buttonAddContact = document.querySelector('.add-contact button');
const contactListEl = document.querySelector('.contact-list');

buttonAddContact.addEventListener('click', () => {
    const name = inputAddContactName.value;
    const phone = inputAddContactPhone.value;
    createContact(name, phone);
});

function deleteContact(id) {
    fetch(`http://localhost:4444/api/contacts/${id}`, { method: 'DELETE' })
        .then(() => {
            getAllContacts();
        });
}

function createContact(name, phone) {
    try {
        fetch('http://localhost:4444/api/contacts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, number: phone })
        })
            .then(() => {
                getAllContacts();
            });
    }
    catch (err) {
        console.error(err);
    }
    
}

function updateContact(id, name, phone) {
    fetch('http://localhost:4444/api/contacts/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, phone: phone })
    })
        .then(() => {
            getAllContacts();
        });
}

function mountContact(contact) {
    const contactEl = document.createElement('div');
    const deleteButtonEl = document.createElement('button');
    const nameEl = document.createElement('p');
    const phoneEl = document.createElement('p');

    contactEl.className = 'contact';
    deleteButtonEl.innerHTML = 'deletar';
    deleteButtonEl.addEventListener('click', () => {
        deleteContact(contact.id);
    });
    nameEl.innerHTML = contact.name;
    phoneEl.innerHTML = contact.number;

    contactEl.appendChild(nameEl);
    contactEl.appendChild(phoneEl);
    contactEl.appendChild(deleteButtonEl);

    contactListEl.appendChild(contactEl);
}

function getAllContacts() {
    fetch('http://localhost:4444/api/contacts')
        .then((response) => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                contactListEl.innerHTML = '<p class="no-contacts active">Nenhum contato cadastrado.</p>';
            } else {
                contactListEl.innerHTML = '';
                data.forEach(mountContact);
            }
        });
}

getAllContacts();
