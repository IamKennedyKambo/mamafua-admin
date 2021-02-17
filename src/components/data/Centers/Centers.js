import React, { useState } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "../../Page";
import { base_url } from "../../../urls";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Profile from "../../uploads/employees/Profile";
import Toolbar from "./Toolbar";
import CenterCard from "./CenterCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
  productCard: {
    height: "100%",
  },
}));

const queryClient = new QueryClient();

const fetchEmployees = async () => {
  const res = await fetch(`${base_url}/centers`);
  return res.json();
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Employees />
    </QueryClientProvider>
  );
}

const Employees = () => {
  const classes = useStyles();

  const [page] = useState(1);

  const {
    // isLoading,
    // isError,
    // error,
    data,
    // isFetching,
    // isPreviousData,
  } = useQuery(["centers", page], () => fetchEmployees(), {
    keepPreviousData: true,
  });

  return (
    <Router>
      <Page className={classes.root} title="Centers">
        {/* add handleopen here as props, but open and handleclose to remain her but passed into services etc */}
        <Toolbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route
            path="/centers"
            render={(props) => (
              <Products {...props} data={data} classes={classes} />
            )}
          />
          <Route
            path="/upload-profile"
            render={(props) => <Profile {...props} />}
          />
        </main>
      </Page>
    </Router>
  );
};

const Products = ({ data, classes }) => {
  return (
    <div>
      <Box mt={3}>
        <Grid container spacing={3}>
          {data && console.log(data)}
          {data &&
            data.centers.map((center) => (
              <Grid item key={center._id} lg={3} md={6} xs={12}>
                <CenterCard
                  className={classes.productCard}
                  center={center}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination color="primary" count={3} size="small" />
      </Box>
    </div>
  );
};
