import amqp from 'amqplib/callback_api';

// Connect to queue
// connect(<url> <callback>)
amqp.connect('amqp://141.95.149.158:15672/', function(error0, connection) {
    // handle error
    if (error0) {
        throw error0;
    }
      
    // create queues...
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello world';
    
        channel.assertQueue(queue, {
            durable: false
        });
    
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
});