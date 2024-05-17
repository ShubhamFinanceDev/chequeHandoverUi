const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const endpoint = {
    login: () => BASE_URL + `/handover-service/login`,
    generateOTPResetPwd: () => BASE_URL + `/handover-service/generate-otp`,
    validateOTP: () => BASE_URL + `/handover-service/validate-otp`,
    resetPassword: () => BASE_URL + `/handover-service/reset-password`,
    fetchBankList: () => BASE_URL + `/user/get-all-branches`,
    userCreate: () => BASE_URL + `/admin/create-user`
}

export default endpoint;   
