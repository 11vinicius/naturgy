var INICIO0 = 0
var INICIO1 = 6
var APROVACAO_I = 8
var AJUSTAR_SOLICITACAO = 7
var APROVACAO_II = 9
var FIM = 5

var beforeSendValidate = function(numState,nextState){

   if (numState == INICIO0 || numState == INICIO1 || numState == AJUSTAR_SOLICITACAO) {
    setTimeout(() => {
      var campos = $('.obgInicio')

      if($('#tipo').val().length == 0){
        $('#divTipo').css('border', '1px solid #e57200');
        $('#divTipo').css('border-radius', '4px');
      }

      if($('#sociedade').val().length == 0){
        $('#divSociedade').css('border', '1px solid #e57200');
        $('#divSociedade').css('border-radius', '4px');
      }

      if($('#numeroProcesso').val().length == 0){
        $('#divNumeroProcesso').css('border', '1px solid #e57200');
        $('#divNumeroProcesso').css('border-radius', '4px');
      }
      
      for (var i = 0; i < campos.length; i++) {
        var campo = campos[i]
        const campoItem = $(campo).parent().find('input, select, textarea')
        const campoType = $(campoItem).attr('type')
        const campoName = $(campoItem).attr('name')
    

        if ($("#" + campoName).val() == "" && campoType == "zoom") {
          $(campo).siblings("span").children(":first").children().css({ "border-color": "#e57200" })
          $(campo).change(() => {
            if ($("#" + campoName).val() != "") $("#" + campoName).siblings("span").children(":first").children().css({ "border-color": "" })
            else $("#" + campoName).siblings("span").children(":first").children().css({ "border-color": "#e57200" })
          })
        }
        if ($("#" + campoName).val() == "") {
          $("#" + campoName).css({ "border-color": "#e57200" })
          $("#" + campoName).change(function () {
            if ($("#" + campoName).val() == "") $("#" + campoName).css({ "border-color": "#e57200" })
            else $("#" + campoName).css({ "border-color": "" })
          })
        }
      }
    }, 1500)
  }
}

function comContrato() {
  var sociedade = $("#sociedade").val(); //SEG
  //var tipo = "Juros"
  var tipo = $("#tipo").val();
  var c1 = DatasetFactory.createConstraint("sociedadeOT", sociedade[0], sociedade[0], ConstraintType.MUST)
  var c2 = DatasetFactory.createConstraint("tipoPagamentoOT", tipo[0], tipo[0], ConstraintType.MUST)
  var dataset = DatasetFactory.getDataset("ds_form_cadastro_ordemTrabalho", null, [c1, c2], null)
  if (dataset.values.length > 0) {
    var contaOT = dataset.values[0].contaOT
    var ordemTrabalhoOT = dataset.values[0].ordemTrabalhoOT
    $("#conta").val(contaOT)
    // $("#conta").css({ "border-color": "#004571" })
    $("#ordemTrabalho").val(ordemTrabalhoOT)
    // $("#ordemTrabalho").css({ "border-color": "#004571" })

  }
}
function semContrato() {
  var sociedade = $("#sociedade").val(); //SEG
  //var tipo = "Juros"
  var tipo = $("#tipo").val();
  var c1 = DatasetFactory.createConstraint("sociedadeOT", sociedade[0], sociedade[0], ConstraintType.MUST)
  var c2 = DatasetFactory.createConstraint("tipoPagamentoOT", tipo[0], tipo[0], ConstraintType.MUST)
  var dataset2 = DatasetFactory.getDataset("ds_form_cadastro_ordemTrabalho", null, [c1, c2], null)
  if (dataset2.values.length > 0) {
    var contaOT = dataset2.values[0].contaOT
    var ordemTrabalhoOT = dataset2.values[0].ordemTrabalhoOT
    $("#conta").val(contaOT)
    $("#ordemTrabalho").val(ordemTrabalhoOT)
  }

  setTimeout(() => {
    let oNumProcesso = $('#numeroProcesso').val()[0]
    var c1 = DatasetFactory.createConstraint("numeroProcesso", oNumProcesso, oNumProcesso, ConstraintType.MUST)
    var dataset3 = DatasetFactory.getDataset("ds_form_cadastro_baseProcessos", null, [c1], null)
    if (dataset3.values.length > 0) {
      var vara = dataset3.values[0].vara
      var municipio = dataset3.values[0].municipio
      var escritorio = dataset3.values[0].escritorio
      var empresa = dataset3.values[0].empresa
      var principal = dataset3.values[0].principal
      var jurosATM = dataset3.values[0].jurosATM
      var caucao = dataset3.values[0].caucao
      var prestadora = dataset3.values[0].prestadora
      var codPrestadora = dataset3.values[0].codPrestadora
      var riscoProvavel = dataset3.values[0].riscoProvavel
      var apolice = dataset3.values[0].apolice
      var reclamante = dataset3.values[0].reclamante
      if (caucao) {
        $(".numeroContrato").find('label').removeClass('required')
      }

      if(jurosATM != 0 ){
        $('#divcontaJuros').find('label').addClass('required')
        $('#divordemTrabalhoJuros').find('label').addClass('required')
      }

      $("#vara").val(vara)
      $("#municipio").val(municipio)
      $("#escritorio").val(escritorio)
      // $("#sociedade").val(empresa)
      $("#valorPf").val(principal)
      $("#juros").val(jurosATM)
      $("#caucao").val(caucao)
      $("#terceirizada").val(prestadora)
      $("#numeroFornecedor").val(codPrestadora)
      $("#riscoProvavel").val(riscoProvavel)
      $("#apolice").val(apolice)
      $("#reclamanteRTE").val(reclamante)
    }
  }, 0);

}

