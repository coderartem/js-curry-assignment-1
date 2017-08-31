'use strict'

const listing =
  (name, price) => ({
    name,
    price
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

const listedPrice =
  listing =>
    name =>
      name === listing.name
        ? listing.price
        : 0

/**
 * transform carts into an array of { customer, total }
 */

 /*
  Using carts.reduce() method to iterate through array of Carts, then nested crntCart.reduce() to iterate through items 
  in current Cart, then nested listings.reduce() to iterate through Listing items and call listedPrice() function to match 
  current item in current Cart with current item in Listing and if they match adding price of item to totalCartCost
  Adding totalCartCost to object for current Customer and pushing object to resultArray of objects
 */
const calculateTotals =
  listings =>
    carts => 
      carts.reduce((resultArray, crntCart) => {
        const totalCartCost = crntCart.items.reduce((prevTotalForCart,crntItemInCart) => {
          return listings.reduce((prevTotalForItem, crntItemInListing) => {
            return listedPrice(crntItemInListing)(crntItemInCart) + prevTotalForItem;
          },0) + prevTotalForCart;
        },0)
        resultArray.push({customer: crntCart.customer, total: totalCartCost});
        return resultArray;
      },[]);

module.exports = {
  listing,
  cart,
  calculateTotals
}
