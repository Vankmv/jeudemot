const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const categories = ["Pays", "Capitale", "Ville", "Animal"];

const validWords = {
    "Pays": [
        "afghanistan", "afrique du sud", "albanie", "algerie", "allemagne", "andorre", "angola", "argentine", "armenie", "australie", "autriche", "azerbaidjan",
        "bahamas", "bahrein", "bangladesh", "barbade", "belgique", "belize", "benin", "bhoutan", "bielorussie", "birmanie", "bolivie", "bosnie-herzegovine", "botswana", "bresil", "brunei", "bulgarie", "burkina faso", "burundi",
        "cambodge", "cameroun", "canada", "cap-vert", "centrafrique", "chili", "chine", "chypre", "colombie", "comores", "congo", "coree du nord", "coree du sud", "costa rica", "croatie", "cuba",
        "danemark", "djibouti", "dominique",
        "egypte", "emirats arabes unis", "erythree", "espagne", "estonie", "etats-unis", "ethiopie",
        "fidji", "finlande", "france",
        "gabon", "gambie", "georgie", "ghana", "grece", "grenade", "guatemala", "guinee", "guyana",
        "haiti", "honduras", "hongrie",
        "inde", "indonesie", "iraq", "iran", "irlande", "islande", "israel", "italie",
        "jamaique", "japon", "jordanie",
        "kazakhstan", "kenya", "kirghizistan", "kiribati", "koweit",
        "laos", "lesotho", "lettonie", "liban", "liberia", "libye", "liechtenstein", "lituanie", "luxembourg",
        "madagascar", "malaisie", "malawi", "maldives", "mali", "malte", "maroc", "maurice", "mauritanie", "mexique", "moldavie", "monaco", "mongolie", "montenegro", "mozambique",
        "namibie", "nauru", "nepal", "nicaragua", "niger", "nigeria", "norvege", "nouvelle-zelande",
        "oman",
        "ouganda", "ouzbekistan",
        "pakistan", "palau", "palestine", "panama", "papouasie-nouvelle-guinee", "paraguay", "pays-bas", "perou", "philippines", "pologne", "portugal",
        "qatar",
        "roumanie", "royaume-uni", "russie", "rwanda",
        "saint-marin", "senegal", "serbie", "seychelles", "singapour", "slovaquie", "slovenie", "somalie", "soudan", "suede", "suisse", "suriname", "syrie",
        "tadjikistan", "tanzanie", "tchad", "tchequie", "thailande", "togo", "tonga", "tunisie", "turquie",
        "ukraine", "uruguay",
        "vanuatu", "vatican", "venezuela", "vietnam",
        "yemen",
        "zambie", "zimbabwe"
    ],
    "Capitale": [
        "abu dhabi", "abuja", "accra", "alger", "amsterdam", "ankara", "antananarivo", "apia", "astana", "asuncion", "athenes", "bagdad", "bakou", "bamako", "bangkok", "bangui", "banjul", "pekin", "beyrouth", "bichkek", "bissau", "bogota", "brasilia", "bratislava", "brazzaville", "bruxelles", "bucarest", "budapest", "buenos aires",
        "le caire", "canberra", "caracas", "chisinau", "conakry", "copenhague", "dakar", "damas", "dhaka", "djibouti", "doha", "dublin",
        "erevan", "stockholm",
        "freetown",
        "gaborone", "georgetown", "guatemala",
        "hanoi", "harare", "havane", "helsinki", "honiara",
        "islamabad", "jakarta", "jerusalem",
        "kabul", "kampala", "katmandou", "kigali", "kingston", "kinshasa", "kuala lumpur",
        "libreville", "lilongwe", "lima", "lisbonne", "londres", "lome", "luanda", "lusaka", "luxembourg",
        "madrid", "malabo", "male", "managua", "manama", "manille", "maputo", "mascate", "maseru", "mexico", "minsk", "monaco", "monrovia", "montevideo", "moroni", "moscou",
        "nairobi", "nassau", "ndjamena", "new delhi", "niamey", "nicosie", "nouakchott",
        "oslo", "ottawa",
        "paramaribo", "paris", "phnom penh", "podgorica", "prague", "pretoria", "pyongyang",
        "quito",
        "rabat", "reykjavik", "riga", "rome", "santiago", "santo domingo", "sarajevo", "seoul", "singapour", "skopje", "sofia", "suva",
        "tallinn", "teheran", "tokyo", "tripoli", "tunis",
        "ouagadougou",
        "varsovie", "vatican", "victoria", "vienne", "vilnius", "windhoek",
        "yaounde", "zagreb"
    ],
    "Ville": [
        "abidjan", "alexandrie", "barcelone", "bale", "bordeaux", "bologna", "boston", "casablanca", "chicago", "cologne", "cincinnati", "dallas", "douala", "dubai", "durban", "florence", "francfort", "geneve", "glasgow", "hambourg", "hong kong", "houston", "istanbul", "johannesburg", "karachi", "lagos", "lausanne", "lyon", "marseille", "milan", "montreal", "munich", "new york", "nice", "oran", "porto", "rio de janeiro", "rotterdam", "san francisco", "sao paulo", "seville", "shanghai", "strasbourg", "sydney", "tokyo", "toronto", "valence", "venise", "zurich"
    ],
    "Animal": [
        "alligator", "anaconda", "ane", "antilope", "araignee", "autruche", "abeille", "aigle",
        "babouin", "baleine", "buffle", "blaireau", "bison", "boeuf", "boa",
        "canard", "castor", "cameleon", "chat", "cheval", "chien", "chimpanze", "cigogne", "cochon", "crocodile", "corbeau",
        "daim", "dauphin", "dinosaure", "dromadaire", "dindon",
        "elephant", "elan", "escargot", "ecureuil", "epervier",
        "faucon", "furet", "flamant", "fourmi", "phoque",
        "girafe", "gorille", "guepard", "grenouille",
        "hamster", "herisson", "hyene", "hippopotame", "hibou",
        "iguane", "isard",
        "jaguar",
        "kangourou", "koala", "kiwi", "koudou",
        "lama", "lemurien", "leopard", "lezard", "lion", "loup", "loutre", "lynx",
        "macaque", "mammouth", "marmotte", "meduse", "mesange", "moineau", "moustique", "mouton",
        "narval", "nutria", "nandou",
        "ocelot", "okapi", "ours", "otarie",
        "panthere", "papillon", "perroquet", "phacochere", "pieuvre", "pingouin", "poisson", "poule", "puma", "python",
        "quetzal",
        "rat", "renard", "rhinoceros", "rossignol", "requin",
        "salamandre", "sardine", "scorpion", "serpent", "singe", "souris", "sangsue",
        "taureau", "tigre", "tortue", "toucan", "truite",
        "vache", "varan", "veau", "vison", "vautour",
        "wombat",
        "yak", "zebre"
    ]
};

