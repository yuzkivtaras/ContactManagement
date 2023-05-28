import React, { Component } from 'react';

export class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [], loading: true };
    }

    componentDidMount() {
        this.fetchContacts();
    }

    renderContactsTable(contacts) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>DateOfBirth</th>
                        <th>Married</th>
                        <th>Phone</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact =>
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.dateOfBirth}</td>
                            <td>{contact.married ? 'Yes' : 'No'}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.salary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        const { contacts, loading } = this.state;
        let contents = loading
            ? <p><em>Loading...</em></p>
            : this.renderContactsTable(contacts);

        return (
            <div>
                <h1 id="tableLabel">Contacts</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async fetchContacts() {
        const response = await fetch('contact');
        const data = await response.json();
        this.setState({ contacts: data, loading: false });
    }
}
