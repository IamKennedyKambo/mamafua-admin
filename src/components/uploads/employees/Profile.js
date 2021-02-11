import { Container, Fab, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { base_url } from "../../../urls";
import ImageUploader from "react-images-upload";
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

const Profile = () => {
  const classes = useStyles();

  const [service, setService] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    available: true,
    status: "",
    centerId: "",
    imageUrl: File,
  });

  const [pictures, setPictures] = useState(null);

  const onDrop = (picture) => {
    setPictures(picture);
  };

  const handleChange = (prop) => (event) => {
    setService({ ...service, [prop]: event.target.value });
  };

  const appendImage = () => {
    if (pictures) {
      setService({ ...service, imageUrl: pictures[0] });
    }
  };

  const uploadService = (service) => {
    appendImage();
    const formData = new FormData();
    formData.append("firstName", service.firstName);
    formData.append("lastName", service.lastName);
    formData.append("centerId", service.centerId);
    formData.append("phone", service.phone);
    formData.append("email", service.email);
    formData.append("available", service.available);
    formData.append("status", service.status);
    formData.append("imageUrl", service.imageUrl && service.imageUrl);
    let url = `${base_url}/profiles/create`;
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
        setService({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          available: true,
          status: "",
          centerId: "",
          imageUrl: File,
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
          value={service.firstName}
          fullWidth
          label="First name"
          id="first-name"
          className={classes.textField}
          onChange={handleChange("firstName")}
          variant="outlined"
        ></TextField>
        <TextField
          value={service.lastName}
          fullWidth
          label=" Last name"
          id="last-name"
          name="offSitePrice"
          className={classes.textField}
          onChange={handleChange("lastName")}
          variant="outlined"
        ></TextField>
        <TextField
          value={service.phone}
          fullWidth
          label="Phone"
          id="field-phone"
          className={classes.textField}
          name="phone"
          onChange={handleChange("phone")}
          variant="outlined"
        ></TextField>
        <TextField
          value={service.email}
          fullWidth
          name="email"
          label="Email"
          id="field-email"
          onChange={handleChange("email")}
          className={classes.textField}
          variant="outlined"
        ></TextField>
        <TextField
          value={service.status}
          fullWidth
          name="status"
          label="Status"
          id="field-status"
          onChange={handleChange("status")}
          className={classes.textField}
          variant="outlined"
        ></TextField>
        <TextField
          value={service.centerId}
          fullWidth
          type="Center"
          label="Center"
          name="centerId"
          onChange={handleChange("centerId")}
          id="field-centerId"
          className={classes.textField}
          variant="outlined"
        ></TextField>
      </Container>

      <Fab
        color="primary"
        className={classes.button}
        onClick={() => uploadService(service)}
      >
        <AddIcon />
      </Fab>

      <Container>
        <ImageUploader
          withIcon={true}
          onChange={onDrop}
          buttonText="Choose image"
          withPreview={true}
          singleImage={true}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </Container>
    </div>
  );
};

export default Profile;
