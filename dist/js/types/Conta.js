import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const trasacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key == "data") {
        return new Date(value);
    }
    return value;
}) || [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error("o valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("o valor a ser depositado deve ser maior que zero!");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
const Conta = {
    getConta() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGrupoTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(trasacoes);
        const transacoesOredenada = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let trasacao of transacoesOredenada) {
            let labelGrupoTransacao = trasacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(trasacao);
        }
        return gruposTransacoes;
    },
    summaryTransacoes(gruposTransacoes) {
        const resumo = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        };
        for (let transacao of gruposTransacoes) {
            for (let item of transacao.transacoes) {
                if (item.tipoTransacao == TipoTransacao.DEPOSITO) {
                    resumo.totalDepositos += item.valor;
                }
                else if (item.tipoTransacao == TipoTransacao.TRANSFERENCIA) {
                    resumo.totalTransferencias += item.valor;
                }
                else {
                    resumo.totalPagamentosBoleto += item.valor;
                }
            }
        }
        console.log(resumo);
    },
    registrarTransacao(novaTrasacao) {
        if (novaTrasacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTrasacao.valor);
        }
        else if (novaTrasacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTrasacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTrasacao.valor);
            novaTrasacao.valor *= -1;
        }
        else {
            throw new Error("tipo de transação é invalido.");
        }
        trasacoes.push(novaTrasacao);
        console.log(this.getGrupoTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(trasacoes));
    }
};
export default Conta;
