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
	offset: 0,
	limit: 30,
	list: [],
	instanceId: null,
	representante: null,
	grouprca: null,
	code: "bartofil_perfil_representante",
	context: "/bartofil_perfil_representante",
	current: null,
	mydivision: "1",
	trimestre: null,
	equipesuperior: null,
	valortotalpedidos: 0,
	listSkus: [],
	listCfas: [],
	
	init : function() {
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
			'btn-por-cfa': ['click_showSkus'],
		}
	},
	widget: function(el, ev) {
		$(".btn-info").removeClass("active");
		$(el).addClass("active");
		
		$(".widget-home").hide();
		$(".widget-extrato").hide();
		$(".widget-pedidos").hide();
		$(".widget-campanha").hide();
		$(".widget-parceiros").hide();
		$(".widget-parceiros-anual").hide();
		
		$("."+$(el).data("widget")).show();
	},
	
	setupperiodo: function() {
		
		var locale = WCMAPI.locale;
		locale = locale.replace("_", "-"); 
		
		var m = moment().locale(locale);
		var list = []; 
		for (var i=0; i<2; i++) {
			var o = { "mes": m.format("MM"), "ano": m.format("YYYY"), "periodo": m.format("MMMM") + "/" + m.format("YYYY") };
			list.push(o);
			m.subtract(1, 'months');
		}
		console.log(list);

		var tpl = $('.tpl-continuous-scroll-periodo').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		console.log(list, html)
		$('#periodo').append(html);
		
		
	},
	
	changeRepresentante: function () {
		perfilrepresentante.loading.show();
		perfilrepresentante.representante = $('#listrepresentatives').val();
		perfilrepresentante.list = [];
		perfilrepresentante.listSkus = [];
		perfilrepresentante.offset = 0;
		$(".tab-detalhamento").html("");
		perfilrepresentante.current = null;
		perfilrepresentante.limit = parseInt($("#paginacao").val());
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
		
		console.log("dataset", c1, c2, c3, perfilrepresentante.onReadyGetPedidos)
	      
		DatasetFactory.getDataset('ds_situacao_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetSituacaoConsolidado});
		
	},

	onReadyGetSituacaoConsolidado: function(rows) {
		console.log("onReadyGetPedidos perfil", rows)
		
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.getMeta();
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
			data.push(o);
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
			height: '300px'
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
		
		console.log("dataset", c1, c2, c3, perfilrepresentante.onReadyGetMeta)
	      
		DatasetFactory.getDataset('ds_meta_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetMeta});
	},
	
	onReadyGetMeta: function(rows) {

		console.log("onReadyGetPedidos perfil", rows)
		
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
			        ['Meta', parseFloat(percentual.toFixed(2))]
			    ]);
				
				var chart = new google.visualization.Gauge(document.getElementById('chartGauge'));
		        chart.draw(data, options);

		        $(".valor-potencial").html(perfilrepresentante.mask(meta.toFixed(2)));
		        $(".valor-vendido").html(perfilrepresentante.mask(perfilrepresentante.valortotalpedidos.toFixed(2)));
		        $(".percentual-potencial").html(perfilrepresentante.mask(percentual.toFixed(2)) + "%");
		        $(".valor-faltante").html(perfilrepresentante.mask("R$ " + faltante.toFixed(2)));
		        $(".valor-dia").html(perfilrepresentante.mask("R$ " + valordia.toFixed(2)));
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
		
		console.log("dataset", c1, c2, c3, perfilrepresentante.onReadyGetPedidos)
	      
		DatasetFactory.getDataset('ds_decendio_consolidada', null, [c1, c2, c3], null, {"success": perfilrepresentante.onReadyGetDecendio});
	},
	
	onReadyGetDecendio: function(rows) {

		console.log("onReadyGetPedidos perfil", rows)
		
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
		
		console.log("dataset", c1)
	      
		DatasetFactory.getDataset('ds_evolucao_consolidada', null, [c1], null, {"success": perfilrepresentante.onReadyGetEvolucao});
	},
	
	onReadyGetEvolucao: function(rows) {

		console.log("onReadyGetEvolucao perfil", rows)
		
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
			var valorpremio = (row["valorpremio"] == null ? 0 : parseFloat(row["valorpremio"]));
			var valorcomissao = (row["valortotalcomissao"] == null ? 0 : parseFloat(row["valortotalcomissao"]));
			var valortotal = (row["valortotalatendido"] == null ? 0 : parseFloat(row["valortotalatendido"]));
			console.log(m);
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
		console.log(list, html)
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
		
		console.log("dataset", c1, c2, c3, perfilrepresentante.onReadyGetPedidos)
	      
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
		
		perfilrepresentante.getCfas();
		
	},
	getCfas: function() {
		
		$('.table-extrato-comissao > tbody').append("");
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('YYYY-MM-DD');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('YYYY-MM-DD');
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("codRepresentante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		
		console.log("dataset", c1, c2, c3, perfilrepresentante.onReadyGetPedidos)
	      
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
		console.log(list, html)
		$('.table-extrato-comissao > tbody').append(html);
		
		perfilrepresentante.loading.hide();
	},
	savePreferences: function(el, ev) {
		var args = {
			"grouprca": $('input[id="grouprca"]', this.DOM).val()
		};
		console.log(args);
		
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
		perfilrepresentante.trimestre = $(el).val();
		perfilrepresentante.list = [];
		perfilrepresentante.offset = 0;
		perfilrepresentante.limit = parseInt($("#paginacao").val());
		perfilrepresentante.getfullranking();		
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
		console.log(list, html)
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
		console.log(list, html)
		$('.table-extrato-comissao > tbody').append(html);
	},
	
	showExtratoDetalhe: function (el, ev) {
		perfilrepresentante.loading.show();
		
		var list = [];
		for (var i=0; i<perfilrepresentante.listCfas.length; i++) {
			var row = perfilrepresentante.listCfas[i];
			
			if (row["cfa"] == $(el).data("id")) {
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
			
		}
		
		var params = { "values": list };
		
		WCMAPI.convertFtlAsync(perfilrepresentante.code, 'detalhe.ftl', { "params": params },
				function (data) {
				   FLUIGC.modal({
					    title: 'CFA - ' + $(el).data("id"),
					    content: data,
					    id: 'fluig-modal',
					    size: 'full',
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
	
	showSkus: function (el, ev) {
		perfilrepresentante.loading.show();
		
		var data = [];
		for (var i=0; i<perfilrepresentante.listSkus.length; i++) {
			var row = perfilrepresentante.listSkus[i];
			data.push({"produto": row["descproduto"], "valorFaturado": perfilrepresentante.mask(parseFloat(row["valortotal"]).toFixed(2))})
		}
		
		var params = {
			"values": data
		};
		
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
	
	changepaginacao: function(el, ev) {
		perfilrepresentante.loading.show();
		perfilrepresentante.offset = 0;
		perfilrepresentante.limit = parseInt($(el).val());
		perfilrepresentante.showranking(true);		
	},
	
	changeordenacao: function(el, ev) {
		perfilrepresentante.loading.show();
		perfilrepresentante.offset = 0;
		perfilrepresentante.limit = parseInt($(el).val());
		perfilrepresentante.showranking(true);		
	},
	
	clickDecendio: function(el, ev) {
		var tpl = $('.tpl-decendio').html();
		var data = { "items": []};
		var html = Mustache.render(tpl, data);

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
	
	
	listcampanha: function(el, ev) {
		perfilrepresentante.loading.show();
		perfilrepresentante.representante = $('#listrepresentatives').val();
		$('.tab-detalhamento').html("");
		perfilrepresentante.list = [];
		perfilrepresentante.offset = 0;
		perfilrepresentante.limit = parseInt($("#paginacao").val());
		perfilrepresentante.getranking();
	},
	
	getranking: function() {
		var c1 = DatasetFactory.createConstraint("representante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "1", "1", ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3], null, {"success": perfilrepresentante.onreadygetranking} );
		
	},
	
	onreadygetranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			WCMC.messageError('Campanhas de Parceiros 100% não possui ranking!');	    			
			return;
		}
		
		var values = rows["values"];
		if (values[0].apelido == "erro") {
			perfilrepresentante.loading.hide();
			WCMC.messageError('Campanhas de Parceiros 100% não possui ranking!');	    			
			return;
		}
		
		var row = values[0];
		
		if (row["nrorepresentante"] == perfilrepresentante.representante) {
			perfilrepresentante.current = row;
			
			var v = "";
			try {
				v = parseFloat(row["vlrpremio"]);
				rowclass = "success";
				if (isNaN(v)) {
					v = row["vlrpremio"];
				} else if (v > 0) {
					v = perfilrepresentante.mask(v.toFixed(2));
					v = "R$ " + v;
				} else {
					v = "";
				}
			} catch (e) {
				v = row["vlrpremio"];
			}
			
			$("#codrca").val(row["nrorepresentante"]);
			$("#gerencia").val(row["gerencia"]);
			$("#totalpontos").val(row["pontos"]);
			$("#nomerca").val(row["apelido"]);
			$("#equipe").val(row["descequipe"]);
			$("#colocacao").val(row["ordem"]);
			$("#divisao").val(row["divisao"]);
			$("#premio").val(v);
			
			$(".data-proces").html(row["dataprocessamento"]);
			
			perfilrepresentante.mydivision = row["divisao"];
			perfilrepresentante.equipesuperior = row["nroequipesuperior"];
			
			perfilrepresentante.getdetalhamentos();
			perfilrepresentante.getfoto();
			perfilrepresentante.getfullranking();
			
		} else {
			$("#codrca").val("");
			$("#gerencia").val("");
			$("#totalpontos").val("");
			$("#nomerca").val("");
			$("#equipe").val("");
			$("#colocacao").val("");
			$("#divisao").val("");
			$("#premio").val("");
			perfilrepresentante.current = null;
			perfilrepresentante.mydivision = null;
			perfilrepresentante.equipesuperior = null;
			
			$('#table-ranking > tbody').html("");
			$(".tab-detalhamento").html("");
			
			var tpl = $('.tpl-avatar').html();
			var data = { "userCode": WCMAPI.userCode, "image": perfilrepresentante.context + "/resources/images/no-img.png" };
			var html = Mustache.render(tpl, data);
			$('.user-avatar').html(html);
			
			$(".data-proces").html("");
			perfilrepresentante.loading.hide();
			
		}
		
		
	},
	
	getfullranking: function() {
		
		var today = new Date();
		var periodo = today.getFullYear() + "0" + perfilrepresentante.trimestre;

		var c1 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("limit", "9999", "9999", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("divisao", perfilrepresentante.mydivision, perfilrepresentante.mydivision, ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("periodo", periodo, periodo, ConstraintType.MUST, false);
		var c5 = DatasetFactory.createConstraint("equipesuperior", perfilrepresentante.equipesuperior, perfilrepresentante.equipesuperior, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3, c4, c5], null, {"success": perfilrepresentante.onreadygetfullranking} );
		
	},
	
	onreadygetfullranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			perfilrepresentante.loading.hide();
			WCMC.messageError('Campanhas de Parceiros 100% não possui ranking geral!');	    			
			return;
		}
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			perfilrepresentante.loading.hide();
			WCMC.messageError('Campanhas de Parceiros 100% não possui ranking geral!');	    			
			return;
		}
		
		var htmlrank = "";
		for (var i = 0; i<values.length; i++) {
			var row = values[i];
			
			var premiado = "";
			var v = "";
			try {
				v = parseFloat(row["vlrpremio"]);
				rowclass = "success";
				if (isNaN(v)) {
					v = row["vlrpremio"];
				} else if (v > 0) {
					premiado = "success";
					v = perfilrepresentante.mask(v.toFixed(2));
					v = "R$ " + v;
				} else {
					v = "";
				}
			} catch (e) {
				v = row["vlrpremio"];
			}
			
			var o = {
				"codigo": row["nrorepresentante"],
				"nome": row["apelido"],
				"pontos": row["pontos"],
				"ordem": row["ordem"],
				"premio": v,
				"equipe": row["descequipe"],
				"trimestre": row["trimestre"],
				"divisao": row["divisao"],
				"premiado": premiado
				
			}
			
			perfilrepresentante.list.push(o);
		}
		
		perfilrepresentante.showranking(true);
		
	},
	
	showranking: function(clean) {
		var htmlrank = "";
		
		if (clean) {
			$('#table-ranking > tbody').html("");
			perfilrepresentante.offset = 0;
			perfilrepresentante.limit = parseInt($("#paginacao").val());
		}

		var filter = perfilrepresentante.list;
		var search = $("#busca").val(); 
		if (search && search != "") {
			filter = perfilrepresentante.list.filter(function(item) {
				return item["nome"].toLowerCase().indexOf(search) != -1 || item["codigo"].toLowerCase() == search || item["equipe"].toLowerCase().indexOf(search) != -1;
			})
		}
		
		filter.sort(function compare(a, b) {
			
			var c1 = a[$("#ordenar").val()];
			var c2 = b[$("#ordenar").val()];
			var type = $("#ordenar :selected").data("type");
			if (type == "date") {
				 if (c1.isAfter(c2)) return 1;
				 if (c1.isBefore(c2)) return -1;
			     return 0;				
			} else if (type == "integer") {
				return +(c1) - +(c2);
			} else {
				if (c1 > c2) return 1;
				if (c1 < c2) return -1;
				return 0;
			}
		});
		
		var mylist = [];
		
		for (var i = perfilrepresentante.offset; i<perfilrepresentante.limit; i++) {
			var o = filter[i];
			if (o && +(o["trimestre"]) == +($("#trimestre").val()) && o["divisao"] == perfilrepresentante.mydivision) {
				mylist.push(o);
			}
		}
		
		
		var tpl = $('.tpl-item-ranking').html();
		var data = { "items": mylist };
		var html = Mustache.render(tpl, data);
		$('#table-ranking > tbody').append(html);

		perfilrepresentante.loading.hide();
	},
	
	getdetalhamentos: function() {
		
		FLUIGC.loading(".tab-detalhamento").show();
		
		var c1 = DatasetFactory.createConstraint("representante", perfilrepresentante.representante, perfilrepresentante.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_detalhe", null, [c1, c2, c3], null, {"success": perfilrepresentante.onreadygetdetalhamentos} );
		
	},
	
	onreadygetdetalhamentos: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			FLUIGC.loading(".tab-detalhamento").hide();
			$(".tab-detalhamento").html('<p>Campanhas de Parceiros 100% não possui detalhamento!</p>');	    			
			return;
		}
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			FLUIGC.loading(".tab-detalhamento").hide();
			$(".tab-detalhamento").html('<p>Campanhas de Parceiros 100% não possui detalhamento!</p>');	    			
			return;
		}
		
		var items = {};
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			
			var o = items[row["quesito"]];
			if (o) {
				o["pontos"] += +(row["pontos"]);
				o["items"].push({ 
					"datainicio": row["datainicio"],
					"datafinal": row["datafinal"],
					"pontos": +(row["pontos"]),
					"apurado": +(row["apurado"]) 
				});
			} else {
				var id = FLUIGC.utilities.randomUUID();
				items[row["quesito"]] = {
					"id": id,
					"hashid": "#" + id,
					"quesito": row["quesito"],
					"pontos": +(row["pontos"]),
					"items": [{ 
						"datainicio": row["datainicio"],
					    "datafinal": row["datafinal"],
						"pontos": +(row["pontos"]),
						"apurado": +(row["apurado"]) 
					}]
				}
			}
		}
		
		console.log(items);
		
		for (var key in items) {
			var o = items[key];
			var tpl = $('.tpl-detalhamento').html();
			
			var classbadge = "badge-default";
			if (o["pontos"] > 0) {
				classbadge = "badge-success";
			} else if (o["pontos"] < 0) {
				classbadge = "badge-danger";
			}
			
			var data = { "items": o["items"], "quesito": o["quesito"], "id": o["id"], "hashid": o["hashid"], "total": o["pontos"], "classbadge": classbadge };
			var html = Mustache.render(tpl, data);
			$('.tab-detalhamento').append(html);
		}
		
		FLUIGC.loading(".tab-detalhamento").hide();
		
	},
	
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
});