$(document).ready(() => {

  // Pegar Num. Sequencial

  let atvAtual = $('#atividadeAtual').val();

  if (atvAtual == 0) {
    var c1 = DatasetFactory.createConstraint("processId", 'controle_processos_trabalhistas', 'controle_processos_trabalhistas', ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('status', '1', '1', ConstraintType.MUST_NOT);
    var ds12 = DatasetFactory.getDataset('workflowProcess', null, [c1, c2], null);
    let numSeq = ("00000" + ds12.values.length).slice(-5)
    $('#ALBSAP').val(numSeq);
  } else if (atvAtual == 8 || atvAtual == 7 || atvAtual == 9) {
    if ($('.tipoAlbaran:checked').val() == 'comContrato') {
      $('.divSemContrato').hide();
      $('.divJuros').hide();
      $('.divCaucao').hide();
    } else {
      $('.divDescricao').hide();
    }
  }
  if (atvAtual != 0 && atvAtual != 6 && atvAtual != 7) {
    $('.divSomarValue').hide();
  }
  if (atvAtual == 8 && $('#modoFormulario').val() != "VIEW") {
    $.ajax({
      url: '/api/public/2.0/users/getCurrent',
      type: "GET",
    }).done(function (data) {
      var user_fluig = data;
      var oGB_SAP = user_fluig.content.extData.GB_SAP;
      $('#userAprov1').val(oGB_SAP);
      console.log(oGB_SAP);
    });
  }

  if (atvAtual == 0 || atvAtual == 6 || atvAtual == 7) {
    $('.valorpf').maskMoney({ thousands: '.', decimal: ',' });
    $('.caucao').maskMoney({ thousands: '.', decimal: ',' });
    $('.juros').maskMoney({ thousands: '.', decimal: ',' });
    //$('.total').maskMoney({ thousands: '.', decimal: ',' });
  }

  if (atvAtual == 9 && $('#modoFormulario').val() != "VIEW") {
    $.ajax({
      url: '/api/public/2.0/users/getCurrent',
      type: "GET",
    }).done(function (data) {
      var user_fluig = data;
      var oGB_SAP = user_fluig.content.extData.GB_SAP;
      $('#userAprov2').val(oGB_SAP);
      console.log(oGB_SAP);
    });
  }

  $('#oFiltro').on('click', function () {
    if ($('.tipoAlbaran:checked').val() == 'comContrato') {
      comContrato();
    } else {
      semContrato();
    }
  });

 $('#juros').on('change',function(){
  if($('#juros').val() != 0){
    $('#divcontaJuros').find('label').addClass('required')
    $('#divordemTrabalhoJuros').find('label').addClass('required')
  }else{
    $('#divcontaJuros').find('label').removeClass('required')
    $('#divordemTrabalhoJuros').find('label').removeClass('required')
  }
 
 })

  // if(juros <= 0 ){
 
  //   console.log(juros)
  // }


  $('#SomarValue').on('click', function () {
    soma()
  })

  function soma() {

    var valorpf = $("#valorPf").val().replaceAll('.', '').replaceAll(',', '.')
    var juros = $("#juros").val().replaceAll('.', '').replaceAll(',', '.')
    var caucao = $("#caucao").val().replaceAll('.', '').replaceAll(',', '.')

    if (parseFloat(isNaN(valorpf)) || valorpf == "") {
      valorpf = 0;
    }
    if (parseFloat(isNaN(juros)) || juros == "") {
      juros = 0;
    }
    if (parseFloat(isNaN(caucao)) || caucao == "") {
      caucao = 0;
    }
    console.log(valorpf);
    console.log(juros);
    console.log(caucao);
    let resultado = parseFloat(valorpf) + parseFloat(juros) + parseFloat(caucao);
    console.log(resultado);
    $("#total").val(resultado.toLocaleString('pt-br', {minimumFractionDigits: 2}));
    //var total = $("#total").val().replaceAll('.', '').replaceAll(',', '.')
    /*     var valorpf = $("#valorPf").maskMoney('unmasked')[0]
    var juros = $("#juros").maskMoney('unmasked')[0]
    var caucao = $("#caucao").maskMoney('unmasked')[0]
    $("#total").maskMoney('unmasked')[0] */
    // var valorpf = $("#valorPf").val().replaceAll(',', '').replaceAll('.', '')
    // var juros = $("#juros").val().replaceAll(',', '').replaceAll('.', '')
    // var caucao = $("#caucao").val().replaceAll(',', '').replaceAll('.', '')
    // valorpf = parseFloat(valorpf) / 100
    // juros = parseFloat(juros) / 100
    // caucao = parseFloat(caucao) / 100

    /*     if (valorpf && juros && caucao) {
          var result = valorpf + juros + caucao
          $("#total").val(result)
        } */

  }


  $('#clearForm').on('click', function () {
    $("#conta").val('')
    $("#ordemTrabalho").val('');
    $("#terceirizada").val('')
    $("#numeroFornecedor").val('')
    $(".numeroContrato").val('')
    $("#numeroNotaFiscal").val('')
    $('#advogadoRTE').val('')
    $('#contratocaucao').val('')
    $('#apolice').val('')
    $('#riscoProvavel').val('')
    $('#escritorio').val('')
    $('#conceito').val('')
    $('#item').val('')
    $('#quantidade').val('')
    $('#moeda').val('')
    $('#mes').val('')
    $('#contaCaucao').val('')
    $('#formaPagamento').val('')
    $('#secSolicitacao').find('input:text').val('')
    $('#secDadosFin').find('input:text').val('')
    $('#secDadosFin').find('input:text').val('')
    // $('#divSemContrato').find('input:text').val('')
    $("#reclamanteRTE").val('')
    $("#municipio").val('')
    $("#vara").val('')
    $("#favorecido").val('')

    $("#riscoProvavel").find('input:text').val('')
    window['tipo'].clear();
    $('input[type=date]').val('');
    $('input[type=number]').val('');

    window['numeroProcesso'].clear();
    window['sociedade'].clear();
    $("#dataEmissao").val('')

  })

  if (atvAtual == 0) {
    setTimeout(() => {
      $("#comContrato").trigger('click');

    }, 1000);
  }
  if ($(".tipoAlbaran:checked").val() == "comContrato") {
    $(".divNumeroProcesso").hide();
    $(".numeroContrato").find('label').addClass('required')
    $("#numeroNotaFiscal").addClass('obgInicio')
    $(".divTerceirizada").hide();
    $(".divcontaJuros").hide()
    $(".divordemTrabalhoJuros").hide()
    $(".divTotal").hide();
    $(".divApolice").hide();
    $(".divDescricao").hide();
    $(".divAdvogadoRTE").hide();
    $(".divRiscoProvavel").hide();
    $(".divcnpj").show();
    $(".divcontratocaucao").hide();
  }


  $(".tipoAlbaran").on("click", function () {
    window['tipo'].clear();
    window['numeroProcesso'].clear();
    window['sociedade'].clear();

    if (this.value == "comContrato") {
      $(".numeroContrato").find('label').addClass('required')
      $("#numeroNotaFiscal").find('label').addClass('required')
      $("#numeroNotaFiscal").addClass('obgInicio')
      $(".divNumeroProcesso").hide("slow");
      $(".divTerceirizada").hide("slow");
      $(".divTotal").hide("slow");
      $(".divApolice").hide("slow");
      $(".divDescricao").hide("slow");
      $(".divAdvogadoRTE").hide("slow");
      $(".divRiscoProvavel").hide();
      $(".divcontratocaucao").hide();
      $(".divcontaJuros").hide()
      $(".divordemTrabalhoJuros").hide()

    } else {
      $("#numeroNotaFiscal").removeClass('obgInicio')
      $(".divNumeroProcesso").show("slow");
      $(".divTerceirizada").show("slow");
      $(".divTotal").show("slow");
      $(".divApolice").show("slow");
      $(".divAdvogadoRTE").show("slow");
      $(".divRiscoProvavel").show();
      $(".divcontratocaucao").show();
      $(".divcontaJuros").show()
      $(".divordemTrabalhoJuros").show()


    }
  })

  let tipoAlbaran = $("input[name=tipoAlbaran]")
  tipoAlbaran.on("change", (ev) => {
    $("#divComContrato").hide()
    $(".divSemContrato").hide()
    let albaran = ev.target.value
    if (albaran == "comContrato") {
      $("#divComContrato").show()
      $('.divSemContrato').hide()
      $(".numeroContrato").show()
      $(".divcnpj").show();
      $(".divnotafiscal").removeClass('required')
      $("#divnotafiscal").find('label').addClass('required')
      $(".divJuros").hide("slow");
      $(".divCaucao").hide("slow");
      $("#SomarValue").hide();
      $(".divcontaJuros").hide()
      $(".divordemTrabalhoJuros").hide()
    }

    if (albaran == "semContrato") {
      $(".divSemContrato").show()
      $(".divJuros").show("slow");
      $(".divCaucao").show("slow");
      $(".divcnpj").hide();
      $("#SomarValue").show();
      $(".divnotafiscal").addClass('required')
      $("#divnotafiscal").find('label').removeClass('required')
      $("#numeroNotaFiscal").removeClass('obgInicio')
      $(".divcontaJuros").show()
      $(".divordemTrabalhoJuros").show()
    }
  })

  const currencyToNumber = (numero) => {
    if (numero != null && numero != undefined && numero != '') {
      numero = numero.split(',')
      numero[0] = numero[0].split('.').join('')
      return parseFloat(numero.join('.'))
    } else {
      return 0
    }
  }
  const numberToCurrency = (numero) => {
    var numero = parseFloat(numero).toFixed(2).split('.')
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
  }
  const validaCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^0-9]/g, '')
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false
    function calcularDigito(str, peso) {
      let soma = 0
      for (let i = 0; i < str.length; i++) {
        soma += parseInt(str.charAt(i)) * peso[i]
      }
      let resto = soma % 11
      return (resto < 2) ? 0 : 11 - resto
    }
    let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    if (calcularDigito(cnpj.slice(0, 12), peso) !== parseInt(cnpj.charAt(12))) return false
    peso.unshift(6)
    if (calcularDigito(cnpj.slice(0, 13), peso) !== parseInt(cnpj.charAt(13))) return false
    return true
  }

  let cnpjFornecedor = $("#cnpjFornecedor")
  cnpjFornecedor.on("change", () => {
    let validacao = validaCNPJ(cnpjFornecedor.val())
    if (validacao == false) {
      FLUIGC.toast({ title: 'Atenção: ', message: 'número de cnpj inválido', type: 'warning' })
      cnpjFornecedor.val("")
    }
  })

  // if (WKNumState == INICIO0 || WKNumState == INICIO1 || WKNumState == AJUSTAR_SOLICITACAO) {
  //   setTimeout(() => {
  //     $("#numeroProcesso").addClass("obgInicio")
  //     $("#tipo").addClass("obgInicio")
  //     $("#emitente").addClass("obgInicio")
  //     var campos = $('.obgInicio')
  //     for (var i = 0; i < campos.length; i++) {
  //       var campo = campos[i]
  //       const campoItem = $(campo).parent().find('input, select, textarea')
  //       const campoType = $(campoItem).attr('type')
  //       const campoName = $(campoItem).attr('name')
  //       if ($("#" + campoName).val() == "" && campoType == "zoom") {
  //         $(campo).siblings("span").children(":first").children().css({ "border-color": "#e57200" })
  //         $(campo).change(() => {
  //           if ($("#" + campoName).val() != "") $("#" + campoName).siblings("span").children(":first").children().css({ "border-color": "#004571" })
  //           else $("#" + campoName).siblings("span").children(":first").children().css({ "border-color": "#e57200" })
  //         })
  //       }
  //       if ($("#" + campoName).val() == "") {
  //         $("#" + campoName).css({ "border-color": "#e57200" })
  //         $("#" + campoName).change(function () {
  //           if ($("#" + campoName).val() == "") $("#" + campoName).css({ "border-color": "#e57200" })
  //           else $("#" + campoName).css({ "border-color": "#004571" })
  //         })
  //       }
  //     }
  //   }, 1500)
  // }

  let btnGerarAlbaran = $("#btnGerarAlbaran")
  btnGerarAlbaran.on("click", () => {
    if (WKNumState == APROVACAO_I || WKNumState == APROVACAO_II) {

      var tipo = $("input[name=_tipoAlbaran]:checked").val()
      var ambiente = ""
      if (window.location.origin.indexOf("dev") > -1) ambiente = "HML"
      else ambiente = "PRD"
      var idAlbaran = 0
      if (tipo == "comContrato" && ambiente == "HML") idAlbaran = 1847
      if (tipo == "semContrato" && ambiente == "PRD") idAlbaran = 0


      if (tipo == "comContrato") {
        const template = getXmlExcelAlbaran()
        const templateFinal = template
        const nomeAnexo = 'Albaran.xls'
        const blobDoDocumento = new Blob([templateFinal], { type: "application/vnd.ms-excel" })
        const arquivoDoDocumento = new File([blobDoDocumento], nomeAnexo)

        const idPasta = $("#idPasta").val()
        const idAlbaran = $("#idAlbaran").val()

        if (idAlbaran == "" || idPasta == "") {
          criarPasta(responsePasta => {
            $("#idPasta").val(responsePasta)
            criarDocumento(arquivoDoDocumento, responsePasta, responseDocumento => {
              $("#idAlbaran").val(responseDocumento)
              FLUIGC.toast({ title: '', message: 'Albaran gerado com sucesso, id do documento: ' + responseDocumento, type: 'success' })
            })
          })
        } else {
          excluirDocumento(idAlbaran)
          excluirDocumento(idPasta)
          criarPasta(responsePasta => {
            $("#idPasta").val(responsePasta)
            criarDocumento(arquivoDoDocumento, responsePasta, responseDocumento => {
              $("#idAlbaran").val(responseDocumento)
              FLUIGC.toast({ title: '', message: 'Albaran gerado com sucesso, id do documento: ' + responseDocumento, type: 'success' })
            })
          })
        }
      }

      if (tipo == "semContrato") {
        let idDocTemplate = 0
        if (window.location.origin.indexOf("dev") > -1) idDocTemplate = 2347
        else idDocTemplate = 0

        gerarPDF(idDocTemplate)
      }


    }
  })
  let divbtnVerAlbaran = $("#divbtnVerAlbaran")
  divbtnVerAlbaran.on("click", () => {
    if (WKNumState == FIM) {
      const idAlbaran = $("#idAlbaran").val()
      const urlDocument = window.location.origin + "/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + idAlbaran
      window.open(urlDocument, "_blank")
    }
  })

})

