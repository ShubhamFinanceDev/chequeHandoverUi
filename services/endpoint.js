const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
const endpoint = {
    login: () => BASEURL + `/handover-service/login`
}

export default endpoint;   
