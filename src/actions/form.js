export const SETINITIALDATA = 'SETINITIALDATA';
export const SETINPUTFORMVALUES = 'SETINPUTFORMVALUES';
export const SETISWAITINGFORMVALIDATION = 'SETISWAITINGFORMVALIDATION';
export const SETISFORMERROR = 'SETISFORMERROR';
export const SETFORMREQUESTISVALIDATED = 'SETFORMREQUESTISVALIDATED';
export const RESETFORM = 'RESETFORM';
export const SENDREGISTERPRODUCER = 'SENDREGISTERPRODUCER';
export const SENDREGISTERCONSUMER = 'SENDREGISTERCONSUMER';
export const GETLOCATION = 'GETLOCATION';
export const SETPRODUCERLOCATION = 'SETPRODUCERLOCATION';

export const setInitialData = (initialData) => ({
    type: SETINITIALDATA,
    initialData
});
export const setInputFormValues = (inputName, inputValues) => ({
    type: SETINPUTFORMVALUES,
    inputName,
    inputValues
});
export const setIsFormError = (bool, errorMessage) => ({
    type: SETISFORMERROR,
    bool,
    errorMessage
});
export const setIsWaitingFormValidation = (bool) => ({
    type: SETISWAITINGFORMVALIDATION,
    bool
});
export const setFormRequestIsValidated = (bool) => ({
    type: SETFORMREQUESTISVALIDATED,
    bool
});
export const resetRegisterForm = () => ({
    type: RESETFORM
})
export const sendRegisterProducer = () => ({
    type: SENDREGISTERPRODUCER
});
export const sendRegisterConsumer = () => ({
    type: SENDREGISTERCONSUMER
});
export const getLocation = () => ({
    type: GETLOCATION
});
export const setProducerLocation = (lon, lat) => ({
    type: SETPRODUCERLOCATION,
    lon,
    lat
});
