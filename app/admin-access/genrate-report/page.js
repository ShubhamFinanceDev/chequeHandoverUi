"use client";

import React, { useState, useEffect } from "react";
import useFetchDataHooks from "@/hooks/useFetchDataHooks";
import { SelectWithLabel, InputWithLabel } from "@/components/core/Input";
import { useSelector } from "react-redux";

const GenerateReport = () => {
  const { email } = useSelector((state) => state.authSlice);
  const { assingBranch, userDetails: { userDetailResponse } } = useSelector((state) => state.globalSlice);
  const { genrateReportBody, genrateReportChangeHandler, genrateReportInitialState, setGenrateReportBody, generateMISReport, fetchUserDetails, fetchassingBranch } = useFetchDataHooks();
  const [reportType, setReportType] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchassingBranch();
    fetchUserDetails();
  }, [email]);

  useEffect(() => {
    setFormErrors({});
  }, [reportType]);

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
    genrateReportChangeHandler(e);
    setGenrateReportBody((prevState) => ({
      ...prevState,
      status: ""
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      generateMISReport();
    }
  };
  const handleReset = () => {
    setReportType("");
    setGenrateReportBody({
      ...genrateReportInitialState
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};

    const checkRequiredField = (field, message) => {
      if (!genrateReportBody[field]) {
        errors[field] = message;
      }
    };

    switch (reportType) {
      case "daily-report":
        checkRequiredField('selectedDate', 'Selected date is required.');
        break;
      case "user-wise":
        checkRequiredField('email', 'Email is required.');
        checkRequiredField('status', 'Issued type is required.');
        break;
      case "branch-wise":
        checkRequiredField('status', 'Issued type is required.');
        checkRequiredField('branchName', 'Branch name is required.');
        if (genrateReportBody.status !== 'not-issued' && !genrateReportBody.selectedDate && (!genrateReportBody.fromDate || !genrateReportBody.toDate)) {
          errors.selectedDate = "Either select a date or specify from and to dates.";
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };




  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-2 form-group">
              <SelectWithLabel
                feilds={{
                  label: "Report Type",
                  name: "reportType",
                  type: "select",
                  options: [
                    { name: "Daily Report", value: "daily-report" },
                    { name: "User-wise Report", value: "user-wise" },
                    { name: "Branch-wise Report", value: "branch-wise" },
                  ],
                  isRequired: true,
                }}
                state={genrateReportBody}
                onChangeHandler={handleReportTypeChange}
              />
            </div>

            <div className=" col-md-2 form-group">
              <SelectWithLabel
                feilds={{
                  label: "Email :",
                  name: "email",
                  options: userDetailResponse?.map((d) => ({
                    name: d.emailId,
                    value: d.emailId,
                  })),
                  isDisabled: reportType === "daily-report" || reportType === "branch-wise",
                  isReadOnly: reportType === "daily-report" || reportType === "branch-wise"
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
              {!genrateReportBody.email && formErrors.email && (
                <span className="text-danger">{formErrors.email}</span>
              )}
            </div>

            <div className="col-md-2 form-group">
              <SelectWithLabel
                feilds={{
                  label: "Issued Type :",
                  name: "status",
                  type: "select",
                  options: [
                    { name: "Issued", value: "issued" },
                    { name: "Not Issued", value: "not-issued" },
                  ],
                  isDisabled: reportType === "daily-report",
                  isReadOnly: reportType === "daily-report"
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
              {!genrateReportBody.status && formErrors.status && (
                <span className="text-danger">{formErrors.status}</span>
              )}
            </div>
            <div className="col-md-2">

              <SelectWithLabel
                feilds={{
                  label: "Branch Name :",
                  name: "branchName",
                  options: assingBranch.map((d) => ({ name: d, value: d })),
                  isDisabled: reportType === "user-wise" || reportType === "daily-report",
                  isReadOnly: reportType === "user-wise" || reportType === "daily-report"
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
              {!genrateReportBody.branchName && formErrors.branchName && (
                <span className="text-danger">{formErrors.branchName}</span>
              )}


            </div>
            <div className="col-md-2">
              <InputWithLabel
                feilds={{
                  label: "From",
                  name: "fromDate",
                  type: "date",
                  isDisabled: reportType === "daily-report" || genrateReportBody.status === "not-issued" || genrateReportBody.selectedDate,
                  isReadOnly: reportType === "daily-report" || genrateReportBody.status === "not-issued" || genrateReportBody.selectedDate
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
            </div>
            <div className="col-md-2">
              <InputWithLabel
                feilds={{
                  label: "To",
                  name: "toDate",
                  type: "date",
                  isDisabled: reportType === "daily-report" || genrateReportBody.status === "not-issued" || genrateReportBody.selectedDate,
                  isReadOnly: reportType === "daily-report" || genrateReportBody.status === "not-issued" || genrateReportBody.selectedDate
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
            </div>
            <div className="col-md-2 form-group">

              <InputWithLabel
                feilds={{
                  label: "Selected Date",
                  name: "selectedDate",
                  type: "date",
                  isDisabled: genrateReportBody.status === "not-issued" || genrateReportBody.fromDate || genrateReportBody.toDate,
                  isReadOnly: genrateReportBody.status === "not-issued" || genrateReportBody.fromDate || genrateReportBody.toDate,
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
            </div>

            {!genrateReportBody.selectedDate && !genrateReportBody.fromDate && !genrateReportBody.toDate && formErrors.selectedDate && (
              <span className="text-danger">{formErrors.selectedDate}</span>
            )}


            <div className="col-md-4 mt-4 d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                Generate Report
              </button>

              <button className="btn btn-secondary " type="reset" onClick={handleReset}>
                Reset
              </button>


            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReport;
