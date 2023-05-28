const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Ticket = require("./model/ticketModel");

app.use(express.json());


//Get all tickets
app.get("/alltickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get new ticket  based on id
app.get("/ticket/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleTicket = await Ticket.findById(id);
    res.status(200).json(singleTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a ticket based on id
app.put("/ticket/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body);
    if(!ticket){
      return res.status(404).json({message:`cannot find any ticket with ${id}`})
    }
    const updatedTicket = await Ticket.findById(id)
    res.status(200).json(updatedTicket);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create a new ticket
app.post("/ticket", async (req, res) => {
  try {
    const bookedTickets = await Ticket.create(req.body);
    res.status(200).json(bookedTickets);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});


app.delete('/ticket/:id',async(req,res) =>{
  try {
    const{ id } = req.params
    const deletedTicket = await Ticket.findByIdAndDelete(id)
    if(!deletedTicket) {
      return res.status(404).json({message:`cannot find ${id}`})
    }
    res.status(200).json(deletedTicket)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
mongoose
  .connect(
    "mongodb+srv://root:Akhil08@ticket-booking.pepwg7e.mongodb.net/ticket-booking?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("server started running on 3000");
    });
  })
  .catch((err) => console.log(err));
