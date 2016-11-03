import { Addresses } from '../imports/api/addresses.js';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // if there are no addresses available, fetch from GET request
  if (Addresses.find().count() === 0) {

    var serverAddresses = Meteor.call('getAddressList');

    // loop over each address and insert into database
    _.each(serverAddresses, function(address) {
      Addresses.insert(address);
    });

  }

});

Meteor.methods({
  'getAddressList': function () {
    console.log('Method.getAddressList');
    this.unblock();
    // curl -X GET --header "Accept: application/json" --header "Authorization: Bearer fa527da6-2567-4976-a2cd-77b534b67e54" "http://54.159.182.138/hack-dragonfly/rest/v1/address?page=1&rows=20"
    var apiUrl = 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address?page=1&rows=20';
    // query the API
    var response = HTTP.get(apiUrl, {
      headers: {
        'Authorization': 'Bearer fa527da6-2567-4976-a2cd-77b534b67e54'
      }
    }).data;
    return response.data;
  },

  'postAddress': function (postData) {
    console.log('Method.postAddress');
    this.unblock();
    /* curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer fa527da6-2567-4976-a2cd-77b534b67e54" -d "{
      \"label\": \"My 1st label\",
      \"latitude\": -19.9353658,
      \"longitude\":-43.9398996,
      \"address\": \"Rua Sergipe 1014, Funcionários\",
      \"country\": \"Brazil\"
      }" "http://54.159.182.138/hack-dragonfly/rest/v1/address"
    */
    var apiUrl = 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address';
    // query the API
    var response = HTTP.post(apiUrl, {
      headers: {
        'Authorization': 'Bearer fa527da6-2567-4976-a2cd-77b534b67e54'
      },
      data: postData
    });
    console.log(response.data);
    return response.data;
  },

  'deleteAddress': function (id) {
    console.log('Method.deleteAddress');
    this.unblock();
    // curl -X DELETE --header "Accept: application/json" --header "Authorization: Bearer fa527da6-2567-4976-a2cd-77b534b67e54" "http://54.159.182.138/hack-dragonfly/rest/v1/address/135"
    var apiUrl = 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address/' + id;
    var response = HTTP.del(apiUrl, {
      headers: {
        'Authorization': 'Bearer fa527da6-2567-4976-a2cd-77b534b67e54'
      }
    }).data;
    // response body: { "message": "Address 135 removed" }
    console.log(response);
    return response;
  }
});
