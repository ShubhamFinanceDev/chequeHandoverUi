import React from "react";
import Table from "@/components/core/Input/Table";
import useFetchDataHooks from "@/hooks/useFetchDataHooks";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const UserTable = (props) => {
    const {showFormHandler} = props
    const {
        query,
        setQuery,
        formatDate,
        UserStatusUpdate,
      } = useFetchDataHooks();
      const {
        userDetails: { userDetailResponse },
      } = useSelector((state) => state.globalSlice);
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
            "Name",
            "EmailID",
            "Creation Date",
            "Deactivation Date",
            "Mobile Number",
            "Assign Branch",
            "Last Login",
            "Status",
            "Edit",
          ]}
          className="mt-3"
        >
          {userDetailResponse
            ?.filter((m) =>
              `${m.firstname} ${m.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase())
            )
            .map((m) => {
              return (
                <tr key={`userdata__${m.id}`}>
                  <td>
                    {m.firstname} {m.lastName}
                  </td>
                  <td>{m.emailId}</td>
                  <td>{m.createDate}</td>
                  <td>{m.Deactivationdate}</td>
                  <td>{m.mobileNo}</td>
                  <td>{m.assignBranches.join(", ")}</td>
                  <td>{formatDate(m.lastLogin)}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      defaultChecked={!m.enabled ? true : false}
                      onChange={() => UserStatusUpdate(m.email)}
                    />
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
