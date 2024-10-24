const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const endpoint = {
    login: () => BASE_URL + `/handover-service/login`,
    generateOTPResetPwd: () => BASE_URL + `/handover-service/generate-otp`,
    validateOTP: () => BASE_URL + `/handover-service/validate-otp`,
    resetPassword: () => BASE_URL + `/handover-service/reset-password`,
    fetchBranchList: () => BASE_URL + `/user/get-all-branches`,
    userCreate: () => BASE_URL + `/admin/create-user`,
    userUpdate: () => BASE_URL + `/admin/update-user`,
    dataExcelUpload: () => BASE_URL + `/admin/import-data`,
    branchDataExcelUpload: () => BASE_URL + `/admin/add-new-branch`,
    invokeStatusProcedure: () => BASE_URL + `/admin/invoke-status-procedure`,
    userData: (email = "", page = 1, applicationNo = '', branch = '') => BASE_URL + `/user/fetch-excel-data?emailId=${email}&pageNo=${page}&applicationNo=${applicationNo}&branchName=${branch}`,
    userDetails: () => BASE_URL + `/user/get-user-details`,
    updateUserStatus: (emailID = "", email = "") => BASE_URL + `/admin/status-update?emailId=${emailID}&updatedBy=${email}`,
    updateStatusCheque: () => BASE_URL + `/user/update-application-flag`,
    updatePassword: () => BASE_URL + `/admin/update-password`,
    updateUserDetails: (userId = '') => BASE_URL + `/admin/update-user/${userId}`,
    reportGenerateUser: (applicationNo = '') => BASE_URL + `/report-user/excel-sheet-builder?applicationNo=${applicationNo}`,


    generateMISReport: (email = "", reportType = "", branchName = "", fromDate = "", toDate = "", selectedType = "", selectedDate = "", issuedType = "") => BASE_URL + `/user/generate-mis-report?emailId=${email}&reportType=${reportType}&fromDate=${fromDate}&toDate=${toDate}&selectedType=${branchName}&selectedDate=${selectedDate}&status=${issuedType}`,

    assignBranch: (email = "") => BASE_URL + `/user/get-list-of-assign-branches?emailId=${email}`,

}

export default endpoint;   
