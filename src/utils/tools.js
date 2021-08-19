/**
 * Formate un prix ("price") au format "de-DE".
 * @param {Number} price
 * @returns {string}
 */
export const priceFormatted = (price) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0
    }).format(price);
};
