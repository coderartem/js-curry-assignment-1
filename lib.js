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
