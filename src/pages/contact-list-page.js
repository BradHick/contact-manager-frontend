import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactList from '../components/contact-list';


class ContactListPage extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  };
  
  render(){
    return (
      <div>
        <h1>List of contacts</h1>
        <ContactList 
          contacts={this.props.contacts} 
          deleteContact={this.props.deleteContact} />
      </div>
    );
  };
};


const mapStateToProps = state => 
  ({
    contacts: state.contact.contacts
  });

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: dispatch.contact.fetchContacts,
  deleteContact: dispatch.contact.deleteContact
})
export default connect(mapStateToProps, mapDispatchToProps)(ContactListPage);
