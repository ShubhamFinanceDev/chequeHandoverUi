"use client";

import React, { useEffect, useState } from "react";
import AddUserForm from "@/components/page/manage-user/AddUserForm";
import useFetchDataHooks from "@/hooks/useFetchDataHooks";
import UserTable from "@/components/page/manage-user/UserTable";
import useAdminFormHooks from "@/hooks/useAdminFormHooks";

const ManageUserPage = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const { fetchUserDetails } = useFetchDataHooks();
  const adminFormHooks = useAdminFormHooks()

  const showFormHandler = () => setShowAddUserForm((state) => !state)

  useEffect(() => {
    if (!showAddUserForm) fetchUserDetails();
  }, [showAddUserForm]);

  return <div>{showAddUserForm ?
    <AddUserForm {...adminFormHooks} showFormHandler={showFormHandler} /> :
    <UserTable {...adminFormHooks} showFormHandler={showFormHandler} />
  }</div>;
};

export default ManageUserPage;
