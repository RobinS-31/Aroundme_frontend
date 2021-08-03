export const SETINPUTREGISTERFORMVALUES = 'SETINPUTREGISTERFORMVALUES';
export const SETISWAITINGREGISTERFORMVALIDATION = 'SETISWAITINGREGISTERFORMVALIDATION';
export const SENDREGISTERPRODUCER = 'SENDREGISTERPRODUCER';
export const SENDREGISTERCONSUMER = 'SENDREGISTERCONSUMER';
export const GETLOCATION = 'GETLOCATION';
export const SETPRODUCERLOCATION = 'SETPRODUCERLOCATION';
export const SETREGISTRATIONISVALIDATED = 'SETREGISTRATIONISVALIDATED';
export const SETISREGISTERFORMERROR = 'SETISREGISTERFORMERROR';
export const RESETREGISTERFORM = 'RESETREGISTERFORM';

export const setInputRegisterFormValues = (inputName, inputValues) => ({
    type: SETINPUTREGISTERFORMVALUES,
    inputName,
    inputValues
});
export const setIsRegisterFormError = (bool, errorMessage) => ({
    type: SETISREGISTERFORMERROR,
    bool,
    errorMessage
});
export const setIsWaitingRegisterFormValidation = (bool) => ({
    type: SETISWAITINGREGISTERFORMVALIDATION,
    bool
});
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
export const setRegistrationIsValidated = (bool) => ({
    type: SETREGISTRATIONISVALIDATED,
    bool
});
export const resetRegisterForm = () => ({
    type: RESETREGISTERFORM
})
