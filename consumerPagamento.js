const amqp = require('amqplib');

async function processarPagamento() {

    try {

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const fila = 'fila_pagamento';

        await channel.assertQueue(fila, { durable: true });

        console.log("Financeiro aguardando pagamentos...");

        channel.consume(fila, (mensagem) => {

            const pedido = JSON.parse(mensagem.content.toString());

            console.log("\nProcessando pagamento:");
            console.log(`Pedido: ${pedido.pedido_id}`);
            console.log(`Valor: R$ ${pedido.valor}`);

            channel.ack(mensagem);

        });

    } catch (erro) {
        console.log("Erro:", erro);
    }
}

processarPagamento();