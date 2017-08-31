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
    carts => {
      
      return carts.reduce((resultArray, crntCart) => {
          resultArray.push({customer: crntCart.customer, total: totalCalc(listings, crntCart.items)});
            return resultArray;
        },[]);
    }

const totalCalc = (listings,cart) => {

  return listings.reduce((prevTotalOfCart, crntListingItem) => {
    return cart.reduce((prevTotalForThisItemInCart, crntItemInCart) => {
      return listedPrice(crntListingItem)(crntItemInCart) + prevTotalForThisItemInCart;
        },0) + prevTotalOfCart;
      },0);
    }

module.exports = {
  listing,
  cart,
  calculateTotals
}