$('#sociedade').on('change', atualizaSociedade())

function atualizaSociedade(tipo) {
  reloadZoomFilterValues("sociedade", "tipoPagamentoOT," + tipo);
}

function setSelectedZoomItem(selectedItem) {
  if (selectedItem.inputId == "tipo") {
    var tipo = selectedItem.txtDescricao
    atualizaSociedade(tipo);
    if (tipo == "CONDENAÇÃO - TERCEIROS" || tipo == "CONDENAÇÃO - PRÓPRIO" || tipo == "CONDENAÇÃO - TERCEIROS - CAUÇÃO") {
      $("#divContaJurosCaucao").show()
      var sociedade = $("#sociedade").val()
      var tipo = "Juros"
      var c1 = DatasetFactory.createConstraint("sociedadeOT", sociedade, sociedade, ConstraintType.MUST)
      var c2 = DatasetFactory.createConstraint("tipoPagamentoOT", tipo, tipo, ConstraintType.MUST)
      var dataset = DatasetFactory.getDataset("ds_form_cadastro_ordemTrabalho", null, [c1, c2], null)
      if (dataset.values.length > 0) {
        var contaOT = dataset.values[0].contaOT
        var ordemTrabalhoOT = dataset.values[0].ordemTrabalhoOT
        $("#contaJuros").val(contaOT)
        $("#ordemTrabalhoJuros").val(ordemTrabalhoOT)
      }
      $(".divSemContrato").hide()

      if($('input[name=tipoAlbaran').val() == 'sem contrato'){
        $(".divSemContrato").show()
      }

    } else {
      $(".divSemContrato").hide()
    }
  }

  if (selectedItem.inputId == "numeroProcesso") {
    /*     var vara = selectedItem.vara
        var municipio = selectedItem.municipio
        var escritorio = selectedItem.escritorio
        var empresa = selectedItem.empresa
        var principal = selectedItem.principal
        var jurosATM = selectedItem.jurosATM
        var caucao = selectedItem.caucao
        var prestadora = selectedItem.prestadora
        var codPrestadora = selectedItem.codPrestadora
        var riscoProvavel = selectedItem.riscoProvavel
        var apolice = selectedItem.apolice
        var reclamante = selectedItem.reclamante
        $("#vara").val(vara)
        $("#municipio").val(municipio)
        $("#escritorio").val(escritorio)
        $("#sociedade").val(empresa)
        $("#valorPf").val(principal)
        $("#juros").val(jurosATM)
        $("#caucao").val(caucao)
        $("#terceirizada").val(prestadora)
        $("#numeroFornecedor").val(codPrestadora)
        $("#riscoProvavel").val(riscoProvavel)
        $("#apolice").val(apolice)
        $("#reclamanteRTE").val(reclamante) */

    var c = DatasetFactory.createConstraint("txtDescricao", empresa, empresa, ConstraintType.MUST)
    var ds = DatasetFactory.getDataset("ds_form_cadastro_sociedade", null, [c], null)
    var codigo = ds.values[0].txtCod
    $("#codigoSociedade").val(codigo)

    if (riscoProvavel == "" || parseInt(riscoProvavel) == 0) FLUIGC.toast({ title: 'Atenção!', message: 'Pagamento não provisionado', type: 'danger' })

    var tipo = $("#tipo").val()
    if (tipo == "CONDENAÇÃO - TERCEIROS" || tipo == "CONDENAÇÃO - PRÓPRIO" || tipo == "CONDENAÇÃO - TERCEIROS - CAUÇÃO") {
      $("#caucaoCondenacao").val(caucao)
      var sociedade = empresa
      var tipo = "Juros"
      var c1 = DatasetFactory.createConstraint("sociedadeOT", sociedade, sociedade, ConstraintType.MUST)
      var c2 = DatasetFactory.createConstraint("tipoPagamentoOT", tipo, tipo, ConstraintType.MUST)
      var dataset = DatasetFactory.getDataset("ds_form_cadastro_ordemTrabalho", null, [c1, c2], null)
      if (dataset.values.length > 0) {
        var contaOT = dataset.values[0].contaOT
        var ordemTrabalhoOT = dataset.values[0].ordemTrabalhoOT
        $("#contaJuros").val(contaOT)
        $("#ordemTrabalhoJuros").val(ordemTrabalhoOT)
      }
    }
  }

  if (selectedItem.inputId == "tipo" || selectedItem.inputId == "numeroProcesso") {
    var sociedade = $("#sociedade").val()
    var tipo = $("#tipo").val()[0]
    var c1 = DatasetFactory.createConstraint("sociedadeOT", sociedade, sociedade, ConstraintType.MUST)
    var c2 = DatasetFactory.createConstraint("tipoPagamentoOT", tipo, tipo, ConstraintType.MUST)
    var dataset = DatasetFactory.getDataset("ds_form_cadastro_ordemTrabalho", null, [c1, c2], null)
    if (dataset.values.length > 0) {
      var contaOT = dataset.values[0].contaOT
      var ordemTrabalhoOT = dataset.values[0].ordemTrabalhoOT
      $("#conta").val(contaOT)
      $("#ordemTrabalho").val(ordemTrabalhoOT)
    }

    var numeroProcesso = $("#numeroProcesso").val()[0]
    if (tipo != "" && numeroProcesso != "") {
      var c3 = DatasetFactory.createConstraint("tipo", tipo, tipo, ConstraintType.MUST)
      var c4 = DatasetFactory.createConstraint("numeroProcesso", numeroProcesso, numeroProcesso, ConstraintType.MUST)
      var ds = DatasetFactory.getDataset("ds_form_controle_processos_trabalhistas", null, [c3, c4], null)
      if (ds.values.length > 0) {
        for (var i = 0; i < ds.values.length; i++) {
          var campo = ds.values[i]
          // var sociedade = $("#sociedade").val();
          var numeroSolicitacao = campo.numeroSolicitacao
          var link = "<a target='_blank' href='" + window.location.origin + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numeroSolicitacao + "'>" + numeroSolicitacao + "</a>"
          //FLUIGC.toast({ title: 'Atenção!', message: 'Existe uma solicitação com o mesmo tipo de pagamento e processo: ' + link, type: 'danger' })
        }
      }
    }
  }
}

