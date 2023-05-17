'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    },
    {
      ownerId: 1,
      address: "123 Main St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.765358,
      lng: -102.4330327,
      name: "Chase",
      description: "The best big bank",
      price: 400
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    
    return queryInterface.bulkDelete(options)
  }
};