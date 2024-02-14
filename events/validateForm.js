function validateForm(form){
    var WKNumState = Number(getValue("WKNumState"))
    var WKNextState = getValue("WKNextState")
    var msgErro = ""
    if(WKNumState == INICIO0 || WKNumState == INICIO1 || WKNumState == AJUSTAR_SOLICITACAO){
        if(campoVazio(form,"tipoAlbaran")) msgErro += "<li>É necessário informar o <b>Tipo do Albaran</b>.</li>"
        if(campoVazio(form,"tipo")) msgErro += "<li>É necessário informar o <b>Tipo do Pagamento</b>.</li>"
        if(campoVazio(form,"sociedade")) msgErro += "<li>É necessário informar a <b>Sociedade</b>.</li>"
        if(campoVazio(form,"conta")) msgErro += "<li>É necessário informar a <b>Conta</b>.</li>"
        if(campoVazio(form,"ordemTrabalho")) msgErro += "<li>É necessário informar a<b>Ordem Trabalho</b>.</li>"
        if(campoVazio(form,"numeroFornecedor")) msgErro += "<li>É necessário informar o <b>Número Fornecedor</b>.</li>"
        if(campoVazio(form,"valorPf")) msgErro += "<li>É necessário informar o <b>Valor Principal</b>.</li>"
        if(campoVazio(form,"dataEmissao")) msgErro += "<li>É necessário informar a <b>Data Emissão</b>.</li>"

        var tipoAlbaran = form.getValue("tipoAlbaran")
        if(tipoAlbaran == "comContrato"){
            // if(campoVazio(form,"numeroProcesso")) msgErro += "<li>É necessário informar o <b>Número Processo</b>.</li>"
            if(campoVazio(form,"numeroNotaFiscal")) msgErro += "<li>É necessário informar a <b>Nota Fiscal</b>.</li>"
            if(campoVazio(form,"favorecido")) msgErro += "<li>É necessário informar o <b>Favorecido</b>.</li>"
            if(campoVazio(form,"moeda")) msgErro += "<li>É necessário informar a <b>Moeda</b>.</li>"
            if(campoVazio(form,"conceito")) msgErro += "<li>É necessário informar o <b>Conceito</b>.</li>"
            if(campoVazio(form,"item")) msgErro += "<li>É necessário informar o <b>Item</b>.</li>"
            if(campoVazio(form,"quantidade")) msgErro += "<li>É necessário informar a <b>Quantidade</b>.</li>"
            // if(campoVazio(form,"cnpjFornecedor")) msgErro += "<li>É necessário informar o <b>CNPJ</b>.</li>"
            if(campoVazio(form,"numeroContrato")) msgErro += "<li>É necessário informar o <b>Número Contrato</b>.</li>"
     
            // if(campoVazio(form,"descricao")) msgErro += "<li>É necessário informar a <b>Descrição</b>.</li>"
            if(!form.getMobile() && campoVazio(form,"mes")) msgErro += "<li>É necessário informar o <b>Mês</b>.</li>" 

        }

        if(tipoAlbaran == "semContrato"){
            var tipo = form.getValue("tipo")
            var caucao = form.getValue("caucao")
            var juros = form.getValue("juros")
            var tipo = form.getValue('tipo')
            var tipo = form.getValue('juros')


            if(tipo == "CONDENAÇÃO - TERCEIROS" || tipo == "CONDENAÇÃO - PRÓPRIO" || tipo == "CONDENAÇÃO - TERCEIROS - CAUÇÃO"){
                if(juros != 0){
                    if(campoVazio(form,"contaJuros")) msgErro += "<li>É necessário informar a <b>Conta Juros</b>.</li>"
                    if(campoVazio(form,"caucaoCondenacao")) msgErro += "<li>É necessário informar o <b>Caução Condenação</b>.</li>"
                    if(campoVazio(form,"ordemTrabalhoJuros")) msgErro += "<li>É necessário informar a <b>Ordem Trabalho Juros</b>.</li>"
                    if(campoVazio(form,"contaCaucao")) msgErro += "<li>É necessário informar a <b>Conta Caução</b>.</li>"
                }
            }

            if(juros != 0){
                if(campoVazio(form,"contaJuros")) msgErro += "<li>É necessário informar a <b>Conta Juros</b>.</li>"
                if(campoVazio(form,"ordemTrabalhoJuros")) msgErro += "<li>É necessário informar a <b>Ordem Trabalho Juros</b>.</li>"
            }

            if(caucao == '' || caucao == null){
                if(campoVazio(form,"numeroContrato")) msgErro += "<li>É necessário informar o <b>Número Contrato</b>.</li>"
            }
            // if(campoVazio(form,"terceirizada")) msgErro += "<li>É necessário informar a <b>Terceirizada</b>.</li>"
            if(campoVazio(form,"ALBSAP")) msgErro += "<li>É necessário informar a <b>ALBSAP</b>.</li>"
            if(campoVazio(form,"contratocaucao")) msgErro += "<li>É necessário informar a <b>Contrato Caucao</b>.</li>"
            if(campoVazio(form,"riscoProvavel")) msgErro += "<li>É necessário informar o <b>Risco Provável</b>.</li>"
            if(campoVazio(form,"advogadoRTE")) msgErro += "<li>É necessário informar o <b>Advogado RTE</b>.</li>"   
            if(campoVazio(form,"apolice")) msgErro += "<li>É necessário informar a <b>Apólice</b>.</li>"
            if(campoVazio(form,"total")) msgErro += "<li>É necessário informar o <b>Total</b>.</li>"
            if(campoVazio(form,"reclamanteRTE")) msgErro += "<li>É necessário informar o <b>Reclamante RTE</b>.</li>"
            if(campoVazio(form,"municipio")) msgErro += "<li>É necessário informar o <b>Município</b>.</li>"
            if(campoVazio(form,"vara")) msgErro += "<li>É necessário informar a <b>Vara</b>.</li>"
            if(campoVazio(form,"escritorio")) msgErro += "<li>É necessário informar o <b>Escritório</b>.</li>"
            if(campoVazio(form,"emitente")) msgErro += "<li>É necessário informar o <b>Emitente</b>.</li>"
            if(campoVazio(form,"dataPagamento")) msgErro += "<li>É necessário informar a <b>Data Pagamento</b>.</li>"
            if(campoVazio(form,"formaPagamento")) msgErro += "<li>É necessário informar a <b>Forma Pagamento</b>.</li>"
            if(campoVazio(form,"mes")) msgErro += "<li>É necessário informar o <b>Mês</b>.</li>"
            // if(campoVazio(form,"caucao")) msgErro += "<li>É necessário informar o <b>Caução</b>.</li>"
           
        }
    }
    if(WKNumState == APROVACAO_I){
        if(campoVazio(form,"aprovacaoI")) msgErro += "<li>É necessário informar a <b>Aprovação</b>.</li>"
        var aprovacaoI = form.getValue("aprovacaoI")
        var tipoAlbaran = form.getValue("tipoAlbaran")
        if(tipoAlbaran == "comContrato" && aprovacaoI == "aprovado" && campoVazio(form,"idAlbaran")) msgErro += "<li>É necessário gerar o albaran.</li>"
    }
    if(WKNumState == APROVACAO_II){
        if(campoVazio(form,"aprovacaoII")) msgErro += "<li>É necessário informar a <b>Aprovação</b>.</li>"
        var idAlbaran = form.getValue("idAlbaran")
        var aprovacaoII = form.getValue("aprovacaoII")
        if(aprovacaoII == "aprovado" && idAlbaran == "") msgErro += "<li>É necessário gerar o albaran.</li>"
    }
    if(msgErro != ""){
        msgErro = "<ul>" + msgErro + "</ul>"
        exibirMensagem(form, "<b>Atenção:</b><br/>"+msgErro)
    }
}
function campoVazio(form, fieldname){
    if(form.getValue(fieldname) == null || form.getValue(fieldname) == undefined || form.getValue(fieldname).trim() == "") return true
    else return false
}
function exibirMensagem(form, mensagem){
    var mobile = form.getMobile() != null && form.getMobile()
    if (mobile) throw mensagem
    else throw "<div class='alert alert-warning' role='alert'>"+mensagem+"</div>"
}