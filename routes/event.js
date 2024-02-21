const route = require("express").Router;
const Event = require("../db/models/event");
const authenticate = require("../middlewares/authenticator");
const User = require("../db/models/user");

//post event
route.post("/event/post", authenticate, async (req, res) => {
  const { title, location, date, speaker } = req.body;
  try {
    const event = Event.create({
      title,
      location,
      date,
      speaker,
      createdBy,
    });
    await event.save();
    const user = await User.findById(req.body.createdBy);
    user.postedEvents.push(event._id);
    return res.status(200).json({
      msg: "Event created",
      event: event,
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
});

//participate in event
route.post("/event/apply/:id", authenticate, async (req, res) => {
  try {
    const { name, email, phNo, description, userId } = req.body;
    const event = await Event.findById(req.params.id);
    if(event.volunteers.include(userId)){
        return res.status(201).json({
            msg: "you already volunteered for this event"
        })
    }
    event.volunteers.push(userId);
    await event.save()
    const user = await User.findById(userId);
    user.volunteered.push(req.params.id);
    await user.save();
    res.status(200).json({
        msg: "You volunteered in event successfully"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

//get events
route.get("/events", authenticate, async(req,res)=>{
    try {
        const events = await Event.find({});
        res.status(200).json({
            events: events
        })
    } catch (error) {
        
    }
})