function getXmlExcelAlbaran() {

  var numeroPedido = $("input[name=numeroSolicitacao]").val()
  var numeroContrato = $("input[name=numeroContrato]").val()
  var dataSolicitacao = $("input[name=dataSolicitacao]").val()
  dataSolicitacao = dataSolicitacao.split("/")[2] + "-" + dataSolicitacao.split("/")[1] + "-" + dataSolicitacao.split("/")[0]
  var numeroNotaFiscal = $("input[name=numeroNotaFiscal]").val()
  var sociedade = $("input[name=sociedade]").val()
  var codigoSociedade = ""
  if (sociedade == "CEG") codigoSociedade = "0016"
  if (sociedade == "CEG RIO") codigoSociedade = "0017"
  if (sociedade == "GNSPS") codigoSociedade = "0040"
  if (sociedade == "GNS") codigoSociedade = "0041"
  if (sociedade == "GNB") codigoSociedade = "0029"
  var numeroFornecedor = $("input[name=numeroFornecedor]").val()
  var terceirizada = $("input[name=terceirizada]").val()
  var moeda = $("input[name=moeda]").val()
  var item = $("input[name=item]").val()
  var quantidade = $("input[name=quantidade]").val()
  var conceito = $("input[name=conceito]").val()
  var valorPf = currencyToNumber($("input[name=valorPf]").val())
  var valorTotal = currencyToNumber($("input[name=total]").val())
  var contaContabil = $("input[name=conta]").val()
  var ordemTrabalho = $("input[name=ordemTrabalho]").val()
  var nomeAprovadorI = $("input[name=nomeAprovadorI]").val()
  var idAprovadorI = $("input[name=idAprovadorI]").val()
  var nomeSolicitante = $("input[name=nomeSolicitante]").val()


  var xmlExcel =
    `<?xml version="1.0"?>
    <?mso-application progid="Excel.Sheet"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:html="http://www.w3.org/TR/REC-html40">
    <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
      <Author>Nickolas Meirelles</Author>
      <LastAuthor>Nickolas Meirelles</LastAuthor>
      <Created>2024-01-05T17:57:51Z</Created>
      <LastSaved>2024-01-05T17:58:26Z</LastSaved>
      <Version>16.00</Version>
    </DocumentProperties>
    <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
      <AllowPNG/>
    </OfficeDocumentSettings>
    <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
      <WindowHeight>11865</WindowHeight>
    <WindowWidth>28800</WindowWidth>
    <WindowTopX>32767</WindowTopX>
    <WindowTopY>32767</WindowTopY>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="s16" ss:Name="Vírgula">
   <NumberFormat ss:Format="_-* #,##0.00_-;\-* #,##0.00_-;_-* &quot;-&quot;??_-;_-@_-"/>
  </Style>
  <Style ss:ID="m2552796070304">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079496">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079556">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796075584">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796075684">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796081328">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796081348" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796081368">
   <Alignment ss:Horizontal="Right" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796081388" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="m2552796081408">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Interior ss:Color="#D4DEE3" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="m2552796077792">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796077812" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796077832">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796077852" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796077872">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796077892" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073424">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073444" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073464">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073484" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073504">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073524" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079248">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079268" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079288">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079308" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079328">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796079348" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073236">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796073256">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796073276">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073296" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073316">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073336" ss:Parent="s16">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073008">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796073028">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796073048">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796073088">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073108">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796073128">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796074504">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796074524">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat ss:Format="Short Date"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796074544">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571" ss:Bold="1"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="m2552796069948">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796069988">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="7" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796070008">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796070048">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="m2552796070068">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s62">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:FontName="FS Emeric Core" ss:Size="24" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s63">
   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
  </Style>
  <Style ss:ID="s64">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Arial" x:Family="Swiss" ss:Size="7" ss:Color="#004165"/>
  </Style>
  <Style ss:ID="s65">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:Rotate="90"
    ss:WrapText="1"/>
   <Font ss:FontName="FS Emeric Core" ss:Size="48" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s69">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="7" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s70">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s73">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s74">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="12"
    ss:Color="#000000"/>
  </Style>
  <Style ss:ID="s75">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="12"
    ss:Color="#000000"/>
  </Style>
  <Style ss:ID="s79">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s86">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat ss:Format="@"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s87">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s91">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="7" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s92">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s93">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s94">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat ss:Format="0"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s95">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat ss:Format="0"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s107">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s108">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s109">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat ss:Format="0"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s110">
   <Alignment ss:Horizontal="Right" ss:Vertical="Top" ss:ShrinkToFit="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Arial" x:Family="Swiss" ss:Size="8" ss:Color="#305496"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s111">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:FontName="FS Emeric Core" ss:Size="7" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s112">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s119">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"
     ss:Color="#004571"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
  </Style>
  <Style ss:ID="s122">
   <Alignment ss:Horizontal="Right" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s134">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="FS Emeric Core" ss:Size="8" ss:Color="#004571"/>
   <NumberFormat ss:Format="Short Date"/>
   <Protection ss:Protected="0"/>
  </Style>
  <Style ss:ID="s136">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="12"
    ss:Color="#000000"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Planilha1">
  <Table ss:ExpandedColumnCount="24" ss:ExpandedRowCount="44" x:FullColumns="1"
   x:FullRows="1" ss:DefaultColumnWidth="46.5" ss:DefaultRowHeight="15">
   <Column ss:AutoFitWidth="0" ss:Width="58.5"/>
   <Column ss:Width="57.75"/>
   <Column ss:AutoFitWidth="0" ss:Width="102.75"/>
   <Column ss:Index="6" ss:AutoFitWidth="0" ss:Width="184.5"/>
   <Column ss:Index="12" ss:AutoFitWidth="0" ss:Width="45"/>
   <Column ss:AutoFitWidth="0" ss:Width="104.25"/>
   <Column ss:Index="15" ss:AutoFitWidth="0" ss:Width="41.25"/>
   <Column ss:AutoFitWidth="0" ss:Width="45" ss:Span="1"/>
   <Column ss:Index="18" ss:AutoFitWidth="0" ss:Width="60.75"/>
   <Column ss:Index="24" ss:Width="52.5"/>
   <Row ss:Height="30">
    <Cell ss:MergeAcross="4" ss:StyleID="s62"><Data ss:Type="String">Albaran de contrato</Data></Cell>
    <Cell ss:MergeAcross="16" ss:MergeDown="1" ss:StyleID="s63"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s64"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:MergeDown="40" ss:StyleID="s65"><Data ss:Type="String">Albaran de contrato</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="m2552796069948"><Data ss:Type="String">Número do pedido</Data></Cell>
    <Cell ss:MergeDown="3" ss:StyleID="s69"/>
    <Cell ss:StyleID="s70"><Data ss:Type="String">Nº do contrato</Data></Cell>
    <Cell ss:MergeDown="1" ss:StyleID="m2552796069988"/>
    <Cell ss:MergeAcross="1" ss:StyleID="m2552796070008"><ss:Data ss:Type="String"
      xmlns="http://www.w3.org/TR/REC-html40"><Font html:Color="#004571">Data </Font><I><Font
        html:Color="#004571">(dd.mm.aaaa)</Font></I></ss:Data></Cell>
    <Cell ss:MergeDown="3" ss:StyleID="s69"/>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796070048"><Data ss:Type="String">Nº da Nota Fiscal</Data></Cell>
    <Cell ss:MergeAcross="1" ss:MergeDown="1" ss:StyleID="m2552796070068"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s73"><ss:Data ss:Type="String"
      xmlns="http://www.w3.org/TR/REC-html40"><Font html:Color="#004571">Sociedade </Font><I><Font
        html:Color="#004571">(numérico)</Font></I><Font html:Color="#004571">:</Font></ss:Data></Cell>
    <Cell ss:MergeAcross="2" ss:MergeDown="1" ss:StyleID="s74"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:MergeAcross="2" ss:StyleID="m2552796074504"><Data
      ss:Type="String">`+ numeroPedido + `</Data></Cell>
    <Cell ss:Index="6" ss:StyleID="s79"><Data ss:Type="Number">`+ numeroContrato + `</Data></Cell>
    <Cell ss:Index="8" ss:MergeAcross="1" ss:StyleID="m2552796074524"><Data
      ss:Type="DateTime">`+ dataSolicitacao + `T00:00:00.000</Data></Cell>
    <Cell ss:Index="11" ss:MergeAcross="3" ss:StyleID="m2552796074544"><Data
      ss:Type="String">`+ numeroNotaFiscal + `</Data></Cell>
    <Cell ss:Index="17" ss:MergeAcross="2" ss:StyleID="s86"><Data ss:Type="String">`+ codigoSociedade + `</Data><Comment
      ss:Author="INGRID MARRUGO MARRUGO"><ss:Data
       xmlns="http://www.w3.org/TR/REC-html40"><B><Font html:Face="Tahoma"
         x:Family="Swiss" html:Size="12" html:Color="#000000">INGRID MARRUGO MARRUGO:</Font></B><Font
        html:Face="Tahoma" x:Family="Swiss" html:Size="12" html:Color="#000000">&#10;</Font></ss:Data></Comment></Cell>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:MergeAcross="2" ss:StyleID="m2552796073008"><Data
      ss:Type="String">Número do fornecedor (Código SAP)</Data></Cell>
    <Cell ss:Index="6" ss:MergeAcross="3" ss:StyleID="m2552796073028"><Data
      ss:Type="String">Nome do fornecedor</Data></Cell>
    <Cell ss:Index="11" ss:MergeAcross="3" ss:StyleID="m2552796073048"><ss:Data
      ss:Type="String" xmlns="http://www.w3.org/TR/REC-html40"><Font
       html:Color="#004571">Moeda </Font><I><Font html:Size="7" html:Color="#004571">(BRL, EUR o USD)</Font></I><Font
       html:Size="7" html:Color="#004571">:</Font></ss:Data></Cell>
    <Cell ss:MergeAcross="7" ss:MergeDown="1" ss:StyleID="s87"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:MergeAcross="2" ss:StyleID="m2552796073088"><Data
      ss:Type="Number">`+ numeroFornecedor + `</Data></Cell>
    <Cell ss:Index="6" ss:MergeAcross="3" ss:StyleID="m2552796073108"><Data
      ss:Type="String">`+ terceirizada + `</Data></Cell>
    <Cell ss:Index="11" ss:MergeAcross="3" ss:StyleID="m2552796073128"><Data
      ss:Type="String">`+ moeda + `</Data></Cell>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:MergeAcross="20" ss:StyleID="s91"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s92"><Data ss:Type="String">Item</Data></Cell>
    <Cell ss:StyleID="s93"><ss:Data ss:Type="String"
      xmlns="http://www.w3.org/TR/REC-html40"><Font html:Color="#004571">Quantidade </Font><I><Font
        html:Color="#004571">(unidades)</Font></I></ss:Data></Cell>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796073236"><Data ss:Type="String">Conceito</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796073256"><Data ss:Type="String">Valor</Data></Cell>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"><Data ss:Type="Number">`+ item + `</Data></Cell>
    <Cell ss:StyleID="s95"><Data ss:Type="Number">`+ quantidade + `</Data></Cell>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796073276"><Data ss:Type="String">`+ conceito + `</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796073296"><Data ss:Type="Number">`+ valorPf + `</Data></Cell>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796073316"/>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796073336"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796079248"/>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796079268"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796079288"/>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796079308"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796079328"/>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796079348"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796073424"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796073444"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796073464"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796073484"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796073504"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796073524"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796077792"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796077812"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796077832"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796077852"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"/>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796077872"/>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796077892"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s94"><Data ss:Type="String">&#160;&#160;</Data></Cell>
    <Cell ss:StyleID="s95"/>
    <Cell ss:MergeAcross="14" ss:StyleID="m2552796081328"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796081348"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:MergeAcross="16" ss:StyleID="m2552796081368"><Data
      ss:Type="String">Valor total</Data></Cell>
    <Cell ss:MergeAcross="3" ss:StyleID="m2552796081388"
     ss:Formula="=SUM(R[-12]C:R[-1]C[3])"><Data ss:Type="Number">`+ valorTotal + `</Data></Cell>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.9375">
    <Cell ss:Index="2" ss:MergeAcross="9" ss:StyleID="m2552796081408"><Data
      ss:Type="String">Detalhe do aplicativo </Data></Cell>
    <Cell ss:MergeAcross="10" ss:MergeDown="1" ss:StyleID="s75"/>
   </Row>
   <Row>
    <Cell ss:Index="2" ss:StyleID="s107"><Data ss:Type="String">Item</Data></Cell>
    <Cell ss:StyleID="s107"><Data ss:Type="String">Conta Contábil</Data></Cell>
    <Cell ss:MergeAcross="4" ss:StyleID="s73"><Data ss:Type="String">Ordem de trabalho</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="s73"><Data ss:Type="String">Valor</Data></Cell>
   </Row>
   <Row>
    <Cell ss:Index="2" ss:StyleID="s108"><Data ss:Type="Number">`+ item + `</Data></Cell>
    <Cell ss:StyleID="s108"><Data ss:Type="Number">`+ contaContabil + `</Data></Cell>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"><Data ss:Type="String">`+ ordemTrabalho + `</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"><Data ss:Type="Number">`+ valorPf + `</Data></Cell>
    <Cell ss:MergeDown="19" ss:StyleID="s111"/>
    <Cell ss:MergeDown="1" ss:StyleID="s112"><Data ss:Type="String">Autoriza: &#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="8" ss:MergeDown="1" ss:StyleID="m2552796075584"><Data
      ss:Type="String">`+ nomeAprovadorI + `</Data></Cell>
   </Row>
   <Row>
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
    <Cell ss:Index="13" ss:StyleID="s119"><Data ss:Type="String">código do usuario: &#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="8" ss:StyleID="m2552796075684"><Data ss:Type="Number">1234567890</Data></Cell>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
    <Cell ss:Index="13" ss:StyleID="s119"><ss:Data ss:Type="String"
      xmlns="http://www.w3.org/TR/REC-html40"><Font html:Color="#004571">(Assinatura o</Font><Font
       html:Color="#305496"> </Font><Font html:Face="Calibri" x:Family="Swiss"
       html:Size="11" html:Color="#305496">Carimbo</Font><Font html:Color="#305496">)</Font></ss:Data></Cell>
    <Cell ss:MergeAcross="8" ss:StyleID="m2552796079496"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
    <Cell ss:Index="13" ss:MergeAcross="9" ss:MergeDown="13"
     ss:StyleID="m2552796079556"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s122"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0" ss:Height="15.5625">
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row ss:AutoFitHeight="0">
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
   </Row>
   <Row>
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s109"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
    <Cell ss:Index="13" ss:StyleID="s107"><Data ss:Type="String">Preparado por: &#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="8" ss:StyleID="m2552796070304"><Data ss:Type="String">`+ nomeSolicitante + `</Data></Cell>
   </Row>
   <Row>
    <Cell ss:Index="2" ss:StyleID="s108"/>
    <Cell ss:StyleID="s108"/>
    <Cell ss:MergeAcross="4" ss:StyleID="s108"><Data ss:Type="String">&#160;&#160;&#160;&#160;&#160;</Data></Cell>
    <Cell ss:MergeAcross="2" ss:StyleID="s110"/>
    <Cell ss:Index="13" ss:StyleID="s107"><ss:Data ss:Type="String"
      xmlns="http://www.w3.org/TR/REC-html40"><Font html:Color="#004571">Data </Font><I><Font
        html:Color="#004571">(dd.mm.aaaa)</Font></I><Font html:Color="#004571">: &#160;&#160;&#160;&#160;&#160;</Font></ss:Data></Cell>
    <Cell ss:MergeAcross="8" ss:StyleID="s134"><Data ss:Type="DateTime">`+ dataSolicitacao + `T00:00:00.000</Data></Cell>
   </Row>
   <Row ss:Height="15.75">
    <Cell ss:Index="2" ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:MergeAcross="2" ss:StyleID="s63"/>
    <Cell ss:Index="14" ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
    <Cell ss:StyleID="s136"/>
   </Row>
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Header x:Margin="0.31496062000000002"/>
    <Footer x:Margin="0.31496062000000002"/>
    <PageMargins x:Bottom="0.78740157499999996" x:Left="0.511811024"
     x:Right="0.511811024" x:Top="0.78740157499999996"/>
   </PageSetup>
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>4</ActiveRow>
     <ActiveCol>23</ActiveCol>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R26C14:R26C22</Range>
   <Type>Whole</Type>
   <Min>0</Min>
   <Max>9999999999999990000</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R9C19:R21C22</Range>
   <Type>Decimal</Type>
   <Min>0</Min>
   <Max>9.99999999999999E+23</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R6C2:R6C4</Range>
   <Type>Whole</Type>
   <Min>0</Min>
   <Max>9999999999999</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R4C6</Range>
   <Type>Whole</Type>
   <Min>0</Min>
   <Max>999999999999999000</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R24C9:R43C11</Range>
   <Type>Decimal</Type>
   <Min>0</Min>
   <Max>9.99999999999999E+31</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R9C3:R20C3</Range>
   <Type>Whole</Type>
   <Min>0</Min>
   <Max>9.99999999999999E+23</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R24C2:R42C3</Range>
   <Type>Whole</Type>
   <Min>0</Min>
   <Max>9.99999999999999E+31</Max>
  </DataValidation>
  <DataValidation xmlns="urn:schemas-microsoft-com:office:excel">
   <Range>R9C2:R20C2</Range>
   <Type>Whole</Type>
   <Min>0</Min>
   <Max>9999999999999990</Max>
  </DataValidation>
 </Worksheet>
    </Workbook>`
  return xmlExcel

}

function currencyToNumber(numero) {
  if (numero != null && numero != undefined && numero != '') {
    numero = numero.split(',')
    numero[0] = numero[0].split('.').join('')
    return String(parseFloat(numero.join('.')))
  } else {
    return 0
  }
}