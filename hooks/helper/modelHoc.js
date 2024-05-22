import React, { useState } from 'react'
import ChequeStatusModel from '@/components/page/model/chequeStatus'
import { Modal } from 'react-bootstrap'
const initialState = {
    show: false,
    key: null,
    size: 'md',
    centered: true,
    keyboard: false,
}

const ModelMap = {
    CHEQUE_STATUS_MODEL: ChequeStatusModel,

}

const ModelHOC = (Component) => {
    return function ModelComponent(props) {
        const [ModelState, setModelState] = useState({ ...initialState })

        const closeModel = () => setModelState({ ...initialState })
        const openModel = (e) => setModelState({ show: true, ...e })

        const ModelComponent = ModelMap[ModelState.key]

        return (
            <>
                {ModelState.show && <Modal
                    show={ModelState.show}
                    onHide={closeModel}

                    backdrop="static"
                    size={ModelState.size}
                    centered={ModelState.centered}
                    keyboard={ModelState.keyboard}
                >
                    <ModelComponent
                        openModel={openModel}
                        closeModel={closeModel}
                        {...ModelState}
                    />
                </Modal >}
                <Component
                    {...props}
                    openModel={openModel}
                    closeModel={closeModel}
                />
            </>
        )
    }

}

export default ModelHOC

