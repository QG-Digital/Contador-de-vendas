// Configurações do Telegram (substitua com seus dados)
const BOT_TOKEN = '7756175917:AAGTn4uhnijM5SZEmjyiO0rlU-FcZmc_RSY';
const CHAT_ID = '5581669828';

// Elementos da interface
const btn2 = document.getElementById('btn2');
const btn10 = document.getElementById('btn10');
const count2 = document.getElementById('count2');
const count10 = document.getElementById('count10');
const totalValue = document.getElementById('totalValue');
const status = document.getElementById('status');

// Valores por unidade
const VALUE_2 = 1.75;
const VALUE_10 = 8.90;

// Contadores
let counter2 = 0;
let counter10 = 0;
let total = 0;

// Função para formatar data e hora
function getDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}

// Função para formatar valor monetário
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para atualizar totais
function updateTotals() {
    count2.textContent = counter2;
    count10.textContent = counter10;
    total = (counter2 * VALUE_2) + (counter10 * VALUE_10);
    totalValue.textContent = formatCurrency(total);
}

// Função para enviar para o Telegram
async function sendToTelegram(number) {
    const datetime = getDateTime();
    const message = `Número: ${number}\nData e Hora: ${datetime}\nTotal 2: ${counter2}\nTotal 10: ${counter10}\nValor Total: ${formatCurrency(total)}`;
    
    status.textContent = 'Enviando...';
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            status.textContent = 'Enviado com sucesso!';
            setTimeout(() => status.textContent = '', 2000);
        } else {
            status.textContent = 'Erro ao enviar';
            console.error('Telegram API Error:', data.description);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        status.textContent = 'Falha na conexão';
    }
}

// Event listeners
btn2.addEventListener('click', () => {
    counter2++;
    updateTotals();
    sendToTelegram(2);
});

btn10.addEventListener('click', () => {
    counter10++;
    updateTotals();
    sendToTelegram(10);
});

// Inicializa os valores na tela
updateTotals();