import { Template } from 'meteor/templating';
import { Addresses } from '../api/addresses.js';
import './addressform.html';

Template.addressform.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    // get the data we need from the form
    var newAddress = {
      label: event.target.localName.value,
      address: event.target.localAddress.value,
      country: 'Brazil',
      latitude: -19.9353658,
      longitude: -43.9398996
    };

    // create the new address
    var savedAddress = Meteor.call('postAddress', newAddress);
    console.log('savedAddress:', savedAddress);
    Addresses.insert(newAddress);
  }

});
