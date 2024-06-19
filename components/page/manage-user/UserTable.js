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
  const { userDetails: { userDetailResponse }, } = useSelector((state) => state.globalSlice);
  const { fetchUserByID } = useAdminFormHooks();

  const handleSeeMore = (branches) => {
    alert(`Assigned Branches: ${branches.join(", ")}`);
  };

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
            "Employee Code",
            "Name",
            "EmailID",
            "Creation Date",
            // "Mobile Number",
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
              const branches = m.assignBranches;
              const displayBranches = branches.length > 2 ?
                `${branches.slice(0, 2).join(", ")}` :
                branches.join(",");
              return (
                <tr key={`userdata__${m.id}`}>
                  <td>{m.empCode}</td>
                  <td>{m.firstName} {m.lastName}</td>
                  <td>{m.emailId}</td>
                  <td>{formatDate(m.createDate)}</td>
                  {/* <td>{m.mobileNo}</td> */}
                  <td>
                    {displayBranches}
                    {branches.length > 2 && (
                      <button
                        className="btn btn- p-0 seemore"
                        onClick={() => handleSeeMore(branches)}
                      >.see more
                      </button>
                    )}
                  </td>
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
                    userBodyDefaultHandler(JSON.parse(JSON.stringify(m)));
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
