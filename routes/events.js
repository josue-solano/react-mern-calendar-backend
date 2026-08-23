/*
  Rutas de Eventos / Events
  host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = Router();

// Todas las peticiones tienen que pasar por la validación del JWT
router.use(jwtValidator);

// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    fieldValidator,
  ],
  crearEvento,
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    fieldValidator,
  ],
  actualizarEvento,
);

// Eliminar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
