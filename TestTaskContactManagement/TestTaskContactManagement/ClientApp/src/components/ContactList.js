import React, { Component } from 'react';

export class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            loading: true,
            sortColumn: '',
            sortDirection: 'asc',
            editingContactId: null,
            editingContact: null
        };

        this.renderContactForm = this.renderContactForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.editContact = this.editContact.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount() {
        this.fetchContacts();
    }

    renderContactsTable(contacts) {
        const { sortColumn } = this.state;

        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th onClick={() => this.sortBy('id')} className={sortColumn === 'id' ? 'selected' : ''}>
                            Id
                        </th>
                        <th onClick={() => this.sortBy('name')} className={sortColumn === 'name' ? 'selected' : ''}>
                            Name
                        </th>
                        <th onClick={() => this.sortBy('dateOfBirth')} className={sortColumn === 'dateOfBirth' ? 'selected' : ''}>
                            DateOfBirth
                        </th>
                        <th onClick={() => this.sortBy('married')} className={sortColumn === 'married' ? 'selected' : ''}>
                            Married
                        </th>
                        <th onClick={() => this.sortBy('phone')} className={sortColumn === 'phone' ? 'selected' : ''}>
                            Phone
                        </th>
                        <th onClick={() => this.sortBy('salary')} className={sortColumn === 'salary' ? 'selected' : ''}>
                            Salary
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.dateOfBirth}</td>
                            <td>{contact.married ? 'Yes' : 'No'}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.salary}</td>
                            <td>
                                <button onClick={this.editContact.bind(this, contact.id)}>Edit</button>
                                <button onClick={() => this.deleteContact(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderContactForm() {
        const { editingContact } = this.state;

        if (!editingContact) {
            return null;
        }

        return (
            <div>
                <h2>Edit Contact</h2>
                <form onSubmit={this.saveContact}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={editingContact.name}
                            onChange={this.handleInputChange}
                            name="name"
                        />
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        <input
                            type="text"
                            value={editingContact.dateOfBirth}
                            onChange={this.handleInputChange}
                            name="dateOfBirth"
                        />
                    </div>
                    <div>
                        <label>Married:</label>
                        <input
                            type="checkbox"
                            checked={editingContact.married}
                            onChange={this.handleCheckboxChange}
                            name="married"
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            value={editingContact.phone}
                            onChange={this.handleInputChange}
                            name="phone"
                        />
                    </div>
                    <div>
                        <label>Salary:</label>
                        <input
                            type="text"
                            value={editingContact.salary}
                            onChange={this.handleInputChange}
                            name="salary"
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button onClick={this.cancelEdit}>Cancel</button>
                </form>
            </div>
        );
    }

    render() {
        const { contacts, loading } = this.state;
        let contents = loading ? <p><em>Loading...</em></p> : this.renderContactsTable(contacts);

        return (
            <div>
                <h1 id="tableLabel">Contacts</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {this.renderContactForm()}
                {contents}
            </div>
        );
    }

    async fetchContacts() {
        const response = await fetch('contact');
        const data = await response.json();
        this.setState({ contacts: data, loading: false });
    }

    sortBy(column) {
        const { contacts, sortDirection } = this.state;

        const newSortDirection = column === this.state.sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';

        const sortedContacts = [...contacts].sort((a, b) => {
            if (column === 'id') {
                return newSortDirection === 'asc' ? a.id - b.id : b.id - a.id;
            } else if (column === 'name') {
                return newSortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (column === 'dateOfBirth') {
                return newSortDirection === 'asc'
                    ? new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
                    : new Date(b.dateOfBirth) - new Date(a.dateOfBirth);
            } else if (column === 'married') {
                return newSortDirection === 'asc' ? a.married - b.married : b.married - a.married;
            } else if (column === 'phone') {
                return newSortDirection === 'asc' ? a.phone.localeCompare(b.phone) : b.phone.localeCompare(a.phone);
            } else if (column === 'salary') {
                return newSortDirection === 'asc' ? a.salary - b.salary : b.salary - a.salary;
            }
        });

        this.setState({ contacts: sortedContacts, sortColumn: column, sortDirection: newSortDirection });
    }

    handleInputChange = (event) => {
        const { editingContact } = this.state;
        const { name, value } = event.target;

        this.setState({
            editingContact: {
                ...editingContact,
                [name]: value
            }
        });
    };

    handleCheckboxChange = (event) => {
        const { editingContact } = this.state;
        const { name, checked } = event.target;

        this.setState({
            editingContact: {
                ...editingContact,
                [name]: checked
            }
        });
    };

    editContact = async (contactId) => {
        const response = await fetch(`contact/${contactId}`);
        const contact = await response.json();

        this.setState({ editingContactId: contactId, editingContact: contact });
    };

    cancelEdit = () => {
        this.setState({ editingContactId: null, editingContact: null });
    };

    saveContact = async (event) => {
        event.preventDefault();

        const { editingContactId, editingContact } = this.state;

        await fetch(`contact/${editingContactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingContact)
        });

        const response = await fetch('contact');
        const updatedContacts = await response.json();

        this.setState({ contacts: updatedContacts, editingContactId: null, editingContact: null });
    };

    deleteContact = async (contactId) => {
        await fetch(`contact/${contactId}`, {
            method: 'DELETE'
        });

        const response = await fetch('contact');
        const updatedContacts = await response.json();

        this.setState({ contacts: updatedContacts });

        console.log(`Delete contact with ID: ${contactId}`);
    }
}

export default ContactList;
