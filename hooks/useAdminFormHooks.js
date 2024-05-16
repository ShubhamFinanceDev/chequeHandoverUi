import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
import pageRoutes from '@/utils/pageRoutes';
// Hooks
import { changeHandlerHelper } from '@/hooks/helper/changeHandler';




// {
//     "firstname": "saurabh",
//     "lastName": "singh",
//     "emailId": "chintu5@shubham.com",
//     "mobileNo": "8160041657",
//     "password": "",
//     "createdBy": "atish.rai@dbalounge.com",
//     "roleMasters": {
//         "role": "ROLE_ADMIN"
//     },
//     "assignBranches": [
//         {
//             "branchCode": "2355"
//         },
//         {
//             "branchCode": "2375"
//         }
//     ]
// }


const userBodyInitialState = {
    firstname: "",
    lastName: "",
    emailId: "",
    mobileNo: "",
    password: "",
    createdBy: "",
    role: "",
    assignBranches: []
}

const useAdminFormHooks = () => {
    const [userBody, setUserBody] = useState({ ...userBodyInitialState })
    return ({})
}

export default useAdminFormHooks