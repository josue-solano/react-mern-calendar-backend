const { response } = require("express");
const Event = require("../models/Event");

const getEventos = async (req, res = express) => {
  const events = await Event.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    eventos: events,
  });
};

const crearEvento = async (req, res = express) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    return res.status(200).json({
      ok: true,
      evento: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = express) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    console.log(newEvent);

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      evento: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = express) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este evento",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      ok: true,
      evento: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
