import { client } from '../client/client';

const url = '/contact';

const contact = {
  state: {
    contacts: [],
    contact: {name:{}},
    loading: false,
    errors: {},
    redirect: false
  },
  
  reducers: {
    cancelForm: (state) =>{
      return{
        ...state,
        redirect: true
      }
    },

    fetchContactsFulfiled: (state, payload) => {
      return { 
        ...state,
        contacts: payload.data || payload,
        redirect: false
      };
    },

    newContact: (state) =>{
      return {
        ...state,
        contact: {name:{}}
      };
    },

    saveContactFulfilled: (state, payload) =>{
      return {
        ...state,
        contacts: [...state.contacts, payload],
        errors:{},
        loading: false,
        redirect: true
      };
    },

    saveContactPending: (state) => {
      return {
        ...state,
        loading: true
      };
    },

    saveContactRejected: (state, payload) => {
      // convert feathers error formatting to match client-side error formatting
      const { "name.first":first, "name.last":last, phone, email } = payload.errors;
      const errors = { global: payload.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      };
    },

    fetchContactFulfiled: (state, payload) => {
      return {
        ...state,
        contact: payload,
        errors: {},
        loading: false,
        redirect: false
      };
    },

    updateContactFulfiled: (state, payload) => {
      const contact = payload;
      return {
        ...state,
        contacts: state.contacts.map(item => item._id === contact._id ? contact : item),
        errors: {},
        loading: false,
        redirect: true
      };
    },

    updateContactRejected: (state, payload) => {
      const { "name.first":first, "name.last":last, phone, email } = payload.errors;
      const errors = { global: payload.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      };
    },

    updateContactPending: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    
    fetchContactPending: (state) => {
      return {
        ...state,
        loading: true,
        contact: {name:{}}
      };
    },

    deleteContactFulfiled: (state, payload) => {
      const _id = payload._id;
      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== _id)
      };
    }




  },



  effects: (dispatch) => ({
    fetchContacts() {
      return client.get(url)
        .then(res => {
          dispatch.contact.fetchContactsFulfiled(res.data);
        })

    },

    fetchContact(_id){
      dispatch.contact.fetchContactPending();
      return client.get(`${url}/${_id}`)
        .then(res => {
          dispatch.contact.fetchContactFulfiled(res.data);
        });
    },

    updateContact(contact){
      dispatch.contact.updateContactPending();
      return client.put(`${url}/${contact._id}`, contact)
        .then(res =>{
          dispatch.contact.updateContactFulfiled(res.data);
        })
        .catch(err =>{
          dispatch.contact.updateContactRejected(err.response.data);
        });
    },

    saveContact(contact){
      dispatch.contact.saveContactPending();
      return client.post(url, contact)
        .then(res =>{
          dispatch.contact.saveContactFulfilled(res.data);
        })
        .catch(err => {
          dispatch.contact.saveContactRejected(err.response.data);
        });
    },

    deleteContact(_id){
      return client.delete(`${url}/${_id}`)
        .then(res => {
          dispatch.contact.deleteContactFulfiled(res.data);
        })
    }
  })
};

export default contact;