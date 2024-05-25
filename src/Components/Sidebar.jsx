import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import { Category } from "@mui/icons-material";

const Sidebar = ({ selectedCategory, setselectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "94%" },
      flexDirection: { md: "column" },
      position: "sticky",
      top: 64,
      zIndex: 1,
      paddingBottom: "20px",
    }}
  >
    {categories.map((c) => (
      <button
        className="category-btn"
        onClick={() => setselectedCategory(c.name)}
        style={{
          background: c.name === selectedCategory && "#FC1503",
          color: "white",
          textAlign: "left",
          whiteSpace: "nowrap",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        key={c.name}
      >
        <span
          style={{
            color: c.name === selectedCategory ? "White" : "Red",
            marginRight: "30px",
            opacity: c.name === selectedCategory ? "1" : "0.9",
          }}
        >
          {c.icon}
        </span>
        <span>{c.name}</span>
      </button>
    ))}
  </Stack>
);

export default Sidebar;
