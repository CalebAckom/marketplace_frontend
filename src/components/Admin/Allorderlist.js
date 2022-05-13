import React, { useEffect, useState, useMemo } from "react";
import "../../assets/css/admin.css";
import ProductService from "../../../src/services/ProductService";
import Pagination from "../../../src/components/Pagination/Pagination";
import { CSVLink } from "react-csv";


const Allorderlist = () => {
  let [allorderlist, setAllOrderList] = useState([]);
  const [filteredorders, setFilteredOrders] = useState([]);
  const [downloadarr, setDownloadArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalordercount, setTotalOrderCount] = useState(0);
  let PageSize = allorderlist.length < 30 ? 30 : 30;
  const [searchorders, setSearchOrders] = useState("");

  const getorderdata = async () => {
    const data = await ProductService.getOrdersAdmin(
      `${currentPage}`,
      `${searchorders}`
    );
    setAllOrderList(data?.data?.results);
    setTotalOrderCount(data?.data?.count);
  };

  const getorderdownload = async () => {
    const data = await ProductService.getdownloadOrdersAdmin();
    setDownloadArr(data?.data);
  };

  const moveToPage = (page) => {
    getorderdata();
    setCurrentPage(page);
  };

  const searchOrderInfo = (searchValue) => {
    setSearchOrders(searchValue);
    if (searchorders !== "") {
      const filteredOrderData = allorderlist.filter((item) => {
        return (
          item.owner_email
            ?.toLowerCase()
            .includes(searchorders.toLowerCase()) ||
          item.owner_name?.toLowerCase().includes(searchorders.toLowerCase()) ||
          item.name?.toLowerCase().includes(searchorders.toLowerCase()) ||
          item.owner_phone?.toLowerCase().includes(searchorders.toLowerCase())
        );
      });
      setFilteredOrders(filteredOrderData);
    } else {
      setFilteredOrders(allorderlist);
    }
  };

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allorderlist.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    window.scroll(0, 0);
    getorderdownload();
    getorderdata();
    moveToPage(currentPage);
  }, [currentPage, searchorders]);

  return (
    <>
      <div class="col-md-12">
        <div class="fs-5 fw-bold mt-22">All Order List</div>
        <div
          class="d-flex flex-row position-relative mt-3 mb-2"
          style={{ width: "98%" }}
        >
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="form-control border-radius-0"
              placeholder="Search for item..."
              onChange={(e) => searchOrderInfo(e.target.value)}
            />
          </label>

          <button
            class="btn position-absolute top-0 end-0 text-white"
            style={{ backgroundColor: "#11468F" }}
          >
            <CSVLink
              className="text-decoration-none text-white"
              data={downloadarr}
            >
              Download List
            </CSVLink>
          </button>
        </div>
        <div
          style={{
            height: "500px",
            overflow: "auto",
            // marginTop: "2px",
          }}
        >
          <table
            responsive
            id="orders-table"
            class="table ghg"
            style={{ backgroundColor: "#EFEFEF" }}
          >
            <thead
              class="thead-white"
              style={{ zIndex: "1", backgroundColor: "#eff4ff" }}
            >
              <tr>
                <th>No. </th>
                <th>Full Name</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            {searchorders.length > 1 ? (
              filteredorders.length === 0 ? (
                <div class="fs-6 text-center">The List is Empty</div>
              ) : (
                filteredorders.map((item, ind) => (
                  <tbody key={item.uuid}>
                    <tr>
                      <th>{(PageSize * Math.max(0, (currentPage - 1))) + (ind + 1)}</th>
                      <td>{item.owner_name}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                ))
              )
            ) : (
              
              allorderlist.map((item, ind) => (
                <tbody key={item.uuid}>
                  <tr>
                    <th>{(PageSize * Math.max(0, (currentPage - 1))) + (ind + 1)}</th>
                    <td>{item.owner_name}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalordercount}
            pageSize={PageSize}
            onPageChange={moveToPage}
          />
        </div>
      </div>
    </>
  );
};

export default Allorderlist;
