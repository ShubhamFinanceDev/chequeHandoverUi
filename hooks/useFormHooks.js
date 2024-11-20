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
    applicationNo: '',
    file: []
}

const useFormHooks = () => {
    const fileInputRef = useRef(null);
    const { setError, resetValidation, setSuccess, updateApplicationStatus } = useActionDispatch()
    const [ChequeStatus, setChequeStatus] = useState({ ...ChequeInitialState })
    const [updatePassword, setUpdatePassword] = useState({ ...UpdatePasswordInititalState })
    const [reportState, setreportState] = useState({ ...ReportInitialState })
    const [selectedOption, setSelectedOption] = useState('application')

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
        try {
            const body = { ...reportState };
            let response
            if (selectedOption === "application") {
                response = await axios.post(endpoint.reportGenerateUser(body.applicationNo), {}, { responseType: 'blob' })
            } else {
                const formdata = formDataParser(body)
                response = await axios.post(endpoint.reportGenerateUser(), formdata, { responseType: 'blob' })
            }

            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.href = url;
            a.download = "report.xlsx";
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);

            setSuccess("Report downloaded successfully!");
            setreportState({ applicationNo: '', file: '' });
        } catch (error) {
            console.error("Error downloading the report:", error);
            const msg = {
                404 : "Data Not Found",
                406 : "Excel file exceeds the allowed limit of 25  application numbers",
                409 : "Excel have duplicate applicationNo"
            }
            setError(msg?.[error?.response?.status] || "Error downloading the report", error);
            }
    };

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value)
        setreportState({ applicationNo: '', file: '' });
    }


    const ChequeStatusChangeHandler = (e) => changeHandlerHelper(e, ChequeStatus, setChequeStatus)
    const UpdatePasswordChangeHandler = (e) => changeHandlerHelper(e, updatePassword, setUpdatePassword)
    const reportChangeHandler = (e) => changeHandlerHelper(e, reportState, setreportState)

    //  default state handler
    const ChequeStatusDefaultStateHandler = (e) => setChequeStatus(state => ({ ...state, ...e }))

    return ({
        ChequeStatus, selectedOption, handleRadioChange, ChequeStatusChangeHandler, ChequeStatusSubmitHandler, ChequeStatusDefaultStateHandler, updatePassword, UpdatePasswordChangeHandler, UpdatePasswordSubmitHandler,
        reportState, reportSubmitHandler, reportChangeHandler,
    })
}

export default useFormHooks