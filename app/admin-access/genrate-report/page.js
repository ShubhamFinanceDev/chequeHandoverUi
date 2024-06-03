"use client";

import React, { useState, useEffect } from "react";
import useFetchDataHooks from "@/hooks/useFetchDataHooks";
import { SelectWithLabel } from "@/components/core/Input";
import { useSelector } from "react-redux";

const GenerateReport = () => {
  const { email } = useSelector((state) => state.authSlice);
  const {assingBranch, userDetails: { userDetailResponse },} = useSelector((state) => state.globalSlice);
  const { genrateReportBody, genrateReportChangeHandler, generateMISReport, fetchUserDetails } = useFetchDataHooks();
  const [reportType, setReportType] = useState("");
  const { fetchassingBranch } = useFetchDataHooks();

  useEffect(() => {
    fetchassingBranch();
    fetchUserDetails();
  }, [email]);

  const handleReportTypeChange = (e) => {
     setReportType(e.target.value);
      genrateReportChangeHandler(e); 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
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
              className={["col-12 mb-2", "col-12", "col-12"]}
            ></SelectWithLabel>
          </div>
        </div>

        {reportType === "user-wise" && (
          <div className="col-md-4">
            <div className="form-group">
              <SelectWithLabel
                feilds={{
                  label: "Email :",
                  name: "email",
                  options: userDetailResponse?.map((d) => ({
                    name: d.emailId,
                    value: d.emailId,
                  })),
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
                className={["col-12 mb-2", "col-12", "col-12"]}
              />
            </div>
          </div>
        )}

        {reportType === "branch-wise" && (
          <div className="col-md-4">
            <div className="form-group">
              <SelectWithLabel
                feilds={{
                  label: "Branch Name :",
                  name: "branchName",
                  options: assingBranch.map((d) => ({ name: d, value: d })),
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
                className={["col-12 mb-2", "col-12", "col-12"]}
              />
            </div>
          </div>
        )}

        <div className="col-md-4 mt-4">
          <button className="btn btn-primary" onClick={generateMISReport}>
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
