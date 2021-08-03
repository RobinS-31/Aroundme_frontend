export const GETPRODUCERSLIST = 'GETPRODUCERSLIST';
export const GETONEPRODUCER = 'GETONEPRODUCER';
export const SETPRODUDERSLIST = 'SETPRODUCERSLIST';
export const SETONEPRODUCER = 'SETONEPRODUCER';
export const RESETPRODUCERSLIST = 'RESETPRODUCERSLIST';
export const RESETONEPRODUCER = 'RESETONEPRODUCER';

export const getProducersList = () => ({
    type: GETPRODUCERSLIST
});
export const getOneProducer = (id) => ({
    type: GETONEPRODUCER,
    id
});
export const setProducersList = (producersList) => ({
    type: SETPRODUDERSLIST,
    producersList
});
export const setOneProducer = (producerData) => ({
    type: SETONEPRODUCER,
    producerData
});
export const resetProducersList = () => ({
   type: RESETPRODUCERSLIST
});
export const resetOneProducer = () => ({
    type: RESETONEPRODUCER
});
