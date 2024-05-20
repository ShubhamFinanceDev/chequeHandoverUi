import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { useSelector } from 'react-redux';



const useFormHooks = () => {
    const fileInputRef = useRef(null);
    const { setError, resetValidation } = useActionDispatch()
    return ({})
}

export default useFormHooks