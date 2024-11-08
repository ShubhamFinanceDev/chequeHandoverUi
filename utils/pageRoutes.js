const pageRoutes = {
    ADMIN_DASHBOARD_PAGE: () => `/admin-access`,
    DASHBOARD_PAGE: () => `/user-access`,
    FORGOT_PASSWORD: () => `/forgot-password`,
    SIGIN_PAGE: () => `/`,
    MANAGE_USER_PAGE: () => `/admin-access/manage-user`,
    MANAGE_DATA_PAGE: () => `/admin-access/manage-data`,
    GENRATE_REPORT_PAGE: () => `/admin-access/genrate-report`,
    MANAGE_BRANCH_PAGE: () => `/admin-access/manage-branch`,
    REPORT_DASHBOARD_PAGE: () => `/report-user-access`,
    USER_REPORT_DASHBOARD_PAGE: () => `/ura`,


}

export const adminNavitem = [
    { label: "Manage User", path: pageRoutes.MANAGE_USER_PAGE() },
    { label: "Manage Data", path: pageRoutes.MANAGE_DATA_PAGE() },
    { label: "Manage Branch", path: pageRoutes.MANAGE_BRANCH_PAGE() },
    { label: "Genrate Report", path: pageRoutes.GENRATE_REPORT_PAGE() },
    { label: "Report User", path: pageRoutes.REPORT_DASHBOARD_PAGE() },

]

export const userReportNavitem = [
    // { label: "User Access", path: pageRoutes.DASHBOARD_PAGE() },
    { label: "Report User Access", path: pageRoutes.REPORT_DASHBOARD_PAGE() },
]


export default pageRoutes