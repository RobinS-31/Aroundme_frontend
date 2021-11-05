/**
 * Formate un prix ("price") au format "de-DE".
 * @param {number} price
 * @param {number} minDigits
 * @param {number} maxDigits
 * @returns {string}
 */
export const priceFormatted = (price, minDigits = 0, maxDigits = 3) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits
    }).format(price);
};
