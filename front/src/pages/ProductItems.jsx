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
  Button,
  Input,
  Pagination,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import API from "../utils/API";
import AddItem from "../components/AddItem";
import { Link, useParams } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import { Add } from "@material-ui/icons";
import { useAuth } from "../hooks/useAuth";

export default function Items() {
  const { user } = useAuth();
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);

  const { id } = useParams();
  const { datawithLink, data, error, loading, setData } = UseFetch(
    `proudct_types/${id}`,
    page,
    `&sn=${searchText}`
  );
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  function handleCheck(item) {
    API.put(
      `items/${item.id}`,
      { sold: !item.sold },

      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then()
      .catch((res) => console.log(res));
    setData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === item.id ? { ...product, sold: !product.sold } : product
      )
    );
  }
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <AddItem
          product_type_id={id}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        />
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            <Add />
          </Button>

          <TextField
            align="right"
            label="Serial Number"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Item </TableCell>
              <TableCell align="left">SN</TableCell>
              <TableCell align="left">Sold</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <>
                {data &&
                  data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.product_name}
                      </TableCell>
                      <TableCell align="left">{row.serial_nb}</TableCell>
                      <TableCell align="left">
                        <input
                          checked={row.sold == 1 ? true : false}
                          onChange={() => handleCheck(row)}
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value="Bike"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Button variant="contained" color="warning"> X</Button>
                        <Button variant="contained">Edit</Button>
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
