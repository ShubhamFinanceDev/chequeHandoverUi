const pageRoutes = {
    ADMIN_DASHBOARD_PAGE: () => `/admin-access`,
    DASHBOARD_PAGE: () => `/user-access`,
    FORGOT_PASSWORD: () => `/forgot-password`,
    SIGIN_PAGE: () => `/`

}

export const adminNavitem = [
    { label: "Manage User", path: "/admin-access/manage-user" },
    { label: "Manage Data", path: "/admin-access/manage-data" },
    { label: "Genrate Report", path: "/admin-access/genrate-report" },
    { label: "Manage Branch", path: "/admin-access/manage-branch" },
]

export default pageRoutes