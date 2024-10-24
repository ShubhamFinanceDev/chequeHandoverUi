import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { useSelector } from 'react-redux';
import { changeHandlerHelper } from './helper/changeHandler';
import { formDataParser } from './helper/formDataParser';


const ChequeInitialState = {
    applicationNo: "",
    file: "",
    date: '',
}
const UpdatePasswordInititalState = {
    email: "",
    // oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}

const ReportInitialState = {
    applicationNo:''
}

const useFormHooks = () => {
    const fileInputRef = useRef(null);
    const { setError, resetValidation, setSuccess, updateApplicationStatus } = useActionDispatch()
    const [ChequeStatus, setChequeStatus] = useState({ ...ChequeInitialState })
    const [updatePassword, setUpdatePassword] = useState({ ...UpdatePasswordInititalState })
    const [reportState, setreportState] = useState({ ...ReportInitialState })

    const { email } = useSelector((state) => state.authSlice)


    const ChequeStatusSubmitHandler = async (e, next = () => { }) => {
        e.preventDefault()
        try {
            if (!email) {
                return
            }
            const body = { ...ChequeStatus, emailId: email }
            const formdata = formDataParser(body)
            const { data } = await axios.post(endpoint.updateStatusCheque(), formdata)
            if (data.code === "0000") {
                setSuccess("Acknowledgement has been received!")
                updateApplicationStatus(body.chequeId)
                setChequeStatus({ ...ChequeInitialState })
                next()
                return
            } else {
                setError(data.msg)
            }

        } catch (error) {
            setError(error)
        }

    }

    const UpdatePasswordSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email: updatePassword.email,
                // oldPassword: updatePassword.oldPassword,
                newPassword: updatePassword.newPassword,
                confirmNewPassword: updatePassword.confirmNewPassword
            };

            const { data } = await axios.put(endpoint.updatePassword(), body);
            if (data.code === "0000") {
                setSuccess("Password updated successfully")
                setUpdatePassword({ ...UpdatePasswordInititalState })
                return
            } else {
                setError(data.msg)
            }

            console.log("API Response:", data);

        } catch (error) {
            setError(error);
        }
    };

    const reportSubmitHandler = async (e) => {
        e.preventDefault();
    
        if (!reportState.applicationNo) {
            return; // Ensure applicationNo is provided
        }
    
        try {
            const body = { ...reportState };
            const response = await axios({
                url: endpoint.reportGenerateUser(body.applicationNo),
                method: "GET",
                responseType: "blob",
            });
    
            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            const contentDisposition = response.headers["content-disposition"];
            let filename = "report.xlsx";
    
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    filename = match[1]; 
                }
            }
    
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
    
            setSuccess("Report downloaded successfully!");
            setreportState({ applicationNo: '' }); 
        } catch (error) {
            console.error("Error downloading the report:", error);
            setError("Error downloading the report", error);
        }
    };
    

    const ChequeStatusChangeHandler = (e) => changeHandlerHelper(e, ChequeStatus, setChequeStatus)
    const UpdatePasswordChangeHandler = (e) => changeHandlerHelper(e, updatePassword, setUpdatePassword)
    const reportChangeHandler = (e) => changeHandlerHelper(e, reportState, setreportState)

    //  default state handler
    const ChequeStatusDefaultStateHandler = (e) => setChequeStatus(state => ({ ...state, ...e }))

    return ({
        ChequeStatus, ChequeStatusChangeHandler, ChequeStatusSubmitHandler, ChequeStatusDefaultStateHandler, updatePassword, UpdatePasswordChangeHandler, UpdatePasswordSubmitHandler,
        reportState,reportSubmitHandler,reportChangeHandler
    })
}

export default useFormHooks