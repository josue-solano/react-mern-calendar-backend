/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");

const {
  crearUsuarios,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

const { jwtValidator } = require("../middlewares/jwt-Validator");

const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name", "El nombre debe ser de al menos 5 caracteres").isLength(5),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  crearUsuarios,
);

router.post(
  "/",
  [
    // middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    ,
    fieldValidator,
  ],
  loginUsuario,
);

router.get("/renew", jwtValidator, revalidarToken);

module.exports = router;
