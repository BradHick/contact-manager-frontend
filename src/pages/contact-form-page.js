import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactForm from '../components/contact-form';




class ContactFormPage extends Component{

  


  componentDidMount = () => {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.fetchContact(_id);
    }else{
      this.props.newContact()
    }
  };
  

  render() {
    return (
      <div>
        {
          this.props.redirect ?
          <Redirect to='/' /> :
          <ContactForm 
            contact={this.props.contact} 
            loading={this.props.contact.loading} 
            saveContact={this.props.saveContact}
            updateContact={this.props.updateContact}
            onSubmit={this.submit}
            errors={this.props.errors}
            redirect={this.props.redirect}
            cancelForm={this.props.cancelForm}
            />
        }
      </div>
    );
  };
};


const mapStateToProps = state => ({
  contact: state.contact.contact, 
  errors: state.contact.errors,
  redirect: state.contact.redirect
});

const mapDispatchToProps = (dispatch) => ({
  saveContact: dispatch.contact.saveContact,
  fetchContact: dispatch.contact.fetchContact,
  updateContact: dispatch.contact.updateContact,
  newContact: dispatch.contact.newContact,
  cancelForm: dispatch.contact.cancelForm
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormPage);