// import jwt from "jsonwebtoken";

//  const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not authenticated, please login"
//             })
//         }
//         // Verify the token using the secret key
       
//         // const decode = jwt.verify(token, process.env.SECRET_KEY);
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if (!decode) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token, please login again"
//             })
//         }
//         req.id = decode.userId;
//             next();
      
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// }

// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated =  (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode =  jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export default isAuthenticated;