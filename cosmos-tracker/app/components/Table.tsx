import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { fetchRowsFromTableData, getComparator } from "../utilities/helper";
import { Data, HeadCell, NeoTableData, Order } from "../utilities/types";

const tableShellStyles = {
  width: "100%",
  gridColumn: "1 / -1",
};

const paperStyles = {
  width: "100%",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  borderRadius: { xs: "12px", sm: "16px" },
  bgcolor: "#ffffff",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.05)",
  color: "#111827",
  transition: "background-color 180ms ease, border-color 180ms ease",
  "[data-theme='dark'] &": {
    borderColor: "#1e293b",
    bgcolor: "#111827",
    color: "#f8fafc",
    boxShadow: "0 1px 0 rgba(255, 255, 255, 0.04) inset",
  },
};

const tableContainerStyles = {
  maxHeight: { xs: 460, md: 560 },
  borderTop: "1px solid #e2e8f0",
  borderBottom: "1px solid #e2e8f0",
  "[data-theme='dark'] &": {
    borderColor: "#1e293b",
  },
};

const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    label: "Date",
  },
  {
    id: "id",
    numeric: false,
    label: "Id",
  },
  {
    id: "name",
    numeric: false,
    label: "Object Name",
  },
  {
    id: "isHazardous",
    numeric: false,
    label: "Hazardous",
  },

  {
    id: "missDistance",
    numeric: true,
    label: "Miss Distance (km)",
  },
  {
    id: "relativeVelocity",
    numeric: true,
    label: "Relative Velocity (kmph)",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        "& .MuiTableCell-head": {
          borderBottom: "1px solid #cbd5e1",
          bgcolor: "#f8fafc",
          color: "#475569",
          fontSize: "0.75rem",
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: 1.4,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        },
        "& .MuiTableSortLabel-root": {
          color: "#475569",
          transition: "color 180ms ease",
        },
        "& .MuiTableSortLabel-root:hover, & .MuiTableSortLabel-root.Mui-active":
          {
            color: "#6366f1",
          },
        "& .MuiTableSortLabel-icon": {
          color: "#6366f1 !important",
        },
        "[data-theme='dark'] & .MuiTableCell-head": {
          borderBottomColor: "#334155",
          bgcolor: "#0f172a",
          color: "#cbd5e1",
        },
        "[data-theme='dark'] & .MuiTableSortLabel-root": {
          color: "#cbd5e1",
        },
        "[data-theme='dark'] & .MuiTableSortLabel-root:hover, [data-theme='dark'] & .MuiTableSortLabel-root.Mui-active":
          {
            color: "#2dd4bf",
          },
        "[data-theme='dark'] & .MuiTableSortLabel-icon": {
          color: "#2dd4bf !important",
        },
      }}
    >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        minHeight: { xs: 60, sm: 68 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        sx={{
          flex: "1 1 100%",
          color: "#111827",
          fontSize: { xs: "1rem", sm: "1.125rem" },
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: 1.4,
          "[data-theme='dark'] &": {
            color: "#f8fafc",
          },
        }}
        variant="h2"
        id="tableTitle"
        component="div"
      >
        Approach Timeline
      </Typography>
    </Toolbar>
  );
}
interface EnhancedTableDataProps {
  tableData: NeoTableData;
}

export default function EnhancedTable({ tableData }: EnhancedTableDataProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const tableRows = React.useMemo(
    () => fetchRowsFromTableData(tableData),
    [tableData],
  );
  console.log("table Rows", tableRows);
  const [selected, setSelected] = React.useState<string | null>(
    tableRows?.[0]?.id,
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    setSelected(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...tableRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, tableRows],
  );

  return (
    <Box sx={tableShellStyles}>
      <Paper sx={paperStyles} elevation={0}>
        <EnhancedTableToolbar />
        <TableContainer sx={tableContainerStyles}>
          <Table
            sx={{
              minWidth: 760,
              "& .MuiTableCell-root": {
                borderBottomColor: "#e2e8f0",
                color: "#334155",
                fontFamily: "inherit",
                fontSize: "0.875rem",
                letterSpacing: 0,
                lineHeight: 1.5,
                py: 1.75,
              },
              "& .MuiTableCell-body:first-of-type": {
                color: "#111827",
                fontWeight: 700,
              },
              "& .MuiTableRow-root": {
                transition: "background-color 180ms ease",
              },
              "& .MuiTableRow-root:hover": {
                bgcolor: "rgba(99, 102, 241, 0.08)",
              },
              "& .MuiTableRow-root.Mui-selected, & .MuiTableRow-root.Mui-selected:hover":
                {
                  bgcolor: "rgba(99, 102, 241, 0.13)",
                },
              "[data-theme='dark'] & .MuiTableCell-root": {
                borderBottomColor: "#1e293b",
                color: "#cbd5e1",
              },
              "[data-theme='dark'] & .MuiTableCell-body:first-of-type": {
                color: "#f8fafc",
              },
              "[data-theme='dark'] & .MuiTableRow-root:hover": {
                bgcolor: "rgba(45, 212, 191, 0.08)",
              },
              "[data-theme='dark'] & .MuiTableRow-root.Mui-selected, [data-theme='dark'] & .MuiTableRow-root.Mui-selected:hover":
                {
                  bgcolor: "rgba(45, 212, 191, 0.13)",
                },
            }}
            aria-labelledby="tableTitle"
            size={"medium"}
            stickyHeader
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tableRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected === row.id;
                const labelId = `enhanced-table-checkbox-${index}`;
                console.log("row", row);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="menuitemradio"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.date}
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.isHazardous}</TableCell>
                    <TableCell align="right">{row.missDistance}</TableCell>
                    <TableCell align="right">{row.relativeVelocity}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            color: "#475569",
            fontFamily: "inherit",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: "0.875rem",
                letterSpacing: 0,
                m: 0,
              },
            "& .MuiTablePagination-select, & .MuiSvgIcon-root": {
              color: "#111827",
            },
            "& .MuiIconButton-root": {
              color: "#6366f1",
            },
            "& .MuiIconButton-root.Mui-disabled": {
              color: "#94a3b8",
            },
            "[data-theme='dark'] &": {
              color: "#cbd5e1",
            },
            "[data-theme='dark'] & .MuiTablePagination-select, [data-theme='dark'] & .MuiSvgIcon-root":
              {
                color: "#f8fafc",
              },
            "[data-theme='dark'] & .MuiIconButton-root": {
              color: "#2dd4bf",
            },
            "[data-theme='dark'] & .MuiIconButton-root.Mui-disabled": {
              color: "#475569",
            },
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
