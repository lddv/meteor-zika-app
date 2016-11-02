import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.onCreated(function(){
  this.showForm = new ReactiveVar(false);
});

Template.body.helpers({
  showForm: function(){
    return Template.instance().showForm.get();
  },
  addressList: function() {
    return Addresses.find();
  }
});

Template.body.events({
  'click .showAddressForm': function(event, template) {
    template.showForm.set(true);
  },
  'click .saveAddress': function(event, template) {
    template.showForm.set(false);
  },

  'click .editAddress': function(event) {

    // get the data we need from the form
    var newAddress = {
      localName: event.target.localName.value,
      localAddress: event.target.localAddress.value
    };

    // create the new address
    Addresses.update(newAddress);
  }
});
