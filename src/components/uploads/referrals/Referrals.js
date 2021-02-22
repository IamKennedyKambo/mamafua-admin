import { Container, Fab, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { base_url } from "../../../urls";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "20px",
    padding: 20,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "40ch",
  },
  image: {
    gridColumn: "1 / 2",
  },
  button: {
    position: "fixed",
    bottom: 50,
    right: 30,
    zIndex: 10,
  },
}));

const Referrals = () => {
  const classes = useStyles();

  const [referral, setReferral] = useState({
    referrer: "",
    discount: "",
    validFor: "",
    code: "",
  });

  const handleChange = (prop) => (event) => {
    setReferral({ ...referral, [prop]: event.target.value });
  };

  const uploadReferral = (referral) => {
    const formData = new FormData();
    formData.append("referrer", referral.referrer);
    formData.append("discount", referral.discount);
    formData.append("validFor", referral.validFor);
    formData.append("code", referral.code);
    let url = `${base_url}/referrals/create`;
    let method = "POST";
    // if (this.state.editPost) {
    //   url = "http://localhost:8080/feed/post/" + this.state.editPost._id;
    //   method = "PUT";
    // }

    const token = localStorage.getItem("token");

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setReferral({
          referrer: "",
          discount: "",
          validFor: "",
          code: "",
        });
        // const post = {
        //   _id: resData.post._id,
        //   title: resData.post.title,
        //   content: resData.post.content,
        //   creator: resData.post.creator,
        //   createdAt: resData.post.createdAt,
        // };
        // this.setState((prevState) => {
        //   return {
        //     isEditing: false,
        //     editPost: null,
        //     editLoading: false,
        //   };
        // });
      })
      .catch((err) => {
        console.log(err);
        // this.setState({
        //   isEditing: false,
        //   editPost: null,
        //   editLoading: false,
        //   error: err,
        // });
      });
  };

  return (
    <div>
      <Container className={classes.root}>
        <TextField
          value={referral.referrer}
          fullWidth
          label="Referrer name"
          id="referrer-name"
          className={classes.textField}
          onChange={handleChange("referrer")}
          variant="outlined"
        ></TextField>
        <TextField
          value={referral.discount}
          fullWidth
          label="Discount (Ksh)"
          id="discount"
          name="offSitePrice"
          className={classes.textField}
          onChange={handleChange("discount")}
          variant="outlined"
        ></TextField>
        <TextField
          value={referral.validFor}
          fullWidth
          label="Valid for (days)"
          id="valid-for"
          className={classes.textField}
          name="valid-for"
          onChange={handleChange("validFor")}
          variant="outlined"
        ></TextField>
        <TextField
          value={referral.code}
          fullWidth
          name="code"
          label="Referral code"
          id="referral-code"
          onChange={handleChange("code")}
          className={classes.textField}
          variant="outlined"
        ></TextField>
      </Container>

      <Fab
        color="primary"
        className={classes.button}
        onClick={() => uploadReferral(referral)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Referrals;
