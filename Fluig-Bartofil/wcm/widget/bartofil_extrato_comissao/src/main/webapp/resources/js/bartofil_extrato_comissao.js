var extratocampanha = SuperWidget.extend({
	grouprca: "RCA",
	current: null,
	mobile: FLUIGC.utilities.checkDevice().isMobile,
	loading: FLUIGC.loading(".widget-extrato"),
	representante: null,
	init : function() {
		$(".pageTitle").parent().remove();
		extratocampanha.loading.show();
		
		extratocampanha.grouprca = perfilrepresentante.grouprca;
		extratocampanha.current = perfilrepresentante.representante; 
		
		if (extratocampanha.mobile) {
			$('#visualizacaoresumido').prop('checked', true);
			extratocampanha.showresumido();
			$("[data-click-print]").hide();
		}
		
		this.getcomissoes();
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado": ['click_showdetalhado'],
			"click-resumido": ['click_showresumido'],
			"change-periodo": ['change_getcomissoes'],
			"click-print": ['click_print'],
			"change-representante": ['change_listcomissoes']
		}
	},
	
	savePreferences: function(el, ev) {
		var args = {
			"grouprca": $('input[id="grouprca"]', this.DOM).val()
		};
		console.log(args);
		
		WCMSpaceAPI.PageService.UPDATEPREFERENCES({
		    async: true,
		    success: function (data) {
		    	console.log("UPDATEPREFERENCES", data);
		    },
		    fail: function (xhr, message, errorData) {
		    	console.log("UPDATEPREFERENCES fail", xhr, message, errorData);
		    }
		}, this.instanceId, args );
	},	
	
	listcomissoes: function(el, ev) {
		extratocampanha.loading.show();
		extratocampanha.current = perfilrepresentante.representante; 
		extratocampanha.getcomissoes();
	},
	
	print: function() {
		var newWin=window.open('','Print-Window');
		newWin.document.open();
		newWin.document.write('<html><head><link type="text/css" rel="stylesheet" href="https://style.fluig.com/css/fluig-style-guide.min.css"></head><body onload="window.print()">'+$(".toprint").html()+'</body></html>');
		newWin.document.close();
		setTimeout(function(){newWin.close();},10);		
	},
	
	getcomissoes: function(el, ev) {

		extratocampanha.loading.show();

		$('#table-lancamentos > tbody').html("");
		$('#table-eventos > tbody').html("");
		$('#table-meses > tbody').html("");
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var c1 = DatasetFactory.createConstraint("pessoa", extratocampanha.current, extratocampanha.current, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("ano", ano, ano, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("mes", mes, mes, ConstraintType.MUST, false);

		console.log(extratocampanha.current, ano, mes)
		
		DatasetFactory.getDataset("ds_comissoes", null, [c1, c2, c3], null, {"success": extratocampanha.onreadygetcomissoes} );
		
		
	},

	onreadygetcomissoes: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			extratocampanha.loading.hide();
			WCMC.messageError('${i18n.getTranslation("representante.nao.comissoes")}');	    			
			return;
		}
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		var values = rows["values"];
		
		$('#table-lancamentos > tbody').html("");
		$('#table-eventos > tbody').html("");
		$('#table-meses > tbody').html("");
		
		var html = "";
		var totais = {};
		var eventos = {};
		var meses = {};
		
		var locale = WCMAPI.locale;
		locale = locale.replace("_", "-"); 
		
		moment.locale(locale);
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('DD/MM/YYYY');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('DD/MM/YYYY');
		
		$(".dias-periodo").html(startOfMonth + " A " + endOfMonth);
		$(".title-periodo").html(mes + "/" + ano);
		
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			var dl = moment(row["datalancamento"]);
			html += "<tr class='" + (row["debcredito"] == "D" ? 'danger' : 'success') + "'><td>" + (dl.isValid() ? dl.format("DD/MM/YYYY") : "") + "</td><td class='fs-txt-right'>" + row["codevento"] + "</td><td class='fs-txt-right'>" + row["nrocarga"] + "</td><td class='fs-txt-right'>" + row["nrodocumento"] + "</td><td class='fs-txt-right'>" + row["nropedidovenda"] + "</td><td class='fs-txt-right'>" + row["nroparcela"] + "</td><td>" + row["historico"] + "</td><td class='fs-txt-right'>" + row["valor"] + "</td><td class='fs-txt-left'>" + row["debcredito"] + "</td></tr>";
		
			var v = parseFloat(row["valor"].replace(/,/g, '').replace(",", "."));
			if (!totais[row["debcredito"]]) {
				totais[row["debcredito"]] = { "qtde": 1, "valor": v };
			} else {
				totais[row["debcredito"]].qtde += 1;
				totais[row["debcredito"]].valor += v;
			}
			
			if (!eventos[row["codevento"]]) {
				eventos[row["codevento"]] = { "descricao": row["descevento"], "debitos": (row["debcredito"] == "D" ? v : 0), "creditos": (row["debcredito"] == "C" ? v : 0)};
			} else {
				eventos[row["codevento"]].debitos += (row["debcredito"] == "D" ? v : 0);
				eventos[row["codevento"]].creditos += (row["debcredito"] == "C" ? v : 0);
			}
		}
		
		var total = 0;
		var qtde = 0;
		if (totais["C"]) { 
			total = totais["C"].valor;
			qtde = totais["C"].qtde;
		}
		if (totais["D"]) { 
			total = total - totais["D"].valor;
			qtde += totais["D"].qtde;
		}
		
		$('#table-lancamentos > tbody').html(html);
		
		html = '<tr class="warning"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("totais")}</strong></td><td class="fs-txt-center"><strong>${i18n.getTranslation("valor")}</strong></td><td class="fs-txt-center"><strong>${i18n.getTranslation("qtd")}</strong></td></tr>' +
			'<tr class="danger"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("debitos")}</strong></td><td class="fs-txt-right">' + (totais["D"] ? extratocampanha.mask(totais["D"].valor.toFixed(2)) : "0,00") + '</td><td class="fs-txt-center">' + (totais["D"] ? totais["D"].qtde : "0") + '</td></tr>' +
			'<tr class="success"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("creditos")}</strong></td><td class="fs-txt-right">' + (totais["C"] ? extratocampanha.mask(totais["C"].valor.toFixed(2)) : "0,00") + '</td><td class="fs-txt-center">' + (totais["C"] ? totais["C"].qtde : "0") + '</td></tr>' + 
			'<tr class="warning"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("total.geral")}</strong></td><td class="fs-txt-right">' + extratocampanha.mask(total.toFixed(2)) + '</td><td class="fs-txt-center">' + qtde + '</td></tr>';
		 
		$('#table-lancamentos > tfoot').html(html);

		html = "";
		for (var key in eventos) {
			var ev = eventos[key];
			html += '<tr><td>' + key + '</td><td class="no-mobile">' + ev["descricao"] + '</td><td class="fs-txt-right">' + extratocampanha.mask(ev["debitos"].toFixed(2)) + '</td><td class="fs-txt-right">' + extratocampanha.mask(ev["creditos"].toFixed(2)) + '</td></tr>'; 
		}
		
		html += '<tr class="warning"><td class="no-mobile"></td><td class="fs-txt-right"><strong>${i18n.getTranslation("total")}:</strong></td><td class="fs-txt-right"><strong>' + (totais["D"] ? extratocampanha.mask(totais["D"].valor.toFixed(2)) : "0,00") + '</strong></td><td class="fs-txt-right"><strong>' + (totais["C"] ? extratocampanha.mask(totais["C"].valor.toFixed(2)) : "0,00") + '</strong></td></tr>';
		
		$('#table-eventos > tbody').html(html);
		
		if (extratocampanha.mobile) {
			$(".no-mobile").hide();
		}
		extratocampanha.getnotafiscal();
		
		
	},
	
	getnotafiscal: function(el, ev) {

		$('#table-meses > tbody').html("");
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var c1 = DatasetFactory.createConstraint("pessoa", extratocampanha.current, extratocampanha.current, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("ano", ano, ano, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("mes", mes, mes, ConstraintType.MUST, false);

		console.log(extratocampanha.current, ano, mes)
		
		DatasetFactory.getDataset("ds_nota_fiscal", null, [c1, c2, c3], null, {"success": extratocampanha.onreadygetnotafiscal} );
		
		
	},
	
	onreadygetnotafiscal: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			extratocampanha.loading.hide();
			html = "<tr><td colspan=2 class='fs-txt-center'>Sem pedidos para o periodo solicitado</td></tr>";
			$('#table-meses > tbody').html(html);
			return;
		}
		var html = "";
		var values = rows["values"];
		if (values[0].valor == "erro") {
			extratocampanha.loading.hide();
			html = "<tr><td colspan=2 class='fs-txt-center'>" + values[0].datapedido + "</td></tr>";
			$('#table-meses > tbody').html(html);
			return;
		}
		
		var total = 0;
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			if (row["datapedido"]) {
				var ano = row["datapedido"].substr(0,4);
				var mes = row["datapedido"].substr(4,2);
				var pedido = new Date();
				if (ano && mes && ano != "" & mes != "") {
					pedido = new Date(+(ano), +(mes) - 1, 1);
				}
				var m = moment(pedido);
				var v = parseFloat(row["valor"].replace(/,/g, '').replace(",", "."));
				total += v; 
				html += '<tr><td>' + m.format("MMMM/YYYY") + '</td><td class="fs-txt-right">' + extratocampanha.mask(v.toFixed(2)) + '</td></tr>';
			}
		}		
		$('#table-meses > tbody').html(html);
		
		html = '<tr><td class="fs-txt-right"><strong>${i18n.getTranslation("total")}</strong></td><td class="fs-txt-right"><strong>' + extratocampanha.mask(total.toFixed(2)) + '</strong></td></tr>';
		$('#table-meses > tfoot').html(html);
		extratocampanha.loading.hide();
		
	},
	
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
	showdetalhado: function(el, ev) {
		$(".detalhado").show();
		$(".resumido").hide();
	},
	
	showresumido: function(el, ev) {
		$(".detalhado").hide();
		$(".resumido").show();
	}
	
});

