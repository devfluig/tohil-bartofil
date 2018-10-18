var relatorioPedidos = SuperWidget.extend({
	current: null,
	mobile: FLUIGC.utilities.checkDevice().isMobile,
	loading: FLUIGC.loading(window),
	code: "bartofil_relatorio_pedidos",
	background: ["bg-aqua", "bg-red", "bg-light-blue", "bg-green", "bg-navy", "bg-olive", "bg-orange", "bg-teal"],
	list: null,
	instanceId: null,
	grouprca: null,
	pieChart: null,
	dataTable: null,
	current: {},
	clickedPedido: null,
	listItems: null,
	listConditions: null,
	
	init : function() {
		$(".pageTitle").parent().remove();
		relatorioPedidos.loading.show();
		
		relatorioPedidos.grouprca = this.grouprca;
		
		if (this.isrca() == false) {
			this.showrepresentative();
		} else {
			var list = [{ "id": WCMAPI.userLogin, "name": WCMAPI.userLogin + " - " + WCMAPI.user }];
			var tpl = $('.tpl-representante').html();
			var data = { "items": list};
			var html = Mustache.render(tpl, data);
			$('#listrepresentatives').append(html);
			this.setupperiodo();
			this.getPedidos();
		}
	},

	bindings : {
		local : {},
		global : {
			"change-periodo": ['change_listpedidos'],
			'save-preferences': ['click_savePreferences'],
			"change-representante": ['change_listpedidos'],
			'click-item': ['click_clickItem']
		}
	},
	
	clickItem: function(el, ev) {
		relatorioPedidos.showResumo($(el).data("id"));
	},
	
	showResumo: function(type) {
		var o = relatorioPedidos["current"].totais[[type]];
		
		$(".titleResumo").html(o["situacao"]);
		$(".ul-resumo").html("");
		
		var tpl = $('.tpl-resumo').html();
		for (var key in o["cgo"]) {
			var row = o.cgo[key];
			var t = {
				"badge": "",
				"group": "",
				"total": "R$ " + relatorioPedidos.mask(row["total"].toFixed(2)),
				"comissao": "R$ " + relatorioPedidos.mask(row["comissao"].toFixed(2)),
				"quantidade": relatorioPedidos.mask(row["quantidade"].toFixed(0)),
				"descricao": key
			}
			var html = Mustache.render(tpl, t);
			$(".ul-resumo").append(html);
		}
		
		var total = {
			"total": 0,
			"comissao": 0,
			"quantidade": 0,
			"mensalRegiao": 0,
			"mensalRemanescente": 0,
			"diarioRemanescente": 0,
			"dias": 0
		};
		
		var origem = {};
		
		var dataRequest = [];
		for (var i=0; i<relatorioPedidos.list.length; i++) {
			var item = relatorioPedidos.list[i];
			
			var valorcobrar = parseFloat(item["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
			var valortotalcomissao = parseFloat(item["valortotalcomissao"].replace(/,/g, '').replace(",", "."));
			var valortotalacobrar = parseFloat(item["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
			
			total["total"] += valorcobrar;
			total["comissao"] += valortotalcomissao;
			total["quantidade"] += 1;
			
			if (total["mensalRegiao"] == 0) {
				total["mensalRegiao"] = parseFloat(item["metavlrvenda"].replace(/,/g, '').replace(",", "."));
			}
			if (total["dias"] == 0) {
				total["dias"] = +(item["diasuteisrestantes"]);
			}
			
			if (item["situacao"] == type && item["naturezaoperacao"] == "V") {
				origem[item["descorigempedido"]] = (origem[item["descorigempedido"]] ? origem[item["descorigempedido"]] + valortotalacobrar : valortotalacobrar)
			}
			if (item["situacao"] == type) {
				var m = moment(item["datainclusao"]);
				item["datainclusao"] = m.format("DD/MM/YYYY");
				item["valor"] = (item["situacao"] == "") ? item["valortotalpedido"] : item["valortotalacobrar"];
				item["valor"] = parseFloat(item["valor"].replace(/,/g, '').replace(",", "."));
				item["valor"] = relatorioPedidos.mask(item["valor"].toFixed(2));
				item["comissao"] = parseFloat(item["valortotalcomissao"].replace(/,/g, '').replace(",", "."));
				item["comissao"] = relatorioPedidos.mask(item["comissao"].toFixed(2));
				dataRequest.push(item);
			}
		}
		
		html = '<li class="list-group-item active">TOTAIS DOS PEDIDOS</li>';
		$(".ul-resumo").append(html);
		
		var t = {
			"descricao": "TOTAL",
			"group": "list-group-item-success",
			"total": "R$ " + relatorioPedidos.mask(total["total"].toFixed(2)),
			"comissao": "R$ " + relatorioPedidos.mask(total["comissao"].toFixed(2)),
			"quantidade": relatorioPedidos.mask(total["quantidade"].toFixed(0)),
		}
		html = Mustache.render(tpl, t);
		$(".ul-resumo").append(html);
		
		var despesas = relatorioPedidos["current"].despesas;
		if (!despesas) {
			despesas = {
				"total": 0,
				"comissao": 0,
				"quantidade": 0
			}
		}
		var td = {
			"descricao": "TOTAL - Devolução",
			"group": "list-group-item-success",
			"total": "R$ " + relatorioPedidos.mask((total["total"] - despesas["total"]).toFixed(2))
		}
		
		var d = {
			"total": "R$ " + relatorioPedidos.mask(despesas["total"].toFixed(2)),
			"comissao": "R$ " + relatorioPedidos.mask(despesas["comissao"].toFixed(2)),
			"quantidade": relatorioPedidos.mask(despesas["quantidade"].toFixed(0)),
			"descricao": "Devolução",
			"group": "list-group-item-danger"
		}

		html = Mustache.render(tpl, d);
		$(".ul-resumo").append(html);

		html = Mustache.render(tpl, td);
		$(".ul-resumo").append(html);

		var p = {
			"descricao": "Potenc. Mensal Região",
			"group": "list-group-item-info",
			"total": "R$ " + relatorioPedidos.mask((total["mensalRegiao"]).toFixed(2))
		}
		
		html = Mustache.render(tpl, p);
		$(".ul-resumo").append(html);
		
		var r = {
			"descricao": "Potenc. Mensal Remanescente",
			"group": "list-group-item-info",
			"total": "R$ " + relatorioPedidos.mask((total["mensalRegiao"] - total["total"] - despesas["total"]).toFixed(2))
		}
		html = Mustache.render(tpl, r);
		$(".ul-resumo").append(html);
		
		var sf = (total["mensalRegiao"] - total["total"] - despesas["total"]);
		if (total["dias"] > 0) {
			sf = sf / total["dias"]; 
		}
		var f = {
			"descricao": "Potenc. Mensal Remanescente",
			"group": "list-group-item-info",
			"total": "R$ " + relatorioPedidos.mask(sf.toFixed(2))
		}

		html = Mustache.render(tpl, f);
		$(".ul-resumo").append(html);
		
		var data = [];
		for (var key in origem) {
			var o = {
				"value": parseFloat(origem[key].toFixed(2)),
				"label": key
			}
			data.push(o);
		}
		
		var chart = FLUIGC.chart('#chartOrigem', {
		    id: 'set_an_id_for_my_chart',
		    width: '700',
		    height: '200',
		    /* See the list of options */
		});
		// call the pie function
		var options = {
			"segmentShowStroke": true,
			"tooltipTemplate": '<%if (label){%><%=label%><%}%><%=" - "%><%=value%><%=" - "%><%= Math.round(100*(value/pieChart.total)) %>%'
		}
		pieChart = chart.pie(data, options);
		
		console.log(pieChart);
		console.log(pieChart.generateLegend());
		
		$(".legend-chart").html(pieChart.generateLegend());
		
		relatorioPedidos.dataTable = FLUIGC.datatable('#datatablePedidos', {
			dataRequest: dataRequest,
			renderContent: ".template_datatable",
		    header: [
		        {'title': 'PEDIDO'},
		        {'title': 'DATA'},
		        {'title': 'VALOR'},
		        {'title': 'COMISSÃO'},
		        {'title': 'CLIENTE'},
		        {'title': 'NOME CLIENTE'},
		        {'title': 'ORIGEM'},
		        {'title': 'SIT.'}
		    ],
		    multiSelect: false,
		    classSelected: 'success',
		    search: {
		        enabled: true,
		        onSearch: function(response) {
                    var value = response.toLowerCase();
                    $(".table-datatable tbody tr").filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
		        },
		        onlyEnterkey: false,
		        searchAreaStyle: 'col-md-3'
		    },
		    scroll: {
		        enabled: false
		    },
		    actions: {
		        enabled: false
		    },
		    navButtons: {
		        enabled: false,
		    },
		    emptyMessage: '<div class="text-center">Sem informações.</div>',
		    tableStyle: 'table-striped',
		    draggable: {
		        enabled: false
		    }
		}, function(err, data) {
		    // DO SOMETHING (error or success)
		});
		
		relatorioPedidos.dataTable.on('fluig.datatable.onselectrow', function(data) { 
			console.log(data);
			data.stopPropagation();
			var row = relatorioPedidos.dataTable.getData()[data.selectedIndex[0]];
			console.log("row", row)
			relatorioPedidos.onClickPedido(row["nropedidovenda"]);
		});		
		
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
	
	listpedidos: function(el, ev) {
		relatorioPedidos .loading.show();
		this.getPedidos($('#listrepresentatives').val());
	},
	
	isrca: function() {
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", this.grouprca, this.grouprca, ConstraintType.MUST, false);

		var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1, c2], null);
		if (dataset && dataset.values && dataset.values.length > 0) { return true; }
		
		return false;
	},
	
	showrepresentative: function() {
		var c1 = DatasetFactory.createConstraint("grupo", relatorioPedidos.grouprca, relatorioPedidos.grouprca, ConstraintType.MUST, false);
		var dataset = DatasetFactory.getDataset("ds_lista_usuarios_grupo", null, [c1], null);
		if (dataset && dataset.values && dataset.values.length > 0) {
			var list = [{ "id": WCMAPI.userLogin, "name": WCMAPI.userLogin + " - " + WCMAPI.user }];
			var values = dataset["values"];
			for (var i=0; i<values.length; i++) {
				var row = values[i];
				if (WCMAPI.userCode != row["colleagueId"]) {
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
			
			this.setupperiodo();
			this.getPedidos();
		} else {
			var list = [{ "id": WCMAPI.userLogin, "name": WCMAPI.userLogin + " - " + WCMAPI.user }];
			var tpl = $('.tpl-representante').html();
			var data = { "items": list};
			var html = Mustache.render(tpl, data);
			$('#listrepresentatives').append(html);
			this.setupperiodo();
			this.getPedidos();
		}
		
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

		var tpl = $('.tpl-continuous-scroll-periodo').html();
		var data = { "items": list};
		var html = Mustache.render(tpl, data);
		$('#periodo').append(html);
		
		
	},
	
	getPedidos: function(el, ev) {

		relatorioPedidos.loading.show();
		$(".line-1").empty();
		$(".line-2").empty();

		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('YYYY-MM-DD');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('YYYY-MM-DD');
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("codRepresentante", $('#listrepresentatives').val(), $('#listrepresentatives').val(), ConstraintType.MUST, false);
		
		console.log("dataset", c1, c2, c3)
	      
		DatasetFactory.getDataset('ds_webservice_meus_pedidos', null, [c1, c2, c3], null, {"success": relatorioPedidos.onReadyGetPedidos});
		
	},

	onReadyGetPedidos: function(rows) {
		console.log("dataset", rows)
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			relatorioPedidos.loading.hide();
			WCMC.messageError('${i18n.getTranslation("representante.nao.comissoes")}');	    			
			return;
		}
		
		var total = { };
		var despesas = null;
		var values = rows["values"];
		
		relatorioPedidos.list = values; 
		
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			
			console.log("row", row["situacao"], row["cgo"])
			
			var description = "";
			if (row["cgo"] == "501") {
				description = "Venda";
			} else if (row["cgo"] == "511") {
				description = "Troca";
			} else if (row["cgo"] == "708") {
				description = "Bonificação";
			} else {
				description = "Outros";
			}
			
			var situacao = "";
			if (row["situacao"] == "F") { situacao = "Faturamento"; }
			else if (row["situacao"] == "C") { situacao = "Cancelado"; }
			else if (row["situacao"] == "A") { situacao = "Em analise"; }
			else if (row["situacao"] == "D") { situacao = "Digitação"; }
			else if (row["situacao"] == "L") { situacao = "Liberado"; }
			else if (row["situacao"] == "R") { situacao = "Roteirização"; }
			else if (row["situacao"] == "S") { situacao = "Em separação"; }
			else if (row["situacao"] == "W") { situacao = "Em transito"; }
			
			var valorcobrar = parseFloat(row["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
			var valortotalcomissao = parseFloat(row["valortotalcomissao"].replace(/,/g, '').replace(",", "."));
			var valortotalpedido = parseFloat(row["valortotalpedido"].replace(/,/g, '').replace(",", "."));
			
			if (row["naturezaoperacao"] == "V") {
				if (total[row["situacao"]]) {
					total[row["situacao"]].quantidade = total[row["situacao"]].quantidade + 1;
					total[row["situacao"]].total = total[row["situacao"]].total + (row["situacao"] == "C" ? valortotalpedido : valorcobrar);
					total[row["situacao"]].comissao = total[row["situacao"]].comissao + valortotalcomissao;
					
					if (total[row["situacao"]].cgo[description]) {
						total[row["situacao"]].cgo[description].total = total[row["situacao"]].cgo[description].total + (row["situacao"] == "C" ? valortotalpedido : valorcobrar);
						total[row["situacao"]].cgo[description].comissao = total[row["situacao"]].cgo[description].comissao + valortotalcomissao;
						total[row["situacao"]].cgo[description].quantidade = total[row["situacao"]].cgo[description].quantidade + 1;
					} else {
						total[row["situacao"]].cgo[description] = {
							"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
							"comissao": valortotalcomissao,
							"quantidade": 1
						}
					}
					
				} else {
					total[row["situacao"]] = {
						"quantidade": 1,
						"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
						"comissao": valortotalcomissao,
						"situacao": situacao 
					}
					total[row["situacao"]].cgo = {};
					total[row["situacao"]].cgo[description] = {
						"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
						"comissao": valortotalcomissao,
						"quantidade": 1,
					}
				}
			} else if (row["naturezaoperacao"] == "D") {
				if (despesas) {
					despesas["quantidade"] = despesas["quantidade"] + 1;
					despesas["total"] = despesas["total"] + valortotalpedido;
					despesas["comissao"] = despesas["comissao"] +valortotalcomissao;
				} else {
					despesas = {
						"quantidade": 1,
						"total": valortotalpedido,
						"comissao": valortotalcomissao
					}
				}
			}
		}

		relatorioPedidos.current = {
			"totais": total,
			"despesas":despesas 
		}; 
		
		relatorioPedidos.montaTela(total);
		console.log(total)
		console.log(despesas)
	},
	montaTela: function(items) {
		
		var colClassLine1 = null;
		var colClassLine2 = null;
		var line = Object.keys(items).length;
		if (Object.keys(items).length == 1) {
			colClassLine1 = "col-md-12";
		} else if (Object.keys(items).length == 2) {
			colClassLine1 = "col-md-6";
		} else if (Object.keys(items).length == 3) {
			colClassLine1 = "col-md-4";
		} else if (Object.keys(items).length == 4) {
			colClassLine1 = "col-md-3";
		} else if (Object.keys(items).length == 5) {
			line = 3;
			colClassLine1 = "col-md-4";
			colClassLine2 = "col-md-6";
		} else if (Object.keys(items).length == 6) {
			line = 3;
			colClassLine1 = "col-md-4";
			colClassLine2 = "col-md-4";
		} else if (Object.keys(items).length == 7) {
			line = 4;
			colClassLine1 = "col-md-4";
			colClassLine2 = "col-md-3";
		} else if (Object.keys(items).length == 8) {
			line = 4;
			colClassLine1 = "col-md-3";
			colClassLine2 = "col-md-3";
		}
		
		console.log(colClassLine1, colClassLine2);
		
		var index = 0;
		for (var key in items) {
			var background = relatorioPedidos.background[index];
			var row = items[key];
			
			var o = {
				"background": background,
				"id": key,
				"comissao": "R$ " + relatorioPedidos.mask(row["comissao"].toFixed(2)),
				"quantidade": relatorioPedidos.mask(row["quantidade"].toFixed(0)),
				"total": "R$ " + relatorioPedidos.mask(row["total"].toFixed(2)),
				"tipo": row["situacao"]
			}

			var inrow = "line-1";
			if (index < line) {
				o["classItem"] = colClassLine1;
			} else {
				o["classItem"] = colClassLine2;
				inrow = "line-2";
			}
			
			console.log(index, inrow)
			
			var tpl = $('.tpl-detalhamento').html();
			var data = { "item": o};
			var html = Mustache.render(tpl, data);
			
			$("." + inrow).append(html);
			
			if (index == 0) {
				relatorioPedidos.showResumo(key);
			}
			
			index++;
			
		}
		
		relatorioPedidos.loading.hide();
	},
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
	onClickPedido: function(pedido) {
		relatorioPedidos.loading.show();
		
		var c1 = DatasetFactory.createConstraint("pedido", pedido, pedido, ConstraintType.MUST, false);
		relatorioPedidos.listConditions = null;
		relatorioPedidos.listItems = null;
		relatorioPedidos.clickedPedido = pedido; 
		console.log("dataset", c1)
	      
		DatasetFactory.getDataset('ds_pedido_condicao', null, [c1], null, {"success": relatorioPedidos.onReadyGetCondicao});
		DatasetFactory.getDataset('ds_pedido_item', null, [c1], null, {"success": relatorioPedidos.onReadyGetItem});
		
	},
	onReadyGetCondicao: function(rows) {
		console.log("dataset", rows)
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			relatorioPedidos.listConditions = [];
		} else {
			relatorioPedidos.listConditions = rows["values"];
		}
		relatorioPedidos.showItemsPedido();
	},
	
	onReadyGetItem: function(rows) {
		console.log("dataset", rows)
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			relatorioPedidos.listItems = [];
		} else {
			relatorioPedidos.listItems = rows["values"];		
		}
		relatorioPedidos.showItemsPedido();
	},
	showItemsPedido: function() {
		if (relatorioPedidos.listConditions != null && relatorioPedidos.listItems != null) {
			relatorioPedidos.sortInt(relatorioPedidos.listConditions, "nroparcela");
			relatorioPedidos.sortInt(relatorioPedidos.listItems, "seqitem");
			
			var params = { 
				"condicoes": relatorioPedidos.listConditions, 
				"items": relatorioPedidos.listItems
			}
			
			WCMAPI.convertFtlAsync(relatorioPedidos.code, 'detalhe.ftl', { "params": params },
				function (data) {
				   FLUIGC.modal({
					    title: 'ITENS DO PEDIDO - ' + relatorioPedidos.clickedPedido,
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
				   relatorioPedidos.loading.hide();
			   },
			   function(err) { }
		  );		
			
		}
	},
	sortInt: function (list, key) {
		return list.sort(function (a, b) {
	        var x = +(a[key]);
	        var y = +(b[key]);
	        if (x < y) return -1;
			if (x > y) return 1;
			
			return 0;
	    });
	}
});
