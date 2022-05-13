import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/admin.css";
import ProfilePageService from "../../../src/services/ProfileService";
import Pagination from "../../../src/components/Pagination/Pagination";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const Deactivatedbusinesslist = () => {
  const history = useHistory();
  let [deactivatedbusinesslist, setDeactivatedBusinessList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totaldeactivatedbusinesscount, setTotalActivatedBusinessCount] =
    useState(0);
  const [
    filteredDeactivatedBusinessResults,
    setfilteredDeactivatedBusinessResults,
  ] = useState([]);
  const [searchinput, setSearchInput] = useState("");
  const [deactivatedbusinessuser, setDeactivatedBusinessUser] =
    useState("false");
  let PageSize = deactivatedbusinesslist.length < 30 ? 30 : 30;
  const [bodycheck, setBodyCheck] = useState(true);
  const [checkactive, setCheckActive] = useState();
  const [open, setOpen] = useState(false);
  let [message, setMessage] = useState("");
  const [userinfo, setUserInfo] = useState({
    userArr: [],
    response: [],
  });
  const [activatebtn, setActivateBtn] = useState(false)


  const getuserdata = async () => {
    const data = await ProfilePageService.deActivatedBusinessUser(
      `${deactivatedbusinessuser}`,
      `${currentPage}`,`${searchinput}`
    );
    setDeactivatedBusinessList(data?.data?.results);
    setTotalActivatedBusinessCount(data?.data?.count);
  };

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  const activateDeactivateUsers = async () => {
    const data = await ProfilePageService.activateDeactivateUser({
      accounts: userinfo.response,
      is_active: bodycheck,
    });
    setCheckActive(data?.data?.is_active);
  };

  const activateSelectedUserData = () => {
    setOpen(true);
    setMessage(userinfo.response);
    activateDeactivateUsers();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { userArr } = userinfo;

    console.log(`${value} is ${checked}`);
    // Case 1 : The user checks the box
    if (checked) {
      if(activatebtn === false){ setActivateBtn(true)}
      setUserInfo({
        userArr: [...userArr, Number(value)],
        response: [...userArr, Number(value)],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        userArr: userArr.filter((q) => q !== Number(value)),
        response: userArr.filter((q) => q !== Number(value)),
      });
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchinput !== "") {
      const filteredActivatedBusinessData = deactivatedbusinesslist.filter(
        (item) => {
          return item.user.email?.toLowerCase().includes(searchinput.toLowerCase()) || 
          item.title?.toLowerCase().includes(searchinput.toLowerCase()) || 
          item.name?.toLowerCase().includes(searchinput.toLowerCase());
        }
      );
      setfilteredDeactivatedBusinessResults(filteredActivatedBusinessData);
    } else {
      setfilteredDeactivatedBusinessResults(deactivatedbusinesslist);
    }
  };

  const moveToPage = (page) => {
    getuserdata();
    setCurrentPage(page);
  };

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return deactivatedbusinesslist.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    window.scroll(0, 0);
    setActivateBtn(false)
    setBodyCheck(bodycheck);
    getuserdata();
    moveToPage(currentPage);
    setDeactivatedBusinessUser(deactivatedbusinessuser);
  }, [currentPage, deactivatedbusinessuser, searchinput]);

  return (
    <>
      <div class="col-md-12">
        <div class="fs-5 fw-bold mt-22">Deactivated Business user List</div>
        <>
          <Snackbar
            anchorOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            open={open}
            autoHideDuration={5000}
            message={`User(s) with Selected ID'(s) ${message} activated`}
            onClose={handleToClose}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleToClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </>
        <div
          class="d-flex flex-row position-relative mt-3 mb-2"
          style={{ width: "98%" }}
        >
          <div className="">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="form-control border-radius-0"
                placeholder="Search business user..."
                onChange={(e) => searchItems(e.target.value)}
              />
            </label>
          </div>
          <button
            onClick={activateSelectedUserData}
            class="btn position-absolute top-0 end-0 text-white "
            style={{ backgroundColor: "#11468F" }}
            disabled={!activatebtn}
          >
            Activate
          </button>
        </div>
        <div
          style={{
            height: "480px",
            overflow: "auto",
            // marginTop: "2px",
          }}
        >
          <table
            class="table"
            style={{ backgroundColor: "#EFEFEF" }}
          >
            <thead
              class="thead-white"
              style={{ backgroundColor: "#eff4ff" }}
            >
              <tr>
                <th>No. </th>
                <th></th>
                <th>ID</th>
                <th>Full Name</th>
                <th>E-mail</th>
                <th>Phone Number</th>
                <th>Location</th>
              </tr>
            </thead>
            {searchinput.length > 1 ? (
              filteredDeactivatedBusinessResults.length === 0 ? (
                <div class="fs-6 text-center">No Such User</div>
              ) : (
                filteredDeactivatedBusinessResults.map((users, ind) => (
                  <tbody key={users.user.id}>
                    <tr>
                    <th>{(PageSize * Math.max(0, (currentPage - 1))) + (ind + 1)}</th>
                      <th>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value={users.user.id}
                            id={users.user.id}
                            onChange={handleChange}
                          />
                        </div>
                      </th>
                      <td>{users.user.id}</td>
                      <td>
                        {users.first_name} &nbsp;{users.last_name}
                      </td>
                      <td>{users.user.email}</td>
                      <td>{users.phone_number2}</td>
                      <td>{users.gps_location}</td>
                    </tr>
                  </tbody>
                ))
              )
            ) : deactivatedbusinesslist.length === 0 ? (
              <div class="fs-6 text-center">No user Found in this list</div>
            ) : (
              deactivatedbusinesslist.map((users, ind) => (
                <tbody key={users.user.id}>
                  <tr>
                  <th>{(PageSize * Math.max(0, (currentPage - 1))) + (ind + 1)}</th>
                    <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={users.user.id}
                          id={users.user.id}
                          onChange={handleChange}
                        />
                      </div>
                    </th>
                    <td>{users.user.id}</td>
                    <td>
                      {users.first_name} &nbsp;{users.last_name}
                    </td>
                    <td>{users.user.email}</td>
                    <td>{users.phone_number2}</td>
                    <td>{users.gps_location}</td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totaldeactivatedbusinesscount}
            pageSize={PageSize}
            onPageChange={moveToPage}
          />
        </div>
      </div>
    </>
  );
};

export default Deactivatedbusinesslist;
