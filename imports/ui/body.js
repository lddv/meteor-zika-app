import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Addresses } from '../api/addresses.js';
import { Meteor } from 'meteor/meteor';

import './addressform.js';
import './body.html';

Template.body.onCreated(function(){
  this.showForm = new ReactiveVar(false);
});

Template.body.helpers({
  showForm: function(){
    return Template.instance().showForm.get();
  },
  addressList: function() {
    return Addresses.find({});
  }
});

Template.body.events({

  'click .showAddressForm': function(event, template) {
    template.showForm.set(true);
  },

  'click .saveAddress': function(event, template) {
    // var savedAddress = Meteor.call('postAddress', );
    // console.log(savedAddress);
    // Addresses.insert(savedAddress.id, {
    //   $set: {
    //     label: savedAddress.label,
    //     latitude: savedAddress.latitude,
    //     longitude:savedAddress.longitude,
    //     address: savedAddress.address,
    //     country: savedAddress.country
    //   }
    // });
    template.showForm.set(false);
  },

  'click .editAddress': function(event, template) {
    template.showForm.set(true);
    $('form').scrollTop(0);
    var retrievedAddress = Addresses.findOne(this._id);
    console.log(retrievedAddress);

    $('.form-group > input[name=localName]').val(retrievedAddress.localName);
    $('.form-group > input[name=localAddress]').val(retrievedAddress.localAddress);


    // get the data we need from the form
    // var newAddress = {
    //   localName: event.target.localName.value,
    //   localAddress: event.target.localAddress.value
    // };

    // create the new address
    Addresses.update(this._id, { $set: {localName: 'what', localAddress: 'ever'} });
  },

  'click .deleteAddress': function(event, template) {
    var deletedAddress = Meteor.call('deleteAddress', this.id);
    Addresses.remove({ _id: this._id });
  }
});
