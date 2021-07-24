const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'Website',
        amount: 200000,
        date: '23/01/2021',
    }
]


const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '$' : ''

        value = String(value).replace(/\D/g, '')
        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
        return signal + value
    }
}

// Preciso somar as entradas
// Depois eu preciso somar as saidas
// e remover das entradas o valor das Saídas
// assim, eu terei o total

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)
        
        App.reload()
    },

    incomes() {
        let income = 0;

        // pegar todas as transacoes
        // para cada transacao,
        Transaction.all.forEach(transaction => {
            // se for maior que 0 
            if (transaction.amount > 0) {
                // somar a uma variável e retornar a variável
                income = income + transaction.amount
            }
        });
        // verificar se a transacao é maior que 0 
        return income;

    },
    expenses() {
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = expense + transaction.amount
            }
        });
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

// Substituir os dados do html com os dados do JS


const DOM = {
    transactionsContainer: document.querySelector('#data-table'),


    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="dates">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="">
            </td>
        `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ''
    }
}

/** Funnção para retornar o array */


/* APlioca;ão */

const App = {
    init() {

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()

    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

Transaction.add({
    id: 12,
    description: 'Suav',
    amount: 200,
    date: '29/11/2021'
})


