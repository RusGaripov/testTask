import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { FormControl, NativeSelect } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../redux/slices/links";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LinearColor from "./LinearColor";

export const Home = () => {
  const dispatch = useDispatch();

  const [isCopied, setIsCopied] = useState(false);

  const [copiedIndex, setCopiedIndex] = useState(null);

  const [dataPage, setDataPage] = useState(0);


  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [sort, setSort] = useState("");

  const items = useSelector((state) => state.links);

  const links = items.links.items;

  const isLinksLoading = items.links.status === "loading";

  React.useEffect(() => {
    dispatch(fetchStatistics({ rowsPerPage, dataPage, sort }));
    setCopiedIndex(null);
  }, [dataPage, sort, rowsPerPage]);

  const onDataPageChange = (page,dataPage) => {
    setDataPage(dataPage - 1);
  }

  const ascShort = () => setSort("asc_short");
  const descShort = () => setSort("desc_short");
  const ascTarget = () => setSort("asc_target");
  const descTarget = () => setSort("desc_target");
  const ascCounter = () => setSort("asc_counter");
  const descCounter = () => setSort("desc_counter");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setDataPage(0);
    setSort("");
  };

  if (isLinksLoading) {
    return <LinearColor />;
  }

  return (
    <>
      <Grid container direction="row">
        <Grid container direction="row">
          <Grid
            item
            container
            direction="row"
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Arial",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Новая ссылка
            </div>
            <ArrowUpward onClick={ascShort} />{" "}
            <ArrowDownward onClick={descShort} />
          </Grid>
          <Grid
            item
            container
            direction="row"
            xs={4}
            style={{
              fontWeight: "bold",
              fontFamily: "Arial",
              display: "flex",
              alignItems: "center",
              justifyContent: "flexStart",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flexStart",
                fontWeight: "bold",
              }}
            >
              Старая ссылка
            </div>
            <ArrowUpward onClick={ascTarget} />{" "}
            <ArrowDownward onClick={descTarget} />
          </Grid>
          <Grid
            item
            container
            direction="row"
            xs={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <p>Просмотры</p>
            <ArrowUpward onClick={ascCounter} />{" "}
            <ArrowDownward onClick={descCounter} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row">
        {links.map((link, index) => (
          <Grid container direction="row" key={index}>
            <Grid
              item
              container
              direction="row"
              xs={4}
              style={{
                display: "flex",
                margin:"auto",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {link.short}
                </div>
                {copiedIndex !== index ? (
                  <div
                    onClick={() => {
                      setCopiedIndex(index);
                    }}
                  >
                    <CopyToClipboard
                      text={"http://79.143.31.216/s/" + link.short}
                      onCopy={() => setIsCopied(true)}
                    >
                      <Button>Copy</Button>
                    </CopyToClipboard>
                  </div>
                ) : (
                  <Button disabled>Copied</Button>
                )}
              </div>
            </Grid>
            <Grid
              item
              container
              direction="row"
              xs={4}
              style={{ fontFamily: "Arial", overflow: "hidden" }}
            >
              <p>{link.target}</p>
            </Grid>
            <Grid
              item
              container
              direction="row"
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial",
              }}
            >
              <p>{link.counter}</p>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Pagination
          style={{ marginTop: "30px", marginLeft: "30px" }}
          count={10}
          onChange={onDataPageChange}
          page={dataPage + 1}
        />
        <FormControl>
          <NativeSelect
            style={{ marginTop: "25px" }}
            defaultValue={rowsPerPage}
            inputProps={{
              name: "Строк на одной странице",
              id: "uncontrolled-native",
            }}
            onChange={handleChangeRowsPerPage}
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </NativeSelect>
        </FormControl>
      </div>
    </>
  );
};
