// import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Typography from "@mui/material/Typography";
// import CssBaseline from "@mui/material/CssBaseline";
// import Link from "@mui/material/Link";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import TextareaAutosize from "@mui/base/TextareaAutosize";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { addItem } from "../Store/creatSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();
// export default function ProductPage() {
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/productData");
//     } else {
//       navigate("/login");
//     }
//   }, []);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const dispatch = useDispatch();
//   const submitForm = async (event) => {
//     console.log(event)
//     const formData = new FormData();
//     formData.append("file", event.file[0].name);
//     formData.append("name", event.name);
//     formData.append("description", event.description);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post("/upload_data", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.success) {
//         dispatch(addItem(response.data.data));
//         toast.success("product added!");
//       }
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Create New Product
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit(submitForm)}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   {...register("name", { required: true })}
//                   autoComplete="given-name"
//                   fullWidth
//                   id="name"
//                   label="name"
//                   autoFocus
//                 />
//               </Grid>

//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   {...register("file", { required: true })}
//                   type="file"
//                   multiple
//                   onChange={(e) => {
//                     console.log(e.target.files)
//                     e.preventDefault();
//                     const file = e.target.files[0].name;
//                     const reader = new FileReader();

//                     reader.onload = () => {
//                       setImage(reader.result);
//                     };

//                     reader.readAsDataURL(file);
//                   }}
//                 />
//                 {image ? (
//                   <Grid item>
//                     <img
//                       style={{
//                         width: "50%",
//                         height: "50%",
//                         marginBottom: "5px",
//                         marginTop: "5px",
//                       }}
//                       src={image}
//                       alt="uploaded image"
//                     />
//                   </Grid>
//                 ) : null}
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextareaAutosize
//                   {...register("description", { required: true })}
//                   aria-label="minimum height"
//                   minRows={6}
//                   placeholder="description"
//                   style={{ width: 400 }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//       <ToastContainer />
//     </ThemeProvider>
//   );
// }
