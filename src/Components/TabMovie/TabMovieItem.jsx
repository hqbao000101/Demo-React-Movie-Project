import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { theaterServ } from "../../services/theaterServices";
import moment from "moment/moment";

const TabMovieItem = ({ maHeThongRap }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    theaterServ
      .getAllMovieSchedules(maHeThongRap)
      .then((res) => {
        setSchedule(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maHeThongRap]);

  const renderTabMovieItem = () => {
    return schedule[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div className="text-left w-80">
            <p className="font-medium text-green-600 truncate">
              {item.tenCumRap}
            </p>
            <p className="truncate">{item.diaChi}</p>
            <button className="mt-2 font-medium text-red-500">
              [Chi tiết]
            </button>
          </div>
        ),
        key: index,
        children: (
          <div className="space-y-5">
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div key={index} className="flex py-5">
                    <div className="w-2/12">
                      <img
                        src={item.hinhAnh}
                        alt=""
                        className="object-cover h-56"
                      />
                    </div>
                    <div className="w-10/12 ps-5">
                      <h3 className="mb-3 font-bold">{item.tenPhim}</h3>
                      {item.lstLichChieuTheoPhim
                        .slice(0, 5)
                        .map((suatChieu, index) => {
                          return (
                            <p key={index}>
                              {moment(suatChieu.ngayChieuGioChieu).format(
                                "DD/MM/YYYY, h:mm"
                              )}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                );
              }
              return "";
            })}
          </div>
        ),
      };
    });
  };

  return (
    <Tabs
      tabPosition={"left"}
      items={renderTabMovieItem()}
      style={{ maxHeight: "500px", overflowY: "scroll" }}
    />
  );
};

export default TabMovieItem;
