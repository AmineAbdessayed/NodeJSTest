const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const dbConfig = require('./db');
const twig = require('twig');
const UserRouter = require('./routes/user');
const partiesRouter = require('./routes/PartieRoutes');
const joueurRoutes = require('./routes/JoueurRoutes');
const PartieViewsRouter = require('./views/PartieViewsRouter');
const {
  addPartieSocket,
  attaqueSocket,
  afficherSocket,
} = require('./Controller/SocketController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Set view engine
app.set('view engine', 'twig');
app.set('views', __dirname + '/views');

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('x', (data) => {
    socket.broadcast.emit('x', data);
  });

  socket.on('partie', (data) => {
    console.log(data);
    addPartieSocket(data);
    io.emit('msg', data);
  });

  socket.on('attaque', (data) => {
    console.log(data);
    attaqueSocket(data.id1, data.id2);
    io.emit('msg', data);
  });

  socket.on('afficher', async (data) => {
    console.log(data);
    const result = await afficherSocket(data);
    console.log('afficher');
    console.log(result);
    io.emit('aff', result);
  });

  socket.on('disconnect', () => {
    io.emit('msg', 'user disconnected');
  });
});

// Routes
app.use('/parties', partiesRouter);
app.use('/user', joueurRoutes);
app.use('/', PartieViewsRouter);
app.use('/user', UserRouter);

// Connect to MongoDB
mongoose
  .connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    const port = 3000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });