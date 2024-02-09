function displayFields(form,customHTML){
    form.setShowDisabledFields(true)
    form.setHidePrintLink(true)
    form.setVisibleById('secDadosControle', false)
    var WKNumState = getValue("WKNumState")
    var atividadeAnterior = form.getValue("atividadeAnterior")
    form.setValue("atividadeAtual", WKNumState)
    customHTML.append("<script> var WKNumState = '" + WKNumState + "'</script>")
    form.setValue("modoFormulario", form.getFormMode())

    if(WKNumState == INICIO0 || WKNumState == INICIO1){
        form.setVisibleById('divbtnGerarAlbaran', false)
        form.setVisibleById('divbtnVerAlbaran', false)
        form.setVisibleById('divbtnAnexarBoleto', false)
        form.setVisibleById('secAprovacaoI', false)
        form.setVisibleById('secAprovacaoII', false)
        form.setVisibleById('secDadosGeracao', false)
        setInitialData(form)
    }
    if(WKNumState == AJUSTAR_SOLICITACAO){
        form.setVisibleById('divbtnGerarAlbaran', false)
        form.setVisibleById('divbtnVerAlbaran', false)
        form.setVisibleById('divbtnAnexarBoleto', false)
        form.setVisibleById('secAprovacaoII', false)
        form.setVisibleById('secDadosGeracao', false)
        form.setValue("atividadeAtualDesc", "Ajustar Solicitação" )

        var tipoAlbaran = form.getValue("tipoAlbaran")
        if(tipoAlbaran == "comContrato"){
            form.setVisibleById('SomarValue', false)
        }
    
    }

    

    if(WKNumState == AJUSTAR_SOLICITACAO && atividadeAnterior == "16"){
        form.setVisibleById('secAprovacaoII', true)
    }

    if(WKNumState == APROVACAO_I){
        form.setVisibleById('divbtnVerAlbaran', false)
        form.setVisibleById('secAprovacaoII', false)
        form.setValue("atividadeAtualDesc", "Aprovação Nível I" )

        var user = fluigAPI.getUserService().getCurrent()
        var userId = user.getCode()
        var userName = user.getFullName()
        form.setValue("idAprovadorI",userId)
        form.setValue("nomeAprovadorI",userName)

        var tipoAlbaran = form.getValue("tipoAlbaran")
        if(tipoAlbaran == "semContrato"){
            form.setVisibleById('secDadosGeracao', false)
        }

    }
    
    if(WKNumState == APROVACAO_II){
        form.setVisibleById('divbtnVerAlbaran', false)
        form.setValue("atividadeAtualDesc", "Aprovação Nível II" )
    }
    if(WKNumState == FIM){
        form.setVisibleById('divbtnGerarAlbaran', false)
        form.setVisibleById('divbtnAnexarBoleto', false)
        form.setValue("atividadeAtualDesc", "Finalizado" )
    }

    var tipo = form.getValue("tipo")
    if(tipo == "CONDENAÇÃO - TERCEIROS" || tipo == "CONDENAÇÃO - PRÓPRIO" || tipo == "CONDENAÇÃO - TERCEIROS - CAUÇÃO"){
        form.setVisibleById('divContaJurosCaucao', true)
    }else{
        form.setVisibleById('divContaJurosCaucao', false)
    }

    var tipoAlbaran = form.getValue("tipoAlbaran")
    if(tipoAlbaran == ""){
        form.setVisibleById('divComContrato', false)
        // form.setVisibleById('divSemContrato', false)
    }
    // if(tipoAlbaran == "comContrato") form.setVisibleById('divSemContrato', false)
    if(tipoAlbaran == "semContrato") form.setVisibleById('divComContrato', false)
    
}
function setInitialData(form){
    try {
        var user = fluigAPI.getUserService().getCurrent()
        var userId = user.getCode()
        var userLogin = user.getLogin()
        var userName = user.getFullName()
        var userEmail = user.getEmail()
        form.setValue("idSolicitante", userId )
        form.setValue("loginSolicitante", userLogin )
        form.setValue("nomeSolicitante", userName )
        form.setValue("emitente", userName)
        form.setValue("emailSolicitante", userEmail )
        form.setValue("dataSolicitacao", getDate() )
        form.setValue("atividadeAtualDesc", "Início" )
    } catch (error) {
        log.dir(error)
    }
}
function getDate(){
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    today = dd + '/' + mm + '/' + yyyy
    return today
}