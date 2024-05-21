const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const endpoint = {
    login: () => BASE_URL + `/handover-service/login`,
    generateOTPResetPwd: () => BASE_URL + `/handover-service/generate-otp`,
    validateOTP: () => BASE_URL + `/handover-service/validate-otp`,
    resetPassword: () => BASE_URL + `/handover-service/reset-password`,
    fetchBankList: () => BASE_URL + `/user/get-all-branches`,
    userCreate: () => BASE_URL + `/admin/create-user`,
    dataExcelUpload: () => BASE_URL + `/admin/import-data`,
    branchDataExcelUpload: () => BASE_URL + `/admin/add-new-branch`,
    userData: (email = "", page = 1) => BASE_URL + `/user/fetch-excel-data?emailId=${email}&pageNo=${page}`
}

export default endpoint;   
