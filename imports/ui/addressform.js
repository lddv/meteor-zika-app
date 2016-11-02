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
      localName: event.target.localName.value,
      localAddress: event.target.localAddress.value
    };

    // create the new address
    Addresses.insert(newAddress);
  }

});
