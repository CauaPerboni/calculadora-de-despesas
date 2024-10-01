let despesas = [];
let receitas = [];

function adicionarDespesa() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (descricao && !isNaN(valor)) {
        despesas.push({ descricao, valor });
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        atualizarRelatorio();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

function adicionarReceita() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (descricao && !isNaN(valor)) {
        receitas.push({ descricao, valor });
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        atualizarRelatorio();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

function atualizarRelatorio() {
    const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
    const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0);
    const saldo = totalReceitas - totalDespesas;

    const relatorio = `
        <p>Total de Despesas: R$${totalDespesas.toFixed(2)}</p>
        <p>Total de Receitas: R$${totalReceitas.toFixed(2)}</p>
        <p>Saldo: R$${saldo.toFixed(2)}</p>
    `;

    document.getElementById('relatorio').innerHTML = relatorio;

    const saldoDiv = document.getElementById('saldo');
    if (saldo > 0) {
        saldoDiv.innerHTML = "Você está no caminho certo! Seu saldo é positivo.";
    } else if (saldo < 0) {
        saldoDiv.innerHTML = "Cuidado! Seu saldo é negativo.";
    } else {
        saldoDiv.innerHTML = "Seu saldo é zero.";
    }

    gerarGraficos(totalDespesas, totalReceitas);
}

function gerarGraficos() {
    const ctxDespesas = document.getElementById('graficoDespesas').getContext('2d');
    const ctxReceitas = document.getElementById('graficoReceitas').getContext('2d');

    // Limpa os gráficos antes de criar novos
    ctxDespesas.clearRect(0, 0, ctxDespesas.canvas.width, ctxDespesas.canvas.height);
    ctxReceitas.clearRect(0, 0, ctxReceitas.canvas.width, ctxReceitas.canvas.height);

    // Verifica se os gráficos já existem
    if (window.despesasChart) {
        window.despesasChart.destroy();
    }
    if (window.receitasChart) {
        window.receitasChart.destroy();
    }

    // Gráfico de Despesas
    window.despesasChart = new Chart(ctxDespesas, {
        type: 'bar',
        data: {
            labels: despesas.map(d => d.descricao),
            datasets: [{
                label: 'Despesas',
                data: despesas.map(d => d.valor),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Receitas
    window.receitasChart = new Chart(ctxReceitas, {
        type: 'bar',
        data: {
            labels: receitas.map(r => r.descricao),
            datasets: [{
                label: 'Receitas',
                data: receitas.map(r => r.valor),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
