import { Addresses } from '../imports/api/addresses.js';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // if there are no addresses available create sample data
  if (Addresses.find().count() === 0) {

    // create sample addresses
    var sampleAddresses = [
      {
        localName: 'Minha Casa',
        localAddress: 'Rua Abaeté, 288 Bairro Bonfim'
      },
      {
        localName: 'Hotmart',
        localAddress: 'Rua Sergipe, 1095 Savassi'
      }
    ];

    // loop over each sample address and insert into database
    _.each(sampleAddresses, function(address) {
      Addresses.insert(address);
    });

  }

});
