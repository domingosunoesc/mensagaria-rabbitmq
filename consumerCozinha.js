const amqp = require('amqplib');

async function consumirPedidos() {

    try {

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const fila = 'fila_cozinha';

        await channel.assertQueue(fila, { durable: true });

        console.log("Cozinha aguardando pedidos...");

        channel.consume(fila, (mensagem) => {

            const pedido = JSON.parse(mensagem.content.toString());

            console.log("\nPreparando pedido:");
            console.log(`Pedido: ${pedido.pedido_id}`);
            console.log(`Item: ${pedido.item}`);
            console.log(`Mesa: ${pedido.mesa}`);

            channel.ack(mensagem);

        });

    } catch (erro) {
        console.log("Erro:", erro);
    }
}

consumirPedidos();