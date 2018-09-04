var campanhavendas = SuperWidget.extend({
	
	loading: FLUIGC.loading(window),

	init : function() {
		$(".pageTitle").parent().remove();
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado": ['click_showdetalhado'],
			"click-resumido": ['click_showresumido'],
			"change-periodo": ['change_getcomissoes'],
		}
	},
	
	setupperiodo: function() {
	
		var m = moment().locale("pt-br");
		var list = []; 
		for (var i=0; i<20; i++) {
			var o = { "mes": m.format("MM"), "ano": m.format("YYYY"), "periodo": m.format("MM") + "/" + m.format("YYYY") };
			list.push(o);
			m.subtract(1, 'months');
		}

		var tpl = $('.tpl-continuous-scroll-periodo').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		$('#periodo').append(html);
		
		this.getcomissoes();
		
	},
	
	getcomissoes: function(el, ev) {

		this.loading.show();

		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var c1 = DatasetFactory.createConstraint("representante", WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("ano", ano, ano, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("mes", mes, mes, ConstraintType.MUST, false);

		console.log(WCMAPI.userCode, ano, mes)
		
		var rows = DatasetFactory.getDataset("ds_comissoes", null, [c1, c2, c3], null);
		
		if (!rows) {
			this.loading.hide();
			WCMC.messageError('${i18n.getTranslation("representante.nao.comissoes")}');	    			
			return;
		}
		var values = rows["values"];
		if (!values) {
			this.loading.hide();
			WCMC.messageError('${i18n.getTranslation("representante.nao.comissoes")}');	    			
			return;
		}
		
		if (values.length == 0) {
			this.loading.hide();
			WCMC.messageError('${i18n.getTranslation("representante.nao.comissoes")}');	    			
			return;
		} 
		
		if (values[0].descevento == "erro") {
			this.loading.hide();
			WCMC.messageError(values[0].situacao);	    			
			return;
		}
		
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
			var dl = moment(row["datalancamento"]).format("DD/MM/YYYY");
			var dp = moment(row["datapagamento"]).format("MMMM/YYYY");
			html += "<tr class='" + (row["debcredito"] == "D" ? 'danger' : 'success') + "'><td>" + dl + "</td><td>" + row["codevento"] + "</td><td>" + row["nrocarga"] + "</td><td>" + row["nrodocumento"] + "</td><td>" + row["anomes"] + "</td><td class='fs-txt-center'>" + row["nroparcela"] + "</td><td>" + row["historico"] + "</td><td class='fs-txt-right'>" + row["valor"] + "</td><td class='fs-txt-center'>" + row["debcredito"] + "</td></tr>";
		
			var v = parseFloat(row["valor"].replace(/,/g, '').replace(",", "."));
			if (!totais[row["debcredito"]]) {
				totais[row["debcredito"]] = { "qtde": 1, "valor": v };
			} else {
				totais[row["debcredito"]].qtde += 1;
				totais[row["debcredito"]].valor += v;
			}
			
			if (!eventos[row["codevento"]]) {
				eventos[row["codevento"]] = { "descricao": row["descevento"], "debitos": (row["debcredito"] == "D" ? v : 0), "creditos": (row["debcredito"] == "D" ? v : 0)};
			} else {
				eventos[row["codevento"]].debitos += (row["debcredito"] == "D" ? v : 0);
				eventos[row["codevento"]].creditos += (row["debcredito"] == "C" ? v : 0);
			}
			if (!meses[dp]) {
				meses[dp] = { "valor": v };
			} else {
				meses[dp].valor += v;
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
		
		html += '<tr class="warning"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("totais")}</strong></td><td class="fs-txt-center"><strong>${i18n.getTranslation("valor")}</strong></td><td class="fs-txt-center"><strong>${i18n.getTranslation("qtd")}</strong></td></tr>' +
			'<tr class="danger"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("debitos")}</strong></td><td class="fs-txt-right">' + (totais["D"] ? this.mask(totais["D"].valor.toFixed(2)) : "0,00") + '</td><td class="fs-txt-center">' + (totais["D"] ? totais["D"].qtde : "0") + '</td></tr>' +
			'<tr class="success"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("creditos")}</strong></td><td class="fs-txt-right">' + (totais["C"] ? this.mask(totais["C"].valor.toFixed(2)) : "0,00") + '</td><td class="fs-txt-center">' + (totais["C"] ? totais["C"].qtde : "0") + '</td></tr>' + 
			'<tr class="warning"><td class="fs-txt-right" colspan="7"><strong>${i18n.getTranslation("total.geral")}</strong></td><td class="fs-txt-right">' + this.mask(total.toFixed(2)) + '</td><td class="fs-txt-center">' + qtde + '</td></tr>';
		 
		$('#table-lancamentos > tbody').html(html);
		
		html = "";
		for (var key in eventos) {
			var ev = eventos[key];
			html += '<tr><td>' + key + '</td><td>' + ev["descricao"] + '</td><td class="fs-txt-right">' + this.mask(ev["debitos"].toFixed(2)) + '</td><td class="fs-txt-right">' + this.mask(ev["creditos"].toFixed(2)) + '</td></tr>'; 
		}
		
		html += '<tr class="warning"><td></td><td class="fs-txt-right">TOTAL:</td><td class="fs-txt-right">' + (totais["D"] ? this.mask(totais["D"].valor.toFixed(2)) : "0,00") + '</td><td class="fs-txt-right">' + (totais["C"] ? this.mask(totais["C"].valor.toFixed(2)) : "0,00") + '</td></tr>';
		
		$('#table-eventos > tbody').html(html);
		
		html = "";
		for (var key in meses) {
			var ev = meses[key];
			html += '<tr><td>' + key + '</td><td class="fs-txt-right">' + this.mask(ev["valor"].toFixed(2)) + '</td></tr>'; 
		}
		
		$('#table-meses > tbody').html(html);
		
		console.log(html);
		
		this.loading.hide();

		
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
	},
	

});
