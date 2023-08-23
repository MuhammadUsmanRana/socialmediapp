import "./Post.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getItem, deleteItem, editItem } from "../Store/creatSlice";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [editpro, setEditPro] = useState();
  const [deletePro, setDeletePro] = useState();
  const [open, setOpen] = useState(false);
  const [isopen, setisOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [editValue, setEditValue] = useState();

  const getDataStore = useSelector((store) => {
    return store.mediaApp.socialApp;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const getdata = await axios.get("/get_data", {
          headers: { Authorization: `Bearer ${token}` },
          // njsdnfefbwjcnsd
        });
        if (getdata.data.employee) {
          dispatch(getItem(getdata.data.employee));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, []);

  const { register, handleSubmit } = useForm();

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const editOpen = () => setOpen(true);
  const editClose = () => setOpen(false);

  const deleteOpen = () => setisOpen(true);
  const deleteClose = () => setisOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="post">
      {getDataStore?.map((item, index) => {
        return (
          <div className="postWrapper" key={index}>
            <div className="postTop">
              <div className="postTopLeft">
                <img className="postProfileImg" src={`/file/${item.file}`} />
                <span className="postUsername">{item.name}</span>
                <span className="postDate">{post.date}</span>
              </div>
              <div className="postTopRight">
                <IconButton
                  onClick={() => {
                    editOpen();
                    setEditPro(item._id);
                    setEditValue(item.name);
                    setImage(item.file);
                  }}
                >
                  <ModeEditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    deleteOpen();
                    setDeletePro(item._id);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{item.description}</span>
              <img
                className="postImg"
                src={`/file/${item.file}`}
                alt={item.file}
              />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src="https://www.freeiconspng.com/thumbs/facebook-love-png/like-png-11.png"
                  onClick={likeHandler}
                  alt=""
                />
                <img
                  className="likeIcon"
                  src="https://www.freeiconspng.com/thumbs/facebook-love-png/facebook-love-png-6.png"
                  onClick={likeHandler}
                  alt=""
                />
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
              </div>
            </div>
          </div>
        );
      })}
      {/* ____________delete_user dialog___________ */}
      <Dialog
        open={isopen}
        onClose={deleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Really?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you really deleting this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteClose}>Disagree</Button>
          <Button
            onClick={async () => {
              deleteOpen();
              try {
                const token = localStorage.getItem("token");
                let resp = await axios.delete("/delete_data/" + deletePro, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                if (resp.data) {
                  dispatch(deleteItem(deletePro));
                  toast.success("Your post is Deleted");
                  setisOpen(false);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* _____________edit user dialog____________ */}
      <Modal
        open={open}
        onClose={editClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            {...register("name", { required: true })}
            // onChange={(e) => setEditValue(e.target.value)}
            label="Edit Name"
            autoFocus={true}
            variant="outlined"
            fullWidth
          />

          <TextField
            {...register("file", { required: true })}
            type="file"
            fullWidth
            sx={{ marginTop: "20px" }}
            onChange={(e) => {
              e.preventDefault();
              setImage(e.target.files);
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(file);
            }}
          />
          {image ? (
            <div className="uploadImage">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
                src={image}
                alt="uploaded image"
              />
              <IconButton onClick={() => setImage(null)}>
                <CloseIcon />
              </IconButton>
            </div>
          ) : null}
          <Button
            sx={{ marginLeft: "250px", marginBottom: "-50px" }}
            onClick={editClose}
          >
            Disagree
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "340px" }}
            onClick={handleSubmit(async (e) => {
              console.log(e);
              // const token = localStorage.getItem("token");
              // try {
              //   const UpdateData = await axios.put(
              //     "/edit_data/" + editpro,
              //     {
              //       name: editValue,
              //       file: Image,
              //     },
              //     {
              //       headers: { Authorization: `Bearer ${token}` },
              //     }
              //   );
              //   // console.log(UpdateData, "UpdateData");
              //   setOpen(false);
              //   if (UpdateData.data.result) {
              //     dispatch(
              //       editItem({
              //         _id: UpdateData.data.result._id,
              //         name: UpdateData.data.result.name,
              //         file: UpdateData.data.result.file,
              //       })
              //     );
              //     toast.success("Your Post is Updated");
              //   }
              // } catch (error) {
              //   console.log(error);
              // }
            })}
          >
            Update
          </Button>
        </Box>
      </Modal>{" "}
      <ToastContainer />
    </div>
  );
}
