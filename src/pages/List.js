import React, { useEffect } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userlist } from "../redux/UserListSlice/UserListSlice";

export default function List() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.list.user);
  const { status, error } = useSelector((state) => state.list);
  console.log(data, "this is data atalist");

  useEffect(() => {
    let tokenNum = localStorage.getItem("user");
    let token = { token: tokenNum };
    dispatch(userlist(token));
  }, [dispatch]);

  const columns = [
    {
      title: "#",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneno",
      key: "phoneno",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },

    {
      title: "Action",
      render: (item) => (
        <>
          <div className="flex gap-1 text-center justify-center">
            <Link to="#">
              <Trash2 color="#ff0000" size={16} />
            </Link>
          </div>
        </>
      ),
      key: "action",
      width: 90,
    },
  ];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
          <div>
            <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              List
            </h3>
          </div>
        </div>
        {data && (
          <div className="bg-white">
            <div className="p-4 rounded-lg dark:border-gray-700 ">
              <div className="flex justify-end mb-3 p-2">
                <Link
                  to="/Stepperform"
                  className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                >
                  Add
                </Link>
              </div>
              <Table cols={columns} data={data} />
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