let rooms = {}; 
let highScores = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function broadcastRoomsList() {
    let roomList = [];
    for (let rName in rooms) {
        roomList.push({
            name: rName,
            host: rooms[rName].hostUsername,
            playerCount: Object.keys(rooms[rName].players).length,
            status: rooms[rName].status
        });
    }
    io.emit('update-rooms-list', roomList);
}

io.on('connection', (socket) => {
    console.log('Un joueur s est connecte');

    socket.on('set-username', (username) => {
        socket.username = username;
        socket.emit('username-set');
        broadcastRoomsList();
    });

    socket.on('create-room', (roomName) => {
        if (!roomName || rooms[roomName]) {
            socket.emit('room-error', "Ce salon existe deja ou nom invalide !");
            return;
        }

        rooms[roomName] = {
            hostId: socket.id,
            hostUsername: socket.username,
            players: {
                [socket.id]: { username: socket.username, totalScore: 0 }
            },
            submissions: {},
            remainingLetters: [],
            status: 'waiting',
            timer: 30,
            timerInterval: null
        };

        socket.roomName = roomName;
        socket.join(roomName);

        socket.emit('room-joined', { roomName: roomName, isHost: true });
        updateRoomPlayers(roomName);
        broadcastRoomsList();
    });

    socket.on('request-join-room', (roomName) => {
        if (!rooms[roomName]) {
            socket.emit('room-error', "Ce salon n'existe plus !");
            return;
        }
        if (rooms[roomName].status !== 'waiting') {
            socket.emit('room-error', "La partie a deja commence dans ce salon !");
            return;
        }

        io.to(rooms[roomName].hostId).emit('join-request', {
            socketId: socket.id,
            username: socket.username
        });
        socket.emit('waiting-approval', "Demande envoyée à l'hôte...");
    });

    socket.on('accept-player', (data) => {
        let roomName = socket.roomName;
        if (rooms[roomName] && rooms[roomName].hostId === socket.id) {
            let targetSocket = io.sockets.sockets.get(data.socketId);
            if (targetSocket) {
                targetSocket.roomName = roomName;
                targetSocket.join(roomName);
                rooms[roomName].players[data.socketId] = {
                    username: data.username,
                    totalScore: 0
                };
                targetSocket.emit('room-joined', { roomName: roomName, isHost: false });
                updateRoomPlayers(roomName);
                broadcastRoomsList();
            }
        }
    });

    socket.on('reject-player', (socketId) => {
        let targetSocket = io.sockets.sockets.get(socketId);
        if (targetSocket) {
            targetSocket.emit('join-rejected', "L'hôte a refusé votre demande.");
        }
    });

    socket.on('start-game', (config) => {
        let roomName = socket.roomName;
        let room = rooms[roomName];
        if (room && room.hostId === socket.id && room.status === 'waiting') {
            for (let id in room.players) {
                room.players[id].totalScore = 0;
            }

            let startChar = (config && config.startLetter) ? config.startLetter.toUpperCase().charCodeAt(0) : 65;
            let endChar = (config && config.endLetter) ? config.endLetter.toUpperCase().charCodeAt(0) : 90;

            if (startChar > endChar) {
                let temp = startChar;
                startChar = endChar;
                endChar = temp;
            }

            let lettersArray = [];
            for (let code = startChar; code <= endChar; code++) {
                lettersArray.push(String.fromCharCode(code));
            }

            room.remainingLetters = shuffle(lettersArray);
            startGameLoop(roomName);
            broadcastRoomsList();
        }
    });

    socket.on('next-round', () => {
        let roomName = socket.roomName;
        let room = rooms[roomName];
        if (room && room.hostId === socket.id && room.status === 'waiting') {
            if (room.remainingLetters.length > 0) {
                startGameLoop(roomName);
            } else {
                io.to(roomName).emit('game-over');
            }
        }
    });

    socket.on('stop-game', (answers) => {
        let roomName = socket.roomName;
        let room = rooms[roomName];
        if (room && room.status === 'playing') {
            room.submissions[socket.id] = {
                username: socket.username,
                answers: answers
            };
            
            if (room.timerInterval) clearInterval(room.timerInterval);
            io.to(roomName).emit('notification-stop', socket.username + " a dit STOP ! Fin de la manche.");
            endRound(roomName);
        }
    });

    socket.on('submit-answers', (answers) => {
        let roomName = socket.roomName;
        let room = rooms[roomName];
        if (room) {
            room.submissions[socket.id] = {
                username: socket.username,
                answers: answers
            };
            socket.emit('answers-saved');
        }
    });

    socket.on('return-to-lobby', () => {
        let roomName = socket.roomName;
        if (roomName && rooms[roomName]) {
            socket.leave(roomName);
            delete rooms[roomName].players[socket.id];
            if (Object.keys(rooms[roomName].players).length === 0 || rooms[roomName].hostId === socket.id) {
                delete rooms[roomName];
            } else {
                updateRoomPlayers(roomName);
            }
            socket.roomName = null;
            socket.emit('back-to-lobbies');
            broadcastRoomsList();
        }
    });

    socket.on('disconnect', () => {
        console.log('Un joueur s est deconnecte');
        let roomName = socket.roomName;
        if (roomName && rooms[roomName]) {
            delete rooms[roomName].players[socket.id];
            delete rooms[roomName].submissions[socket.id];
            if (Object.keys(rooms[roomName].players).length === 0 || rooms[roomName].hostId === socket.id) {
                delete rooms[roomName];
            } else {
                updateRoomPlayers(roomName);
            }
            broadcastRoomsList();
        }
    });
});

