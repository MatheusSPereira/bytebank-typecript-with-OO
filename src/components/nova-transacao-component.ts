import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";

const elementoForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoForm.addEventListener("submit", function(event) {
    try 
    {
        event.preventDefault();

        if (!elementoForm.checkValidity()) {
            alert("por favor, preencha todos os campos da transação!");
            return;
        }

        const inputTransacao = elementoForm.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValor = elementoForm.querySelector("#valor") as HTMLInputElement;
        const inputData = elementoForm.querySelector("#data") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value + " 00:00:00");

        const novaTrasacao: Transacao = {
            tipoTransacao,
            valor,
            data
        }

        Conta.registrarTransacao(novaTrasacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        Conta.summaryTransacoes(Conta.getGrupoTransacoes());
        elementoForm.reset();
    } catch (error) {
        alert(error.message);
    }
});
