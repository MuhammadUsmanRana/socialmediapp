import "./Share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { addItem } from "../Store/creatSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function Share() {
  const [image, setImage] = useState(null); 

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitform = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("name", data.name);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/upload_data", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(addItem(response.data.employee));
      toast.success("Your Post added!");
      setImage(null);
      // data.name = null;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(submitform)}
      sx={{ mt: 3 }}
    >
      <div className="share">
        <div className="shareWrapper">
          {" "}
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src="https://images.unsplash.com/photo-1481437642641-2f0ae875f836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <TextField
              {...register("name", { required: true })}
              variant="standard"
              id="name"
              label="name"
              sx={{ width: "90%" }}
            />
          </div>
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <Button component="label" type="submit">
                  <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                  <TextField
                    {...register("file", { required: true })}
                    type="file"
                    onChange={(e) => {
                      e.preventDefault();
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        setImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </Button>
                {image ? (
                  <div className="uploadImage">
                    <img
                      style={{
                        width: "80px",
                        marginLeft: "10px",
                        height: "80px",
                      }}
                      src={image}
                      alt="uploaded image"
                    />
                    <IconButton onClick={() => setImage(null)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                ) : null}
              </div>
              <div className="shareOption">
                <MeetingRoomIcon htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotionsIcon
                  htmlColor="goldenrod"
                  className="shareIcon"
                />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              share
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