function updateRoomPlayers(roomName) {
    let room = rooms[roomName];
    if (!room) return;
    let playerList = [];
    for (let id in room.players) {
        playerList.push(room.players[id].username);
    }
    io.to(roomName).emit('update-room-players', {
        players: playerList,
        highScores: highScores
    });
}

function startGameLoop(roomName) {
    let room = rooms[roomName];
    if (!room || room.remainingLetters.length === 0) {
        io.to(roomName).emit('game-over');
        return;
    }

    let currentLetter = room.remainingLetters.shift();

    room.status = 'playing';
    room.currentLetter = currentLetter;
    room.timer = 30;
    room.submissions = {};

    io.to(roomName).emit('start-round', {
        letter: room.currentLetter,
        categories: categories,
        timer: room.timer
    });

    if (room.timerInterval) clearInterval(room.timerInterval);

    room.timerInterval = setInterval(() => {
        room.timer--;
        io.to(roomName).emit('timer-update', room.timer);

        if (room.timer <= 0) {
            clearInterval(room.timerInterval);
            io.to(roomName).emit('notification-stop', "Temps ecoule ! Fin de la manche.");
            endRound(roomName);
        }
    }, 1000);
}

function endRound(roomName) {
    let room = rooms[roomName];
    if (!room) return;

    room.status = 'waiting';
    let targetLetter = room.currentLetter.toLowerCase();
    let evaluatedSubmissions = {};

    for (let id in room.submissions) {
        let player = room.submissions[id];
        let evaluatedAnswers = {};

        for (let cat in player.answers) {
            let word = player.answers[cat].trim().toLowerCase();
            let isValid = false;

            if (word.length > 0 && word.startsWith(targetLetter)) {
                if (validWords[cat] && validWords[cat].includes(word)) {
                    isValid = true;
                }
            }

            evaluatedAnswers[cat] = {
                word: player.answers[cat] || "(vide)",
                valid: isValid,
                wordNormalized: word
            };
        }

        evaluatedSubmissions[id] = {
            username: player.username,
            answers: evaluatedAnswers
        };
    }

    let wordCounts = {};
    for (let cat of categories) {
        wordCounts[cat] = {};
    }

    for (let id in evaluatedSubmissions) {
        let answers = evaluatedSubmissions[id].answers;
        for (let cat in answers) {
            if (answers[cat].valid) {
                let w = answers[cat].wordNormalized;
                wordCounts[cat][w] = (wordCounts[cat][w] || 0) + 1;
            }
        }
    }

    let roundResults = {};
    let isGameOver = room.remainingLetters.length === 0;

    for (let id in evaluatedSubmissions) {
        let player = evaluatedSubmissions[id];
        let roundScore = 0;
        let finalAnswers = {};

        for (let cat in player.answers) {
            let ans = player.answers[cat];
            let pts = 0;

            if (ans.valid) {
                let count = wordCounts[cat][ans.wordNormalized];
                if (count > 1) {
                    pts = 5;
                } else {
                    pts = 10;
                }
                roundScore += pts;
            }

            finalAnswers[cat] = {
                word: ans.word,
                valid: ans.valid,
                points: pts
            };
        }

        if (room.players[id]) {
            room.players[id].totalScore += roundScore;
        }

        roundResults[id] = {
            username: player.username,
            roundScore: roundScore,
            totalScore: room.players[id] ? room.players[id].totalScore : roundScore,
            answers: finalAnswers
        };
    }

    for (let id in room.players) {
        if (!roundResults[id]) {
            roundResults[id] = {
                username: room.players[id].username,
                roundScore: 0,
                totalScore: room.players[id].totalScore,
                answers: {}
            };
        }
    }

    if (isGameOver) {
        for (let id in room.players) {
            highScores.push({
                username: room.players[id].username,
                score: room.players[id].totalScore
            });
        }
        highScores.sort((a, b) => b.score - a.score);
        highScores = highScores.slice(0, 5);
    }

    io.to(roomName).emit('round-ended', {
        results: roundResults,
        isGameOver: isGameOver
    });
    broadcastRoomsList();
}

onst PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur lance sur le port `${PORT});
});
