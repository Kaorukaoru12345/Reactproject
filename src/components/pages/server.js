const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const messages = []; // Store messages here
const MAX_MESSAGES = 100; // Limit the number of stored messages

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send existing messages to the newly connected client
    messages.forEach((message) => {
        ws.send(JSON.stringify(message));
    });

    ws.on('message', (message) => {
        console.log('Received:', message);
        
        try {
            // Parse the incoming message
            const parsedMessage = JSON.parse(message);
            // Check for required fields
            if (!parsedMessage.content || !parsedMessage.sender) {
                console.error('Message must contain content and sender');
                return;
            }

            // Store the new message
            messages.push(parsedMessage);

            // Limit the number of stored messages
            if (messages.length > MAX_MESSAGES) {
                messages.shift(); // Remove the oldest message
            }

            // Broadcast the new message to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage));
                }
            });
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server running on ws://localhost:8080');
