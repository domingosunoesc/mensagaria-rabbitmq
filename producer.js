const amqp = require('amqplib');

async function enviarPedido() {
    try {

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const filaCozinha = 'fila_cozinha';
        const filaPagamento = 'fila_pagamento';

        await channel.assertQueue(filaCozinha, { durable: true });
        await channel.assertQueue(filaPagamento, { durable: true });

        const pedido = {
            pedido_id: 104,
            item: "Hambúrguer Duplo",
            mesa: 5,
            valor: 42.50
        };

        channel.sendToQueue(
            filaCozinha,
            Buffer.from(JSON.stringify(pedido))
        );

        channel.sendToQueue(
            filaPagamento,
            Buffer.from(JSON.stringify(pedido))
        );

        console.log("Pedido enviado:");
        console.log(pedido);

        setTimeout(() => {
            connection.close();
        }, 500);

    } catch (erro) {
        console.log("Erro:", erro);
    }
}

enviarPedido();