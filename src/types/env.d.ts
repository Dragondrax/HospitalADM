type MessageDefaultLoginAPI = {
    errorMessage: string,
    message: string,
    object: DecodedLoginToken[],
    success: boolean,
}

type DecodedLoginToken = {
    Id: string;
    Username: string;
    role: string;
    sub: string;
};

type ResponseDefaultRegisterMedicalRecordAPI = {
    data: Object;
}

