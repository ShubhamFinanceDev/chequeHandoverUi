const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

const endpoint = {
    login: () => BASEURL + `/handover-service/login`,
    generateOTPResetPwd: () => BASEURL + `/handover-service/generate-otp`,
    validateOTP: () => BASEURL + `/handover-service/validate-otp`,
    resetPassword: () => BASEURL + `/handover-service/reset-password`,
    fetchBankList: () => BASEURL + `/user/get-all-branches`,
}

export default endpoint;   
