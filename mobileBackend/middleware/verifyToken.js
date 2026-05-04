import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Get token from cookies (matching your login logic)
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Non autorisé - Pas de token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token invalide" });
    }

    // This is the CRITICAL line that fixes the 500 error
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.log("Erreur verifyToken", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
