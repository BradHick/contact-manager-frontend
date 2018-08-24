import React, { Component } from 'react';
import { Form, Grid, Button, FormField, Message } from 'semantic-ui-react';
import get from 'lodash/get';
import { Formik } from 'formik';
import * as Yup from 'yup';


const defaultFormShape = {
  name: {
    first: '',
    last: ''
  },
  phone: '',
  email: ''
};

class ContactForm extends Component {

  
  render() {
    
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),

      phone: Yup.string()
        .required('Please provide a phone'),

        name: Yup.object({
          first: Yup.string()
            .required('First name is required'),
        })
        
      

    })
    
    return (
      
      <Formik
        initialValues={this.props.contact.name.first ? this.props.contact : defaultFormShape}
        enableReinitialize
        validationSchema={validationSchema}

        onSubmit={(values) => {
          if(!values._id) {
            return this.props.saveContact(values)
          } else {
            return this.props.updateContact(values)
          }
        }}
        
        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
        <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{this.props.contact._id ? 'Edit Contact' : 'Add New Contact'}</h1>
            
          <Form onSubmit={handleSubmit} loading={this.props.loading}>
            <Form.Group widths='equal'>
              <FormField>
                <label>First name</label>
                <input
                  type="text"
                  name="name.first"
                  onChange={handleChange}
                  value={values.name.first}
                  onBlur={handleBlur}
                  placeholder='First name'
                />
                {get(touched, 'name.first') && get(errors, 'name.first') && <Message negative size='mini'>{errors.name.first}</Message>}
                
              </FormField>   
              <FormField>
                <label>First name</label>
                <input
                  type="text"
                  name="name.last"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name.last}
                />
              </FormField>
            </Form.Group>

            <FormField>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {touched.phone && errors.phone && <Message negative size='mini'>{errors.phone}</Message>}

              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} 
              /> 
              {touched.email && errors.email && <Message negative size='mini'>{errors.email}</Message>}

            </FormField>
            <Button basic color='green' type='submit'>Save</Button>
            <Button basic color='red' onClick={this.props.cancelForm}>Cancel</Button>
          </Form>
        </Grid.Column>
      </Grid>
          
      
      )}
      />



    );
  };
};







export default ContactForm;