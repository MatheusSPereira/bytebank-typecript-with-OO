import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrado();
function renderizarExtrado(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGrupoTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacao of gruposTransacoes)
    {
        let htmlTransacaoItem: string = "";
        for (let trasacao of grupoTransacao.transacoes){
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${trasacao.tipoTransacao}</span>
                        <strong class="valor">${formatarMoeda(trasacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(trasacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
    }

    if (htmlRegistroTransacoes == "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas.</div>";
    }
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    atualizar(): void {
        renderizarExtrado();
    }
}

export default ExtratoComponent;