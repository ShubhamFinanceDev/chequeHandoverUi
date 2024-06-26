import React from "react";
import Table from "@/components/core/Input/Table";
import useFetchDataHooks from "@/hooks/useFetchDataHooks";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import icons from "@/env/icons";
import useAdminFormHooks from "@/hooks/useAdminFormHooks";

const UserTable = (props) => {
  const { showFormHandler, userBodyDefaultHandler } = props
  const {
    query,
    setQuery,
    formatDate,
    UserStatusUpdate,
  } = useFetchDataHooks();
  const {
    userDetails: { userDetailResponse },
  } = useSelector((state) => state.globalSlice);
  const { fetchUserByID } = useAdminFormHooks()
  return (
    <div>
      <>
        <div className="row">
          <div className="col-5">
            <input
              type="text"
              placeholder="Search by name"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col-7 d-flex justify-content-end">
            <button
              className="btn btn-outline-primary"
              onClick={showFormHandler}
            >
              Add Users
            </button>
          </div>
        </div>

        <Table
          header={[
            "EmployeeCode",
            "Name",
            "EmailID",
            "Creation Date",
            "Mobile Number",
            "Assign Branch",
            "Created By",
            "Last Login",
            "Status",
            "Edit",
          ]}
          className="mt-3"
        >
          {userDetailResponse
            ?.filter((m) =>
              `${m.firstName} ${m.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase())
            )
            .map((m) => {
              return (
                <tr key={`userdata__${m.id}`}>
                  <td>
                    {m.empCode}
                  </td>

                  <td>
                    {m.firstName} {m.lastName}
                  </td>
                  <td>{m.emailId}</td>
                  <td>{formatDate(m.createDate)}</td>
                  <td>{m.mobileNo}</td>
                  <td>{m.assignBranches.join(", ")}</td>
                  <td>{m.createdBy}</td>
                  <td>{formatDate(m.lastLogin)}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      defaultChecked={!m.enabled ? true : false}
                      onChange={() => UserStatusUpdate(m.emailId)}
                    />
                  </td>
                  <td onClick={() => {
                    showFormHandler();
                    userBodyDefaultHandler(JSON.parse(JSON.stringify(m)))
                  }}>
                    <img src={icons.Icon2} alt="icon" />
                  </td>
                </tr>
              );
            })}
        </Table>
      </>
    </div>
  );
};

export default UserTable;
