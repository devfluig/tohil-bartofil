var relatorioPedidos = SuperWidget.extend({
	current: null,
	mobile: FLUIGC.utilities.checkDevice().isMobile,
	loading: FLUIGC.loading(window),
	code: "bartofil_relatorio_pedidos",
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
			'click-item': ['click_clickItem'],
			'click-home': ['click_clickHome']
		}
	},
	clickHome: function(el, ev) {
		$(".no-detail").show( "puff", 1000 );
		$(".in-detail").hide( "fold", 1000 );
	},
	clickItem: function(el, ev) {
		
		if ($(el).data("id") == null || $(el).data("id") == "") { return false; }
		
		$(".no-detail").hide( "puff", 1000 );
		$(".in-detail").show( "fold", 1000 );

		if ($(el).data("id") == "ND") {
			$(".detail-cgo").hide();
		} else if ($(el).data("id") != null && $(el).data("id") != "") {
			$(".detail-cgo").show();
		}
		
		relatorioPedidos.showResumo($(el).data("id"));
	},
	
	showResumo: function(type) {
		if (type == null || type == "") { return false; }
		
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
		
		if (type != "ND") {
			var cgo = null;
			if (type.indexOf("-") != -1) {
				cgo = type.split("-")[1];
				type = type.split("-")[0]; 
			}
			var o = relatorioPedidos["current"].totais[[type]];
			
			$(".titleResumo").html(o["situacao"]);
			$(".line-total").html("");		
			$(".line-cgo").html("");
			
			var tpl = $('.tpl-resumo').html();
			for (var key in o["cgo"]) {
				var row = o.cgo[key];
				
				var t = {
					"background": "bg-darken-2",
					"id": type + "-" + row["codigo"],
					"comissao": "R$ " + relatorioPedidos.mask(row["comissao"].toFixed(2)),
					"quantidade": row["quantidade"],
					"total": "R$ " + relatorioPedidos.mask(row["total"].toFixed(2)),
					"tipo": key,
					"classItem": "col-sm-3"
				}
				var tpl = $('.tpl-detalhamento').html();
				var data = { "item": t};
				var html = Mustache.render(tpl, data);
				$(".line-cgo").append(html);		
			}
			
			for (var i=0; i<relatorioPedidos.list.length; i++) {
				var item = relatorioPedidos.list[i];
				console.log(item);
				console.log(item["datainclusao"]);
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
				
				var validCgo = false;
				if (cgo != null) {
					if (item["cgo"] == cgo) { validCgo = true; }
				} else {
					validCgo = true;
				}
				
				if (validCgo && item["situacao"] == type && item["naturezaoperacao"] == "V") {
					origem[item["descorigempedido"]] = (origem[item["descorigempedido"]] ? origem[item["descorigempedido"]] + valortotalacobrar : valortotalacobrar)
				}
				if (validCgo && item["situacao"] == type) {
					var m = moment(item["datainclusao"]);
					console.log("moment", item["datainclusao"], m)
					item["datainclusaof"] = m.format("DD/MM/YYYY");
					item["valor"] = (item["situacao"] == "") ? item["valortotalpedido"] : item["valortotalacobrar"];
					item["valor"] = parseFloat(item["valor"].replace(/,/g, '').replace(",", "."));
					item["valor"] = relatorioPedidos.mask(item["valor"].toFixed(2));
					item["comissao"] = parseFloat(item["valortotalcomissao"].replace(/,/g, '').replace(",", "."));
					item["comissao"] = relatorioPedidos.mask(item["comissao"].toFixed(2));
					dataRequest.push(item);
				}
			}
			
		} else {
			$(".titleResumo").html("DEVOLU&Ccedil;&Otildes;ES");
			$(".line-total").html("");		
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
				
				if (item["naturezaoperacao"] == "D") {
					origem[item["descorigempedido"]] = (origem[item["descorigempedido"]] ? origem[item["descorigempedido"]] + valortotalacobrar : valortotalacobrar)
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
		}
		
		var t = {
			"background": "bg-green",
			"id": null,
			"comissao": "R$ " + relatorioPedidos.mask(total["comissao"].toFixed(2)),
			"quantidade": total["quantidade"],
			"total": "R$ " + relatorioPedidos.mask(total["total"].toFixed(2)),
			"tipo": "TOTAL",
			"classItem": "col-sm-4"
		}

		var tpl = $('.tpl-detalhamento').html();
		var data = { "item": t};
		var html = Mustache.render(tpl, data);
		$(".line-total").append(html);		
		
		var despesas = relatorioPedidos["current"].despesas;
		if (!despesas) {
			despesas = {
				"total": 0,
				"comissao": 0,
				"quantidade": 0
			}
		}
		var d = {
			"background": "bg-red",
			"id": "ND",
			"comissao": "R$ " + relatorioPedidos.mask(despesas["comissao"].toFixed(2)),
			"quantidade": despesas["quantidade"],
			"total": "R$ " + relatorioPedidos.mask(despesas["total"].toFixed(2)),
			"tipo": "DEVOLUÇÕES",
			"classItem": "col-sm-4"
		}
		var td = {
			"background": "bg-maroon",
			"id": null,
			"comissao": "R$ " + relatorioPedidos.mask(total["comissao"].toFixed(2)),
			"quantidade": total["quantidade"],
			"total": "R$ " + relatorioPedidos.mask((total["total"] - despesas["total"]).toFixed(2)),
			"tipo": "TOTAL - DEVOLUÇÕES",
			"classItem": "col-sm-4"
		}
		
		tpl = $('.tpl-detalhamento').html();
		data = { "item": d};
		html = Mustache.render(tpl, data);
		$(".line-total").append(html);		
		
		tpl = $('.tpl-detalhamento').html();
		data = { "item": td};
		html = Mustache.render(tpl, data);
		$(".line-total").append(html);
		
		var barChart = FLUIGC.chart('#barPotencial', {
		    id: 'set_an_id_for_my_chart_bar',
		    width: '700',
		    height: '200',
		});
		var options = {
			"barShowStroke": true,
			"tooltipTemplate": '<%if (label){%><%=label%><%}%><%=" - "%><%=value%>'
		};
		var sf = (total["mensalRegiao"] - total["total"] - despesas["total"]);
		var pr = sf;
		if (total["dias"] > 0) {
			sf = sf / total["dias"]; 
		}
		var data = {
		    labels: ["Mensal Região", "Mensal Remanesc", "Mensal Dia"],
		    datasets: [{
	            label: "Valor",
	            data: [(total["mensalRegiao"]).toFixed(2), pr.toFixed(2), sf.toFixed(2)]
		    }]
		};
		
		console.log("bar data", data);
		
		var barChart = barChart.bar(data, options);
		
		console.log("bar data foi ", barChart);
		
		var chart = FLUIGC.chart('#chartOrigem', {
		    id: 'set_an_id_for_my_chart',
		    width: '700',
		    height: '200',
		    /* See the list of options */
		});
		// call the pie function
		options = {
			"segmentShowStroke": true,
			"tooltipTemplate": '<%if (label){%><%=label%><%}%><%=" - "%><%=value%><%=" - "%><%= Math.round(100*(value/pieChart.total)) %>%'
		}
		data = [];
		for (var key in origem) {
			var o = {
				"value": parseFloat(origem[key].toFixed(2)),
				"label": key
			}
			data.push(o);
		}

		if (data.length > 0) {
			pieChart = chart.pie(data, options);
			
			console.log(pieChart);
			console.log(pieChart.generateLegend());
		}
		
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
		$(".in-detail").hide();
		$(".no-detail").show();
		relatorioPedidos.loading.show();
		$(".line-1").empty();
		$(".line-2").empty();
		$(".line-total").empty();
		$(".line-detail").empty();

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
			if (row["datafaturamento"]) {
				var m = moment(row["datafaturamento"]);
				description += " " + m.format("MM/YYYY");
				
			} else {
				var m = moment(row["datainclusao"]);
				description += " " + m.format("MM/YYYY");
			}

			var bg = "";
			var situacao = "";
			if (row["situacao"] == "F") { 
				situacao = "Faturamento";
				bg = "bg-olive";
			} else if (row["situacao"] == "C") { 
				situacao = "Cancelado";
				bg = "bg-yellow";
			} else if (row["situacao"] == "A") { 
				situacao = "Em analise"; 
				bg = "bg-aqua";
			} else if (row["situacao"] == "D") { 
				situacao = "Digitação"; 
				bg = "bg-light-blue";
			} else if (row["situacao"] == "L") { 
				situacao = "Liberado"; 
				bg = "bg-navy";
			} else if (row["situacao"] == "R") { 
				situacao = "Roteirização"; 
				bg = "bg-fuchsia";
			} else if (row["situacao"] == "S") { 
				situacao = "Em separação"; 
				bg = "bg-orange";
			} else if (row["situacao"] == "W") { 
				situacao = "Em transito"; 
				bg = "bg-teal";
			}
			
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
							"codigo": row["cgo"],
							"quantidade": 1
						}
					}
					
				} else {
					total[row["situacao"]] = {
						"quantidade": 1,
						"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
						"comissao": valortotalcomissao,
						"situacao": situacao,
						"bg": bg
					}
					total[row["situacao"]].cgo = {};
					total[row["situacao"]].cgo[description] = {
						"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
						"comissao": valortotalcomissao,
						"codigo": row["cgo"],
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
			var row = items[key];
			
			var o = {
				"background": row["bg"],
				"id": key,
				"comissao": "R$ " + relatorioPedidos.mask(row["comissao"].toFixed(2)),
				"quantidade": row["quantidade"],
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
			
			tpl = $('.tpl-detail-situacao').html();
			data = { "item": o};
			html = Mustache.render(tpl, data);
			$(".line-detail").append(html);
			
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
