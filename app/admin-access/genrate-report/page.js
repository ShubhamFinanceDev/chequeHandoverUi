"use client";

import React, { useState, useEffect } from "react";
import useFetchDataHooks from "@/hooks/useFetchDataHooks";
import { SelectWithLabel } from "@/components/core/Input";
import { useSelector } from "react-redux";
import { InputWithLabel } from "@/components/core/Input";

const GenerateReport = () => {
  const { email } = useSelector((state) => state.authSlice);
  const { assingBranch, userDetails: { userDetailResponse } } = useSelector((state) => state.globalSlice);
  const { genrateReportBody, genrateReportChangeHandler, generateMISReport, fetchUserDetails, fetchassingBranch } = useFetchDataHooks();
  const [reportType, setReportType] = useState("");

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
                  // { name: "From-date To-date", value: "fromdate-todate" },
                  // { name: "Date-wise Report", value: "selected-date" },
                  // { name: "issued Report", value: "issued" },
                  // { name: "Not issued  Report", value: "not-issued" },
                ],
                isRequired: true,
              }}
              state={genrateReportBody}
              onChangeHandler={handleReportTypeChange}
              className={["col-12 mb-2", "col-12", "col-12"]}
            />
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

        {/* {reportType === "fromdate-todate" && (
          <>
            <div className="col-md-2">
              <InputWithLabel
                feilds={{
                  label: "From",
                  name: "fromDate",
                  type: "date",
                  isRequired: true,
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
                  isRequired: true,
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
            </div>
          </>
        )}

        {reportType === "selected-date" && (
          <>

            <div className="col-md-2">
              <InputWithLabel
                feilds={{
                  label: "Selected Date",
                  name: "selectedDate",
                  type: "date",
                  isRequired: true,
                }}
                state={genrateReportBody}
                onChangeHandler={genrateReportChangeHandler}
              />
            </div>
          </>
        )}
 */}
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
