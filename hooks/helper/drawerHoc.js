import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import UpdatePasswordModel from '@/components/page/model/updatepassword'

const initialState = {
    show: false,
    title: null,
    component: null,
    options: {}
}

const DrawerMap = {
    UPDATE_PASSWORD: UpdatePasswordModel
}

const Drawer = (Component) => {
    return function DrawerComponent(props) {
        const [drawerProps, setDrawerProps] = useState(initialState)

        const handleClose = () => setDrawerProps(initialState)
        const handleShow = (e) => setDrawerProps({ show: true, ...e });

        const DrawerComponent = DrawerMap[drawerProps.component]

        return (
            <>
                {drawerProps.show && <Offcanvas
                    show={drawerProps.show}
                    onHide={handleClose}
                    placement='end'
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{drawerProps.title}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={{ paddingTop: 0 }}>
                        <DrawerComponent closeDrawer={handleClose} {...drawerProps} />
                    </Offcanvas.Body>
                </Offcanvas>}

                <Component
                    {...props}
                    openDrawer={handleShow}
                    closeDrawer={handleClose}
                />
            </>
        )
    }
}

export default Drawer