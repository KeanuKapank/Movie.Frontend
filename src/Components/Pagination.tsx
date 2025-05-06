import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationProps {
  handleChangeEvent: (e: React.ChangeEvent<unknown>, val: number) => void;
}

export default function PaginationCom({ handleChangeEvent }: PaginationProps) {
  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        className="pagination-override"
        count={10}
        onChange={handleChangeEvent}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
