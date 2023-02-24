import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UseFetch from "../hooks/UseFetch";
import {
  Box,
  Button,
  Input,
  Pagination,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddTypes from "../components/AddTypes";
import AddIcon from "@mui/icons-material/Add";
export default function ProductTypes() {
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const { data, datawithLink, error, loading } = UseFetch(
    "proudct_types",
    page,
    `&name=${searchText}`
  );
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <AddTypes
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            <AddIcon />
          </Button>
          <TextField
            align="right"
            label="Search"
            value={searchText}
            style={{ right: "1rem" }}
            onChange={handleSearchTextChange}
          />
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="left">ID</TableCell>

              <TableCell align="left">image</TableCell>

              <TableCell align="left">name</TableCell>
              <TableCell align="left">desc</TableCell>
              <TableCell align="left">Count</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <>
                {data &&
                  data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                                            <TableCell align="left">{row.id}</TableCell>

                      <TableCell align="left">
                        <Box
                          component="img"
                          sx={{
                            height: 100,
                            objectFit: "contain",
                            width: 150,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                          }}
                          alt="The house from the offer."
                          src={row.image}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Link to={`/dashboard/product_types/${row.id}`}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        {row.active_products_count}
                      </TableCell>
                      <TableCell align="left">
                        <Button variant="contained">
                          X
                        </Button>
                        <Button ml="2" variant="contained">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {datawithLink && (
                  <Pagination
                    disabled={loading}
                    onChange={handlePageChange}
                    count={datawithLink.last_page}
                    page={page}
                  />
                )}
              </>
            ) : (
              <>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{"..."}</TableCell>
                  <TableCell align="left">{"..."}</TableCell>

                  <TableCell align="left">{"..."}</TableCell>
                  <TableCell align="left">{"..."}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
