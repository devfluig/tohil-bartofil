var relatorioPedidos = SuperWidget.extend({
	current: null,
	mobile: FLUIGC.utilities.checkDevice().isMobile,
	loading: FLUIGC.loading(".widget-pedidos"),
	code: "bartofil_relatorio_pedidos",
	list: null,
	instanceId: null,
	grouprca: null,
	representante: null,
	pieChart: null,
	dataTable: null,
	current: {},
	clickedPedido: null,
	listItems: null,
	listConditions: null,
	pieChartData: [],
	init : function() {
		$(".pageTitle").parent().remove();
		relatorioPedidos.loading.show();
		
		relatorioPedidos.grouprca = perfilrepresentante.grouprca;
		relatorioPedidos.representante = perfilrepresentante.representante;
		
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(relatorioPedidos.getPedidos);
		
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
			var o = relatorioPedidos["current"].totais[type];
			if (!o && Object.keys(relatorioPedidos["current"].totais).length > 0) {
				o = relatorioPedidos["current"].totais[Object.keys(relatorioPedidos["current"].totais)[0]];
				type = Object.keys(relatorioPedidos["current"].totais)[0];
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
			for (var i=0; i<relatorioPedidos.list.length; i++) {
				var item = relatorioPedidos.list[i];
				
				var valorcobrar = parseFloat(item["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
				var valortotalcomissao = parseFloat(item["valortotalcomissao"].replace(/,/g, '').replace(",", "."));
				var valortotalacobrar = parseFloat(item["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
				
				total["total"] += valorcobrar;
				total["comissao"] += valortotalcomissao;
				total["quantidade"] += 1;
				
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
		
		
		relatorioPedidos.loading.hide();
		
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
		relatorioPedidos.representante = perfilrepresentante.representante;
		this.getPedidos();
	},
	
	getPedidos: function(el, ev) {
		$(".in-detail").show();
		relatorioPedidos.loading.show();

		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var startOfMonth = moment(ano + "-" + mes + "-01").startOf('month').format('YYYY-MM-DD');
		var endOfMonth   = moment(ano + "-" + mes + "-01").endOf('month').format('YYYY-MM-DD');
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("codRepresentante", relatorioPedidos.representante, relatorioPedidos.representante, ConstraintType.MUST, false);
		
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

		var values = rows["values"];
		if (values[0].nropedidovenda == "Erro") {
			relatorioPedidos.loading.hide();
			return;
		}
		
		var total = { };
		var despesas = null;
		
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
			var situacao = "";
			if (row["situacao"] == "F") { 
				situacao = "Faturamento";
			} else if (row["situacao"] == "C") { 
				situacao = "Cancelado";
			} else if (row["situacao"] == "A") { 
				situacao = "Em analise"; 
			} else if (row["situacao"] == "D") { 
				situacao = "Digitação"; 
			} else if (row["situacao"] == "L") { 
				situacao = "Liberado"; 
			} else if (row["situacao"] == "R") { 
				situacao = "Roteirização"; 
			} else if (row["situacao"] == "S") { 
				situacao = "Em separação"; 
			} else if (row["situacao"] == "W") { 
				situacao = "Em transito"; 
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
						"situacao": situacao
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
		
		console.log('relatorioPedidos.current', relatorioPedidos.current)
		
		var data = [["Situação", "Valor"]];
		var t = relatorioPedidos.current["totais"];
		for (var key in t) {
			var o = t[key];
			data.push([o["situacao"], o["total"]]);
			relatorioPedidos.pieChartData.push({ "situacao": o["situacao"], "codigo": key})
		}
		
		var options = {
			pieSliceText: 'value',
			width: '300px',
			height: '300px'
        };
		var chart = new google.visualization.PieChart(document.getElementById('pieSituacao'));
		function selectHandler() {
			var selectedItem = chart.getSelection()[0];
			if (selectedItem) {
				var o = relatorioPedidos.pieChartData[selectedItem.row];
				relatorioPedidos.showResumo(o["codigo"]);
				if (o["codigo"] == "F") {
					relatorioPedidos.showGraphFaturamento();
				} else {
					$(".pie-faturamento").hide();
				}
				
				
			}
	    }		
		google.visualization.events.addListener(chart, 'select', selectHandler);
	    chart.draw(google.visualization.arrayToDataTable(data), options);
		
		relatorioPedidos.showResumo("F");
		relatorioPedidos.showGraphFaturamento();
	},
	showGraphFaturamento: function() {
		$(".pie-faturamento").show();
		var data = [["Situação", "Valor"]];
		var t = relatorioPedidos.current["totais"];
		
		if (t["F"]) {
			var f = t["F"].cgo;
			for (var key in f) {
				var o = f[key];
				data.push([key, o["total"]]);
			}
			
			var options = {
				pieSliceText: 'value',
				width: '300px',
				height: '300px'
	        };
			var chart = new google.visualization.PieChart(document.getElementById('pieFaturamento'));
		    chart.draw(google.visualization.arrayToDataTable(data), options);
		}
		
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
