import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener("submit", function (event) {
    try {
        event.preventDefault();
        if (!elementoForm.checkValidity()) {
            alert("por favor, preencha todos os campos da transação!");
            return;
        }
        const inputTransacao = elementoForm.querySelector("#tipoTransacao");
        const inputValor = elementoForm.querySelector("#valor");
        const inputData = elementoForm.querySelector("#data");
        let tipoTransacao = inputTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        const novaTrasacao = {
            tipoTransacao,
            valor,
            data
        };
        Conta.registrarTransacao(novaTrasacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        Conta.summaryTransacoes(Conta.getGrupoTransacoes());
        elementoForm.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
