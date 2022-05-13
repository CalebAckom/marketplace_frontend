import React from "react";
import {
  EmailOutlined,
  PhoneInTalkOutlined,
  CalendarTodayOutlined,
  LockOutlined,
  GroupOutlined,
  PlaceOutlined,
  MapOutlined,
  LanguageOutlined,
  CategoryOutlined,
  ExploreOutlined,
} from "@mui/icons-material";

const DetailSnipet = ({ title, value }) => {
  return (
    <span className="detail-snipet">
      <p className="detail-title">{title}</p>
      <span className="detail-container">
        {title === "Email Address" ? (
          <EmailOutlined className="detail-icon" />
        ) : title === "Phone Number" ? (
          <PhoneInTalkOutlined className="detail-icon" />
        ) : title === "Date of Birth" ? (
          <CalendarTodayOutlined className="detail-icon" />
        ) : title === "Privacy Level" ? (
          <LockOutlined className="detail-icon" />
        ) : title === "Gender" ? (
          <GroupOutlined className="detail-icon" />
        ) : title === "Town" ? (
          <PlaceOutlined className="detail-icon" />
        ) : title === "Region" ? (
          <MapOutlined className="detail-icon" />
        ) : title === "Website" ? (
          <LanguageOutlined className="detail-icon" />
        ) : title === "Category" ? (
          <CategoryOutlined className="detail-icon" />
        ) : (
          <ExploreOutlined className="detail-icon" />
        )}
        <span className="value">{value}</span>
      </span>
    </span>
  );
};

export default DetailSnipet;
