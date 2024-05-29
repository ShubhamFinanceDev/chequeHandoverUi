const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const endpoint = {
    login: () => BASE_URL + `/handover-service/login`,
    generateOTPResetPwd: () => BASE_URL + `/handover-service/generate-otp`,
    validateOTP: () => BASE_URL + `/handover-service/validate-otp`,
    resetPassword: () => BASE_URL + `/handover-service/reset-password`,
    fetchBranchList: () => BASE_URL + `/user/get-all-branches`,
    userCreate: () => BASE_URL + `/admin/create-user`,
    dataExcelUpload: () => BASE_URL + `/admin/import-data`,
    branchDataExcelUpload: () => BASE_URL + `/admin/add-new-branch`,
    invokeStatusProcedure: () => BASE_URL + `/admin/invoke-status-procedure`,
    userData: (email = "", page = 1, applicationNo = '', branch = '') => BASE_URL + `/user/fetch-excel-data?emailId=${email}&pageNo=${page}&applicationNo=${applicationNo}&branchName=${branch}`,
    userDetails: () => BASE_URL + `/user/get-user-details`,
    updateUserStatus: (emailID="") => BASE_URL + `/admin/status-update?emailId=${emailID}`,
    updateStatusCheque: () => BASE_URL + `/user/update-application-flag`,

    generateMISReport: (email = "") => BASE_URL + `/user/generate-mis-report?emailId=${email}`,
    assignBranch: (email = "") => BASE_URL + `/user/get-list-of-assign-branches?emailId=${email}`,

}

export default endpoint;   
