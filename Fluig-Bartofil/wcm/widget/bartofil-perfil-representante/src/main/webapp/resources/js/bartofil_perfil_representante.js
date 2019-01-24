const SituacaoEnum = {
    FATURAMENTO: 'F',
    CANCELADO: 'C',
    ANALISE: 'A',
    DIGITACAO: 'D',
    LIBERADO: 'L',
    ROTEIRIZACAO: 'R',
    SEPARACAO: 'S',
    TRANSITO: 'W',
    properties: {
        'F': {name: "Faturamento", code: "F"},
        'C': {name: "Cancelado", code: "C"},
        'A': {name: "Em analise", code: "A"},
        'D': {name: "Digitação", code: "D"},
        'L': {name: "Liberado", code: "L"},
        'R': {name: "Roteirização", code: "R"},
        'S': {name: "Em separação", code: "S"},
        'W': {name: "Em transito", code: "W"},
      }
}

Object.freeze(SituacaoEnum);

var perfilrepresentante = SuperWidget.extend({
	loading: FLUIGC.loading(window),
	list: [],
	instanceId: null,
	representante: null,
	grouprca: null,
	code: "bartofil_perfil_representante",
	context: "/bartofil_perfil_representante",
	current: null,
	valortotalpedidos: 0,
	listSkus: [],
	listCfas: [],
	listDecendio: {},
	
	init : function() {
		if (this.isEditMode == false) {
			perfilrepresentante.loading.show();
			perfilrepresentante.grouprca = this.grouprca;
			perfilrepresentante.representante = WCMAPI.userLogin;
			
			google.charts.load('current', {'packages':['corechart']});
			google.charts.load('current', {'packages':['gauge']});
			
			if (this.isrca() == false) {
				this.showrepresentative();
			} else {
				this.setupperiodo();
				this.getfoto();
			}
			
			$(".widget-parceiros").hide();
			$(".widget-extrato").hide();
			$(".widget-pedidos").hide();
			$(".widget-campanha").hide();
			$(".widget-parceiros-anual").hide();
			$(".wcm-header").hide();
		}
	},

	bindings : {
		local : {},
		global : {
			'save-preferences': ['click_savePreferences'],
			"click-widget": ['click_widget'],
			'change-periodo': ['change_changePeriodo'],
			'change-representante': ['change_changeRepresentante'],
			'click-decendio':['click_clickDecendio'],
			'btn-close-decendio':['click_closeDecendio'],
			'click-cfa': ['click_showExtratoDetalhe'],
			'btn-por-cfa': ['click_showCfa'],
			'btn-show-skus': ['click_showSkus'],
		}
	},
	widget: function(el, ev) {
		if ($(el).data("widget") == "universidade") {
			window.open("https://app.nutror.com/login", "_blank");
		} else {
			$(".btn-info").removeClass("active");
			$(el).addClass("active");
			
			$(".widget-home").hide();
			$(".widget-extrato").hide();
			$(".widget-pedidos").hide();
			$(".widget-campanha").hide();
			$(".widget-parceiros").hide();
			$(".widget-parceiros-anual").hide();

			$("."+$(el).data("widget")).show();
		}
	},
	
	showCfa: function(el, ev) {
		perfilrepresentante.getCfas();
	},
	
	setupperiodo: function() {
		
		var locale = WCMAPI.locale;
		locale = locale.replace("_", "-"); 
		
		var m = moment().locale(locale);
		var list = []; 
		for (var i=0; i<6; i++) {
			var o = { "mes": m.format("MM"), "ano": m.format("YYYY"), "periodo": m.format("MMMM") + "/" + m.format("YYYY"), "class": (i<2 ? "" : "widget-extrato") };
			list.push(o);
			m.subtract(1, 'months');
		}

		var tpl = $('.tpl-continuous-scroll-periodo').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		$('#periodo').append(html);
		
		$(".widget-extrato").hide();
		
	},
	
	changeRepresentante: function () {
		perfilrepresentante.loading.show();
		perfilrepresentante.representante = $('#listrepresentatives').val();
		perfilrepresentante.list = [];
		perfilrepresentante.listSkus = [];
		$(".tab-detalhamento").html("");
		perfilrepresentante.current = null;
		perfilrepresentante.getfoto();
		
	},
	
	getfoto: function() {
		var c1 = DatasetFactory.createConstraint("representante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		DatasetFactory.getDataset("ds_representante", null, [c1], null, {"success": perfilrepresentante.onreadygetfoto} );
	},
	
	onreadygetfoto: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			return;
		}
		
		var values = rows["values"];
		if (values[0].apelido == "erro" || values[0].apelido == "undefined") {
			perfilrepresentante.loading.hide();
			return;
		}
		
		var row = values[0];

		var tpl = $('.tpl-avatar').html();
		var data = { "userCode": perfilrepresentante.representante, "image": row["foto"] };
		var html = Mustache.render(tpl, data);
		$('.user-avatar').html(html);
		
		var dataadmissao = moment(row["dataadmissao"]);

		$(".contato").html(row["apelido"]);
		$(".data-admissao").html(dataadmissao.format("DD/MM/YYYY"));
		$(".nome").html(row["nomerazao"]);
		$(".grupo-parceiro").html(row["grupoparceiro100"]);
		$(".codigo").html(row["codrepresentante"]);
		$(".venda-media-trimestre").html("R$ " + perfilrepresentante.mask(parseFloat(row["valormensal3"]).toFixed(2)));
		$(".venda-media-semestre").html("R$ " + perfilrepresentante.mask(parseFloat(row["valormensal6"]).toFixed(2)));
		$(".venda-media-ano").html("R$ " + perfilrepresentante.mask(parseFloat(row["valormensal12"]).toFixed(2)));
		$(".municipio").html(row["endercidade"]);
		$(".uf").html(row["enderuf"]);
		$(".equipe").html(row["descequipe"]);
		
		google.charts.setOnLoadCallback(perfilrepresentante.getSituacaoConsolidado);		
		
	},
	
	getSituacaoConsolidado: function() {
		perfilrepresentante.loading.show();

		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('DD-MM-YYYY');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('DD-MM-YYYY');
		
		var c1 = DatasetFactory.createConstraint("data-inicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("data-fim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("representante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_situacao_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetSituacaoConsolidado});
		
	},

	onReadyGetSituacaoConsolidado: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.getMeta();
			perfilrepresentante.loading.hide();
			return;
		}
		var values = rows["values"];
		if (values[0].situacao == "erro" || values[0].situacao == "undefined") {
			WCMC.messageError('Representante não encontrado!');	    			
			perfilrepresentante.loading.hide();
			return;
		}
		
		var data = [["Situação", "Valor"]];
		perfilrepresentante.valortotalpedidos = 0;
		var comissaoFaturada = 0;
		var comissaoAFaturar = 0;
		var values = rows["values"];
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			var o = [SituacaoEnum.properties[row["situacao"]].name, parseFloat(row["valortotalgeral"])];
			if (parseFloat(row["valortotalgeral"]) > 0) {
				data.push(o);
			}
			if (row["situacao"] == "F") {
				comissaoFaturada += parseFloat(row["valortotalcomissaogeral"]);
			} else if (row["situacao"] == "C") {
				comissaoFaturada -= parseFloat(row["valortotalcomissaogeral"]);
			} else {
				comissaoAFaturar += parseFloat(row["valortotalcomissaogeral"]);
			}
			if (row["situacao"] == "C") {
				perfilrepresentante.valortotalpedidos -= parseFloat(row["valortotalgeral"]);
			} else {
				perfilrepresentante.valortotalpedidos += parseFloat(row["valortotalgeral"]);
			}
		}
		
		$("#comissaoVendaFaturada").val("R$ " + perfilrepresentante.mask(comissaoFaturada.toFixed(2)));
		$("#comissaoVendaAFatura").val("R$ " + perfilrepresentante.mask(comissaoAFaturar.toFixed(2)));
		$("#totalComissao").val("R$ " + perfilrepresentante.mask((comissaoFaturada + comissaoAFaturar).toFixed(2)));
		
		var options = {
			pieSliceText: 'value',
			width: '300px',
			height: '300px',
			sliceVisibilityThreshold: 0
        };
		var chart = new google.visualization.PieChart(document.getElementById('chartPie'));
	    chart.draw(google.visualization.arrayToDataTable(data), options);		
	    
	    perfilrepresentante.getMeta();

	},
	
	getMeta: function() {
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('DD-MM-YYYY');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('DD-MM-YYYY');
		
		var c1 = DatasetFactory.createConstraint("data-inicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("data-fim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("representante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_meta_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetMeta});
	},
	
	onReadyGetMeta: function(rows) {

		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.getDecendio();
			return;
		}
		
		
		var value = rows["values"];
		if (value.length > 0) {
			var meta = 0;
			var dias = 0;
			for (var i=0; i<value.length; i++) {
				if (parseFloat(value[i].metavlrvenda) > 0) {
					meta = parseFloat(value[i].metavlrvenda);
					dias = parseFloat(value[i].diasuteisrestantes);
				}
			}
			if (meta > 0) {
				var percentual = (perfilrepresentante.valortotalpedidos / meta) * 100;
				var faltante = meta - perfilrepresentante.valortotalpedidos;
				if (faltante < 0) faltante = 0;
				var valordia = faltante / dias 
				
				var options = {
					width: 400, height: 220,
		          	redFrom: 0, redTo: 100,
		          	yellowFrom: 100, yellowTo: 130,
		          	greenFrom: 130, greenTo: 300,
		          	minorTicks: 10,
		          	max: 300
		        };
				
				var data = google.visualization.arrayToDataTable([
					['Label', 'Value'],
			        ['Potencial', parseFloat(percentual.toFixed(2))]
			    ]);
				
				var chart = new google.visualization.Gauge(document.getElementById('chartGauge'));
		        chart.draw(data, options);
		        
		        if (meta < 0) { faltante = 0; }

		        $(".valor-potencial").html("R$ " + perfilrepresentante.mask(meta.toFixed(2)));
		        $(".valor-vendido").html("R$ " + perfilrepresentante.mask(perfilrepresentante.valortotalpedidos.toFixed(2)));
		        $(".percentual-potencial").html(perfilrepresentante.mask(percentual.toFixed(2)) + "%");
		        $(".valor-faltante").html("R$ " + perfilrepresentante.mask(faltante.toFixed(2)));
		        $(".valor-dia").html("R$ " + perfilrepresentante.mask(valordia.toFixed(2)));
			} else {
		        $(".valor-potencial").html("");
		        $(".valor-vendido").html("");
		        $(".percentual-potencial").html("");
		        $(".valor-faltante").html("");
		        $(".valor-dia").html("");
			}
	        
		} else {
	        $(".valor-potencial").html("");
	        $(".valor-vendido").html("");
	        $(".percentual-potencial").html("");
	        $(".valor-faltante").html("");
	        $(".valor-dia").html("");
		}
		
		perfilrepresentante.getDecendio();
	},
	
	getDecendio: function() {
		
		$(".decendio-1").html("00");
		$(".decendio-2").html("00");
		$(".decendio-3").html("00");
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('DD-MM-YYYY');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('DD-MM-YYYY');
		
		var c1 = DatasetFactory.createConstraint("data-inicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("data-fim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("representante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_decendio_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetDecendio});
	},
	
	onReadyGetDecendio: function(rows) {

		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			return;
		}
		
		var values = rows["values"];
		var itens = 0;
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			$(".decendio-" + row["decendio"]).html(row["quantidadeclientes"])
			itens += parseInt(row)
		}		
		
		perfilrepresentante.getEvolucao();
		
	},
	
	getEvolucao: function() {
		
		$('.table-evolucao > tbody').html("");
		
		var c1 = DatasetFactory.createConstraint("codRepresentante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_evolucao_consolidada', null, [c1], null, {"success": perfilrepresentante.onReadyGetEvolucao});
	},
	
	onReadyGetEvolucao: function(rows) {

		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			return;
		}
		

		var values = rows["values"];
		var t = { 
			"mes": "Semestre",
			"valorFaturado": 0,
			"comissaoRecebida": 0,
			"premiosRecebidos": 0,
			"valorTotal": 0
		};
		
		var list = [];
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			
			var m = moment(row["anomes"].substring(4, 6) + "/01/" + row["anomes"].substring(0, 4));
			var valorpremio = (row["valorpremio"] == null || row["valorpremio"] == "" ? 0 : parseFloat(row["valorpremio"]));
			var valorcomissao = (row["valortotalcomissao"] == null || row["valortotalcomissao"] == "" ? 0 : parseFloat(row["valortotalcomissao"]));
			var valortotal = (row["valortotalatendido"] == null || row["valortotalatendido"] == "" ? 0 : parseFloat(row["valortotalatendido"]));
			var o = {
				"mes": m.format("MMM/YYYY"),
				"anomes": row["anomes"],
				"valorFaturado": perfilrepresentante.mask(valortotal.toFixed(2)),
				"comissaoRecebida": perfilrepresentante.mask(valorcomissao.toFixed(2)),
				"premiosRecebidos": perfilrepresentante.mask(valorpremio.toFixed(2)),
				"valorTotal": (valorcomissao + valorpremio).toFixed(2),
				"percentual": (((valorcomissao + valorpremio) / valortotal) * 100).toFixed(2),
				"css": ""
			}
			t["valorFaturado"] += valortotal;
			t["comissaoRecebida"] += valorcomissao;
			t["premiosRecebidos"] += valorpremio;
			t["valorTotal"] += valorcomissao + valorpremio;
			
			list.push(o)
		}
		
		list.sort(function (a,b) {
			if (a.anomes < b.anomes) return -1;
			if (a.anomes > b.anomes) return 1;
		    return 0;			
		}); 
		
		t["percentual"] = perfilrepresentante.mask(((t["valorTotal"] / t["valorFaturado"]) * 100).toFixed(2));
		t["css"] = "info";
		t["valorFaturado"] = perfilrepresentante.mask(t["valorFaturado"].toFixed(2));
		t["comissaoRecebida"] = perfilrepresentante.mask(t["comissaoRecebida"].toFixed(2));
		t["premiosRecebidos"] = perfilrepresentante.mask(t["premiosRecebidos"].toFixed(2));
		t["valorTotal"] = perfilrepresentante.mask(t["valorTotal"].toFixed(2));
		list.push(t);
		
		var tpl = $('.tpl-evolucao').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		$('.table-evolucao > tbody').append(html);
		
		perfilrepresentante.getSkus();
		
		
	},
	getSkus: function() {
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('YYYY-MM-DD');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('YYYY-MM-DD');
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("codRepresentante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_skus_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetSkus});
		
	},
	onReadyGetSkus: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			return;
		}

		var values = rows["values"];
		$(".qtdeItensSkus").html(values.length);
		perfilrepresentante.listSkus = values;
		
		perfilrepresentante.loading.hide();
		
	},
	getCfas: function() {
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('YYYY-MM-DD');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('YYYY-MM-DD');
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("codRepresentante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_pedido_cfa', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetCfas});
		
	},
	onReadyGetCfas: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			return;
		}

		var values = rows["values"];
		var cfa = {};
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			var valortotalcomissao = parseFloat(row["valortotalcomissao"]);
			var valortotal = parseFloat(row["valortotal"]);
			
			if (cfa[row["cfa"]] == undefined) {
				cfa[row["cfa"]] = {};
				cfa[row["cfa"]].valortotal = 0;
				cfa[row["cfa"]].valortotalcomissao = 0;
			}
			
			cfa[row["cfa"]] = {
				"valortotal": cfa[row["cfa"]].valortotal + valortotal,
				"valortotalcomissao": cfa[row["cfa"]].valortotalcomissao + valortotalcomissao
			}
			
		}
		
		var list = [];
		for (var key in cfa) {
			var row = cfa[key];
			var o = {
				"cfa": key,
				"valorFaturado": perfilrepresentante.mask(row["valortotal"].toFixed(2)),
				"comissaoRecebida": perfilrepresentante.mask(row["valortotalcomissao"].toFixed(2)),
				"valorpercentual": (row["valortotalcomissao"] / row["valortotal"]) * 100,
				"percentual": perfilrepresentante.mask(((row["valortotalcomissao"] / row["valortotal"]) * 100).toFixed(2)),
			}
			list.push(o);
			
		}
		
		list.sort(function (a,b) {
			if (a.valorpercentual < b.valorpercentual) return 1;
			if (a.valorpercentual > b.valorpercentual) return -1;
		    return 0;			
		}); 
		
		perfilrepresentante.listCfas = values;

		var tpl = $('.tpl-extrato-comissao').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		
		$(".modal").remove();
		FLUIGC.modal({
		    title:  "Extrato de Comissao Detalhado",
		    content: html,
		    id: 'fluig-modal',
		    size: 'large',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
			console.log(err, data)
		});
		
	},
	savePreferences: function(el, ev) {
		var args = {
			"grouprca": $('input[id="grouprca"]', this.DOM).val()
		};
		
		WCMSpaceAPI.PageService.UPDATEPREFERENCES({
		    async: true,
		    success: function (data) {
				WCMC.messageInfo('Preferencias salvas com sucesso!');	    			
		    },
		    fail: function (xhr, message, errorData) {
		    	console.log("UPDATEPREFERENCES fail", xhr, message, errorData);
		    }
		}, this.instanceId, args );
	},	
	
	changePeriodo: function(el ,ev) {
		perfilrepresentante.loading.show();
		perfilrepresentante.list = [];
		perfilrepresentante.getSituacaoConsolidado();		
	},
	
	isrca: function() {
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", this.grouprca, this.grouprca, ConstraintType.MUST, false);

		var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1, c2], null);
		if (dataset && dataset.values && dataset.values.length > 0) { return true; }
		
		return false;
	},
	
	showGraph: function() {
	
		var data = [{
		        value: perfilrepresentante.pedidos.total("F"),
		        label: SituacaoEnum.properties["F"].name
		    }, {
		        value: 18000,
		        label: "Cancelado"
		    }, {
		        value: 45000,
		        label: "Em analise"
		    }, {
		        value: 38000,
		        label: "Liberado"
		    }, {
		        value: 25000,
		        label: "Em separação"
		    }];

		var options = { 
//		    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
			"segmentShowStroke": true,
			"showTooltips": true
		}
		
		var chart = FLUIGC.chart('#chartPie', {
		    id: 'idChartPie',
		    width: '700',
		    height: '400'
		});
		var pieChart = chart.pie(data, options);
		$(".legend-chart-pie").html(pieChart.generateLegend());

		var chart = FLUIGC.chart('#chartGauge', {
		    id: 'idChartGauge',
		    width: '500',
		    height: '200'
		});
		var chartGauge = chart.gauge({
	        lines: 12,
	        angle: 0.15,
	        lineWidth: 0.44,
	        pointer: {
	            length: 0.9,
	            strokeWidth: 0.035,
	            color: '#000000'
	        },
	        limitMax: 'false',
	        colorStart: '#6FADCF',
	        colorStop: '#8FC0DA',
	        strokeColor: '#E0E0E0',
			"showTooltips": true,
	        generateGradient: true
	    });		
		chartGauge.maxValue = 3000;
		chartGauge.set(925);
		chartGauge.value = 925;
		$(".legend-chart-pie").html(pieChart.generateLegend());
		
		perfilrepresentante.showEvolucao();
		
	},
	
	showEvolucao: function() {
		
		$('.table-evolucao > tbody').html("");
		
		var list = [
			{ "mes": "abr/18", "valorFaturado": "183.212,15", "comissaoRecebida": "8.244,55", "premiosRecebidos": "7.280,00", "valorTotal": "15.524,55", "percentual": "8,5%", "css": ""  },
			{ "mes": "mai/18", "valorFaturado": "232.488,03", "comissaoRecebida": "10.461,96", "premiosRecebidos": "1.115,00", "valorTotal": "15.576,96", "percentual": "5,0%", "css": ""  },
			{ "mes": "jun/18", "valorFaturado": "240.999,70", "comissaoRecebida": "10.844,99", "premiosRecebidos": "800,00", "valorTotal": "15.644,99", "percentual": "4,8%", "css": ""  },
			{ "mes": "jul/18", "valorFaturado": "198.333,80", "comissaoRecebida": "8.925,02", "premiosRecebidos": "800,00", "valorTotal": "9.725,02", "percentual": "4,9%"  },
			{ "mes": "ago/18", "valorFaturado": "260.213,65", "comissaoRecebida": "11.709,61", "premiosRecebidos": "6.350,00", "valorTotal": "18.059,61", "percentual": "6,9%", "css": ""  },
			{ "mes": "set/18", "valorFaturado": "218.885,50", "comissaoRecebida": "9.849,80", "premiosRecebidos": "2.140,00", "valorTotal": "11.989,80", "percentual": "5,5%", "css": ""  },
			{ "mes": "Semestre", "valorFaturado": "1.334.131,83", "comissaoRecebida": "60.035,93", "premiosRecebidos": "18.845,00", "valorTotal": "78.520,93", "percentual": "5,9%", "css": "info"  }
		];
		var tpl = $('.tpl-evolucao').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		$('.table-evolucao > tbody').append(html);
		
		perfilrepresentante.showExtratoDetalhado();
		
	},
	
	showExtratoDetalhado: function() {
		
		$('.table-extrato-comissao > tbody').html("");
		
		var list = [
			{ "cfa": "4", "valorFaturado": "89.007,90", "comissaoRecebida": "7.565,67", "percentual": "8,5%"  },
			{ "cfa": "6", "valorFaturado": "13.560,20", "comissaoRecebida": "922,09", "percentual": "6,8%" },
			{ "cfa": "1", "valorFaturado": "25.866,12", "comissaoRecebida": "1.681,30", "percentual": "6,5%" },
			{ "cfa": "2", "valorFaturado": "7.504,70", "comissaoRecebida": "462,79", "percentual": "6,2%"  },
			{ "cfa": "8", "valorFaturado": "3.260,30", "comissaoRecebida": "179,32", "percentual": "5,5%" },
			{ "cfa": "9", "valorFaturado": "8.333,20", "comissaoRecebida": "441,66", "percentual": "5,3%"  },
			{ "cfa": "3", "valorFaturado": "519,60", "comissaoRecebida": "24,94", "percentual": "4,8%" }
		];
		var tpl = $('.tpl-extrato-comissao').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		$('.table-extrato-comissao > tbody').append(html);
	},
	
	showExtratoDetalhe: function (el, ev) {
		
		perfilrepresentante.loading.show();
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('YYYY-MM-DD');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('YYYY-MM-DD');
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("codRepresentante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("cfa", $(el).data("id"), $(el).data("id"), ConstraintType.MUST, false);
		
		DatasetFactory.getDataset('ds_pedido_cfa', null, [c1, c2, c3, c4], null, {"success": perfilrepresentante.onReadyGetCfasDetail});
		
	},
	onReadyGetCfasDetail: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			return;
		}

		var values = rows["values"];
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			
			var valortotalcomissao = parseFloat(row["valortotalcomissao"]);
			var valortotal = parseFloat(row["valortotal"]);
			var o = {
				"produto": row["codproduto"] + " - " + row["descproduto"],
				"valorFaturado": perfilrepresentante.mask(valortotal.toFixed(2)),
				"comissaoRecebida": perfilrepresentante.mask(valortotalcomissao.toFixed(2)),
				"comissaoMedia": perfilrepresentante.mask(((valortotalcomissao / valortotal) * 100).toFixed(2))
			}
			list.push(o);
			
		}
		
		var params = { "values": list };
		
		WCMAPI.convertFtlAsync(perfilrepresentante.code, 'detalhe.ftl', { "params": params },
			function (data) {
				$(el).after("<tr><td colspan='4'>" + data + "</td></tr>");
				perfilrepresentante.loading.hide();
			}, function(err) { }
		);		
		
	},
	
	showSkus: function (el, ev) {
		perfilrepresentante.loading.show();
		
		var data = [];
		for (var i=0; i<perfilrepresentante.listSkus.length; i++) {
			var row = perfilrepresentante.listSkus[i];
			data.push({"produto": row["descproduto"], "valorFaturado": perfilrepresentante.mask(parseFloat(row["valortotal"]).toFixed(2))})
		}
		
		data.sort(function (a,b) {
			if (a.produto < b.produto) return 1;
			if (a.produto > b.produto) return -1;
		    return 0;			
		});
		
		var params = {
			"values": data
		};
		
		$(".modal").remove();
		WCMAPI.convertFtlAsync(perfilrepresentante.code, 'skus.ftl', { "params": params },
				function (data) {
				   FLUIGC.modal({
					    title: 'Quantidade de Itens (SKUs) dos Parceiros',
					    content: data,
					    id: 'fluig-modal',
					    size: 'large',
					    actions: [{
					        'label': 'Fechar',
					        'autoClose': true
					    }]
					}, function(err, data) {
						console.log(err, data)
					});
				   perfilrepresentante.loading.hide();
			   },
			   function(err) { }
		  );		
		
	},
	
	clickDecendio: function(el, ev) {
		
		var list = [];
		var decendio = perfilrepresentante.listDecendio[$(el).data("id")];
		for (var key in decendio) {
			var o = decendio[key];
			list.push({ "cliente": key, "valor":  o })
		}
		
		list.sort(function (a,b) {
			if (parseFloat(a.valor) < parseFloat(b.valor)) return 1;
			if (parseFloat(a.valor) > parseFloat(b.valor)) return -1;
		    return 0;			
		}); 
		
		for (var i=0; i<list.length; i++) {
			var o = list[i];
			o["valor"] = perfilrepresentante.mask(parseFloat(o["valor"]).toFixed(2))
			list[i] = o;
		}
		
		var tpl = $('.tpl-decendio').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);

		$(".modal").remove();
		FLUIGC.modal({
		    title:  $(el).text(),
		    content: html,
		    id: 'fluig-modal',
		    size: 'large',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
			console.log(err, data)
		});
		
				  
	},
	
	showrepresentative: function() {
		var c1 = DatasetFactory.createConstraint("grupo", this.grouprca, this.grouprca, ConstraintType.MUST, false);

		var dataset = DatasetFactory.getDataset("ds_lista_usuarios_grupo", null, [c1], null);
		if (dataset && dataset.values && dataset.values.length > 0) {
			var list = [{ "id": WCMAPI.userLogin, "name": WCMAPI.userLogin + " - " + WCMAPI.user }];
			var values = dataset["values"];
			for (var i=0; i<values.length; i++) {
				var row = values[i];
				if (WCMAPI.userCode != row["login"]) {
					var o = { "id": row["login"], "name": row["login"] + " - " + row["colleagueName"] }
					list.push(o);
				}
			}

			var tpl = $('.tpl-representante').html();
			var data = { "items": list};
			var html = Mustache.render(tpl, data);
			$('#listrepresentatives').append(html);
			
			$('#listrepresentatives').select2({
			    placeholder: "Selecione",
			    allowClear: false,
			    width: '300px'
			})
			
			$(".nav-representative").removeClass("fs-display-none");
			
			perfilrepresentante.setupperiodo();
			perfilrepresentante.getfoto();
		} else {
			perfilrepresentante.setupperiodo();
			perfilrepresentante.getfoto();
		}
		
	},
	
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
	populateCustomers: function(list) {
		var decendio = {
			"1": {},
			"2": {},
			"3": {}
		}
		
		for (var i=0; i<list.length; i++) {
			var row = list[i];
			var valortotalpedido = parseFloat(row["valortotalpedido"].replace(/,/g, '').replace(",", "."));
			var m = moment(row["datainclusao"]);

			var index = "0";
			if (m.date() < 11) {
				index = "1";
			} else if (m.date() < 21) {
				index = "2";
			} else {
				index = "3";
			}
			
			if (decendio[index][row["nomecliente"]]) {
				decendio[index][row["nomecliente"]] += valortotalpedido;
			} else {
				decendio[index][row["nomecliente"]] = valortotalpedido;
			}
		}
		
		perfilrepresentante.listDecendio = decendio; 
	}
	
});
