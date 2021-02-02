import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { local_url } from "../../../urls";
import ImageUploader from "react-images-upload";

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
}));

const Profile = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({
    name: "",
    onSitePrice: 0,
    offSitePrice: 0,
    machinePrice: 0,
    offerPc: 0,
    description: "",
    imageUrl: File,
  });

  const [pictures, setPictures] = useState(null);

  const onDrop = (picture) => {
    setPictures(picture);
  };

  const handleChange = (prop) => (event) => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  const appendImage = () => {
    if (pictures) {
      setProfile({ ...profile, imageUrl: pictures[0] });
    }
  };

  const uploadProfile = (service) => {
    appendImage();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("onSitePrice", profile.onSitePrice);
    formData.append("offSitePrice", profile.offSitePrice);
    formData.append("machinePrice", profile.machinePrice);
    formData.append("offerPc", profile.offerPc);
    formData.append("description", profile.description);
    formData.append("imageUrl", profile.imageUrl && profile.imageUrl);
    let url = `${local_url}/profiles/create`;
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
        setProfile({
          name: "",
          onSitePrice: 0,
          offSitePrice: 0,
          machinePrice: 0,
          offerPc: 0,
          description: "",
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
          value={profile.name}
          fullWidth
          label="Name"
          id="field-name"
          className={classes.textField}
          onChange={handleChange("name")}
          variant="outlined"
        ></TextField>
        <TextField
          value={profile.offSitePrice}
          fullWidth
          type="Number"
          label="Off-site price"
          id="field-offsite"
          name="offSitePrice"
          className={classes.textField}
          onChange={handleChange("offSitePrice")}
          variant="outlined"
        ></TextField>
        <TextField
          value={profile.onSitePrice}
          fullWidth
          type="Number"
          label="On-site Price"
          id="field-onsite"
          className={classes.textField}
          name="onSitePrice"
          onChange={handleChange("onSitePrice")}
          variant="outlined"
        ></TextField>
        <TextField
          value={profile.machinePrice}
          fullWidth
          type="Number"
          name="machinePrice"
          label="Machine Price"
          id="field-machine"
          onChange={handleChange("machinePrice")}
          className={classes.textField}
          variant="outlined"
        ></TextField>
        <TextField
          value={profile.offerPc}
          fullWidth
          type="Number"
          name="offerPc"
          label="Offer Percent"
          id="field-offerPc"
          onChange={handleChange("offerPc")}
          className={classes.textField}
          variant="outlined"
        ></TextField>
        <TextField
          value={profile.description}
          fullWidth
          label="Description"
          name="description"
          onChange={handleChange("description")}
          id="field-description"
          className={classes.textField}
          variant="outlined"
        ></TextField>

        <Button
          className={classes.textField}
          variant="outlined"
          onClick={() => uploadProfile(profile)}
        >
          Upload service
        </Button>
      </Container>

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
