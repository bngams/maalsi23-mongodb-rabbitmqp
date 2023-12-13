import amqp from 'amqplib';

// to init
let connection = null;
let channel = null;

// Connect to queue
// connect(<url> <callback>)
async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://141.95.149.158:5672");
        console.log('connect done', connection);
        channel    = await connection.createChannel();
        
        await channel.assertQueue("test-queue")
        
        channel.consume("test-queue", data => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })

        console.log('connection ok');
    } catch (error) {
        console.log(error);
    }
}

async function sendMsg(data){
    // send data to queue
    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
    console.log('send ok');
} 

async function start(){
    console.log('start');
    await connectQueue();
    await sendMsg({id: 2, title: "Movie 2"});
} 

(async () => {
    await start();
    console.log('done');
    console.log('close');       
    // close the channel and connection
    await channel.close();
    await connection.close();
})();