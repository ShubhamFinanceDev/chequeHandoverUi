"use client";

import React, { useEffect } from "react";

import useActionDispatch from "./useActionDispatch";
import { useSelector } from "react-redux";
import { useState } from "react";

// Services
import axios from "@/services/axios";
import endpoint from "@/services/endpoint";
import { changeHandlerHelper } from "./helper/changeHandler";

const searchQueryInitialState = {
  applicationNumber: "",
  branch: "",
};
const genrateReportInitialState = {
  email: "",
  branchName: "",
  reportType: "",
  fromDate: "",
  toDate: "",
  selectedType: "",
  selectedDate: "",
  status: "",
};

const useFetchDataHooks = (isResetGlobalState = true) => {
  const {
    setError,
    setSuccess,
    setBranchList,
    setApplicationDetails,
    resetGlobalState,
    setAssingBranch,
    setUserDetails,
  } = useActionDispatch();
  const { email } = useSelector((state) => state.authSlice);
  const [searchQuery, setSearchQuery] = useState({
    ...searchQueryInitialState,
  });
  const [genrateReportBody, setGenrateReportBody] = useState({
    ...genrateReportInitialState,
  });

  const [query, setQuery] = useState("");

  useEffect(() => {
    return () => {
      if (isResetGlobalState) {
        return resetGlobalState();
      }
    };
  }, []);

  const fetchBranchList = async () => {
    try {
      const {
        data: { branchMasters = [], commanResponse = {} },
      } = await axios.get(endpoint.fetchBranchList());
      if (commanResponse?.code == "0000") {
        setBranchList(
          branchMasters.map(
            ({ branchName, branchCode, state, uploadedDate, uploadedBy }) => ({
              name: branchName,
              state: state,
              value: branchCode,
              addedDate: uploadedDate,
              addedBy: uploadedBy,
            })
          )
        );
        return;
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(endpoint.userDetails());
      setUserDetails(data);
    } catch (error) {
      setError(error);
    }
  };

  // show Date time function

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (dateString != null) {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
    }
  };

  const searchUserData = async (e, page = 1) => {
    e.preventDefault();
    try {
      if (!email) {
        return;
      }
      const { data } = await axios.get(
        endpoint.userData(
          email,
          page,
          searchQuery.applicationNumber,
          searchQuery.branch
        )
      );
      if (data?.commonResponse?.code === "0000") {
        const { applicationDetails, nextPage, totalCount } = data;
        setApplicationDetails({
          applications: applicationDetails,
          applicationMeta: {
            totalPages: Math.ceil(totalCount / 100),
            currentPage: page,
            isNextPage: nextPage,
          },
        });
        return;
      } else {
        setApplicationDetails({
          applications: [],
          applicationMeta: {
            totalPages: 0,
            currentPage: 1,
            isNextPage: false,
          },
        });
        // setError(data.commonResponse.msg)
      }
    } catch (error) {
      setError(error);
    }
  };

  const generateMISReport = async () => {
    if (!email || !genrateReportBody?.reportType) {
      return;
    }
    const {
      reportType,
      fromDate,
      toDate,
      branchName,
      selectedType,
      selectedDate,
      status,
    } = genrateReportBody;
    const reportRecipient = genrateReportBody?.email || branchName
    axios({
      url: endpoint.generateMISReport(
        email,
        reportType,
        reportRecipient,
        fromDate,
        toDate,
        selectedType,
        selectedDate,
        status
      ),
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const contentDisposition = response.headers["content-disposition"];
        let filename = "download.xlsx";
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            filename = match[1];
          }
        }
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setGenrateReportBody({ ...genrateReportInitialState });
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        setError("Data not found", error);
      });
  };

  const removeRecordHandler = async () => {
    try {
      if (!email) {
        return;
      }
      const { data } = await axios.post(endpoint.invokeStatusProcedure(), {
        emailId: email,
      });
      if (data.code === "0000") {
        setSuccess(data.commonResponse.msg);
        searchUserData({ preventDefault: () => { } });
        return;
      } else {
        setError(data.commonResponse.msg);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchassingBranch = async () => {
    try {
      if (!email) {
        return;
      }
      const { data } = await axios.get(endpoint.assignBranch(email));
      if (data.commonResponse.code === "0000") {
        setAssingBranch(data.assignBranchList);
        // setSuccess(data.commonResponse.msg)
        return;
      } else {
        setError(data.commonResponse.msg);
      }
    } catch (error) {
      setError(error);
    }
  };

  const resetSearchInputHandler = () => {
    setSearchQuery({ ...searchQueryInitialState });
  };

  const UserStatusUpdate = async (emailID) => {
    try {
      const { data } = await axios.put(
        endpoint.updateUserStatus(emailID, email)
      );
      if (data.code === "0000") {
        setSuccess(data.msg);
        return;
      } else {
        setError(data.commonResponse.msg);
      }
    } catch (error) {
      setError(error);
    }
  };

  const reportChangeHandlerCase = (state, { name }) => {
    if (name == "reportType") {
      state.email = "";
      state.branchName = "";
    }
  };

  const searchQueryChangeHandler = (e) =>
    changeHandlerHelper(e, searchQuery, setSearchQuery);
  const genrateReportChangeHandler = (e) =>
    changeHandlerHelper(
      e,
      genrateReportBody,
      setGenrateReportBody,
      reportChangeHandlerCase
    );

  return {
    searchQuery,

    query,
    genrateReportBody,
    setGenrateReportBody,
    genrateReportChangeHandler,
    fetchBranchList,
    searchUserData,
    searchQueryChangeHandler,
    generateMISReport,
    removeRecordHandler,
    fetchassingBranch,
    resetSearchInputHandler,
    fetchUserDetails,

    formatDate,
    setQuery,
    UserStatusUpdate,
  };
};

export default useFetchDataHooks;
