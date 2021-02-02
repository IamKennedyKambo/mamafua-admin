import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { base_url } from "../../../urls";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    margin: "0 auto",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={6}>
          <Avatar
            alt="Product"
            src={`${base_url}/${product.imageUrl}`}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Grid className={classes.grid} align="center" container>
          <Grid item xs={4}>
            <Typography align="center" color="textPrimary" variant="body1">
              On site
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" color="textPrimary" variant="body1">
              Off site
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" color="textPrimary" variant="body1">
              Machine
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" color="textPrimary" variant="body1">
              {`${product.onSitePrice} Ksh`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" color="textPrimary" variant="body1">
              {`${product.offSitePrice} Ksh`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" color="textPrimary" variant="body1">
              {`${product.machinePrice} Ksh`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <EditIcon className={classes.statsIcon} size="20" color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              Edit
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <DeleteIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              Delete
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
