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
	isLoaded: false,
	init : function() {
		$(".pageTitle").parent().remove();
		relatorioPedidos.grouprca = perfilrepresentante.grouprca;
		relatorioPedidos.representante = perfilrepresentante.representante;
		
	},
	bindings : {
		local : {},
		global : {
			"change-periodo": ['change_changePeriodo'],
			"change-representante": ['change_listpedidos'],
			'click-home': ['click_clickHome'],
			'change-situacao': ['change_changeSituacao'],
			'change-origem': ['change_changeOrigem'],
			'change-all': ['change_changeAll'],
			'scroll-to-left': ['click_scrollLeft'],
		}
	},
	onShowWidget: function() {
		if (!relatorioPedidos.isLoaded) {
			relatorioPedidos.loading.show();
			relatorioPedidos.isLoaded = true;
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(relatorioPedidos.getPedidos);
		}
	},
	changeSituacao: function(el, ev) {
		relatorioPedidos.showResumo(false);
	},
	changeOrigem: function(el, ev) {
		relatorioPedidos.showResumo(true);
	},
	changeAll: function(el, ev) {
		var type = $(el).data("type");
		$(".check-" + type).each(function() {
			$(this).prop("checked", $(el).prop("checked"));
		})
		relatorioPedidos.showResumo((type == "origem" ? true : false));
	},
	clickHome: function(el, ev) {
		$(".no-detail").show( "puff", 1000 );
		$(".in-detail").hide( "fold", 1000 );
	},
	showResumo: function(isOrigem) {
		var total = {
			"total": 0,
			"comissao": 0,
			"quantidade": 0,
			"mensalRegiao": 0,
			"mensalRemanescente": 0,
			"diarioRemanescente": 0,
			"dias": 0
		};
		
		var porsituacao = {
			"total": 0,
			"comissao": 0,
			"quantidade": 0
		}
		
		var pororigem = {};
		
		var dataRequest = [];
		
		for (var i=0; i<relatorioPedidos.list.length; i++) {
			var item = relatorioPedidos.list[i];
			var valorcobrar = (item["valortotalacobrar"] == null ? 0 : parseFloat(item["valortotalacobrar"].replace(/,/g, '').replace(",", ".")));
			var valortotalcomissao = (item["valortotalcomissao"] == null ? 0 : parseFloat(item["valortotalcomissao"].replace(/,/g, '').replace(",", ".")));
			var valortotalacobrar = (item["valortotalacobrar"] == null ? 0 : parseFloat(item["valortotalacobrar"].replace(/,/g, '').replace(",", ".")));
			var valortotalpedido = (item["valortotalpedido"] == null ? 0 : parseFloat(item["valortotalpedido"].replace(/,/g, '').replace(",", ".")));
			
			total["total"] += valorcobrar;
			total["comissao"] += valortotalcomissao;
			total["quantidade"] += 1;
			
			if (total["dias"] == 0) {
				total["dias"] = +(item["diasuteisrestantes"]);
			}
			
			var check1 = $("#switch-" + item["situacao"]).prop("checked");
			var check2 = true;
			if (isOrigem) { 
				check2 = $("#switch-origem-" + item["descorigempedido"]).prop("checked");
			}
			if (check1 && check2) {
				var m = moment(item["datainclusao"]);
				console.log("moment", item["datainclusao"], m)
				item["datainclusaof"] = m.format("DD/MM/YYYY");
				item["valor"] = (item["situacao"] == "" || item["situacao"] == "C" || item["situacao"] == "D") ? item["valortotalpedido"] : item["valortotalacobrar"];
				item["valor"] = parseFloat(item["valor"].replace(/,/g, '').replace(",", "."));
				item["valor"] = relatorioPedidos.mask(item["valor"].toFixed(2));
				item["comissao"] = (item["valortotalcomissao"] == null ? 0 : parseFloat(item["valortotalcomissao"].replace(/,/g, '').replace(",", ".")));
				item["comissao"] = relatorioPedidos.mask(item["comissao"].toFixed(2));
				dataRequest.push(item);
				
				porsituacao.quantidade = porsituacao.quantidade + 1;
				porsituacao.total = porsituacao.total + (item["situacao"] == "C" || item["situacao"] == "D" ? valortotalpedido : valorcobrar);
				porsituacao.comissao = porsituacao.comissao + valortotalcomissao;
				
				if (pororigem[item["descorigempedido"]]) {
					pororigem[item["descorigempedido"]].quantidade = pororigem[item["descorigempedido"]].quantidade + 1;
					pororigem[item["descorigempedido"]].total = pororigem[item["descorigempedido"]].total + (item["situacao"] == "C" || item["situacao"] == "D" ? valortotalpedido : valorcobrar);
					pororigem[item["descorigempedido"]].comissao = pororigem[item["descorigempedido"]].comissao + valortotalcomissao;
				} else {
					pororigem[item["descorigempedido"]] = {
						"quantidade": 1,
						"total": (item["situacao"] == "C" || item["situacao"] == "D" ? valortotalpedido : valorcobrar),
						"comissao": valortotalcomissao,
						"descorigempedido": item["descorigempedido"]
					}
				}
			}
		}
		
		$(".total-qtde").html(porsituacao.quantidade)
		$(".total-valor").html("R$ " + relatorioPedidos.mask(porsituacao.total.toFixed(2)));
		$(".total-comissao").html("R$ " + relatorioPedidos.mask(porsituacao.comissao.toFixed(2)));
		
		if (isOrigem == false) {
			var qtdetotal = 0;
			var pedidototal = 0;
			var comissaototal = 0;
			
			html = '<table class="table table-condesed table-striped">' + 
				'<thead>' + 
				'<tr>' + 
				'<th><input id="switch-all-origem" type="checkbox" checked data-type="origem" data-change-all data-size="mini"></th>' + 
				'<th>ORIGEM</th>' + 
				'<th class="fs-txt-right">QTD</th>' + 
				'<th class="fs-txt-right">VALOR DO PEDIDO</th>' + 
				'<th class="fs-txt-right">VALOR DA COMISS&Atilde;O</th>' +
				'</tr>' + 
				'</thead>' + 
				'<tbody>';
			
			for (var key in pororigem) {
				var o = pororigem[key];
				html += '<tr><td>' +
					'<input id="switch-origem-' + key + '" type="checkbox" checked data-origem="' + key + '" data-change-origem data-size="mini" class="check-origem"></td>' +
					'<td><label>' + o["descorigempedido"] + '</label></td>' + 
					'<td class="fs-txt-right">' + o["quantidade"] + '</td>' + 
					'<td class="fs-txt-right">R$ ' + relatorioPedidos.mask(o["total"].toFixed(2)) + '</td>' + 
					'<td class="fs-txt-right">R$ ' + relatorioPedidos.mask(o["comissao"].toFixed(2)) + '</td></tr>';
				qtdetotal += o["quantidade"];
				pedidototal += o["total"];
				comissaototal += o["comissao"];
			}
			
			html += '<tr class="success" style="font-weight: bold;"><td>&nbsp</td>' +
				'<td class="fs-txt-right">TOTAL</td>' + 
				'<td class="fs-txt-right total-qtde">' + qtdetotal + '</td>' + 
				'<td class="fs-txt-right total-valor">R$ ' + relatorioPedidos.mask(pedidototal.toFixed(2)) + '</td>' + 
				'<td class="fs-txt-right total-comissao">R$ ' + relatorioPedidos.mask(comissaototal.toFixed(2)) + '</td></tr>';
			html += '</tbody></table>';
			$(".switch-origem").html(html);
		}

		relatorioPedidos.dataTable = FLUIGC.datatable('#datatablePedidos', {
			dataRequest: dataRequest,
			renderContent: ".template_datatable",
		    header: [
		        {'title': 'PEDIDO', "size": "fs-txt-right"},
		        {'title': 'DATA'},
		        {'title': 'VALOR', "size": "fs-txt-right"},
		        {'title': 'COMISSÃO', "size": "fs-txt-right"},
		        {'title': 'CLIENTE', "size": "fs-txt-right"},
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
			$(".modal").remove();
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
	
	changePeriodo: function(el, ev) {
		relatorioPedidos.isLoaded = false;
		eval(perfilrepresentante.currentWidget)();
	},
	
	listpedidos: function(el, ev) {
		relatorioPedidos.representante = perfilrepresentante.representante;
		relatorioPedidos.isLoaded = false;
		eval(perfilrepresentante.currentWidget)();
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
		
		DatasetFactory.getDataset('ds_webservice_meus_pedidos', null, [c1, c2, c3], null, {"success": relatorioPedidos.onReadyGetPedidos});
		
	},

	onReadyGetPedidos: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			relatorioPedidos.loading.hide();
			return;
		}

		var values = rows["values"];
		if (values[0].nropedidovenda == "Erro") {
			relatorioPedidos.loading.hide();
			return;
		}
		
		var total = { };
		var origemtotal = { };
		var despesas = null;
		
		relatorioPedidos.list = values;
		if (perfilrepresentante) {
			perfilrepresentante.populateCustomers(values);
		}
		
		
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			console.log(row);
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

			var valorcobrar = (row["valortotalacobrar"] == null ? 0 : parseFloat(row["valortotalacobrar"].replace(/,/g, '').replace(",", ".")));
			var valortotalcomissao = (row["valortotalcomissao"] == null ? 0 : parseFloat(row["valortotalcomissao"].replace(/,/g, '').replace(",", ".")));
			var valortotalpedido = (row["valortotalpedido"] == null ? 0 : parseFloat(row["valortotalpedido"].replace(/,/g, '').replace(",", ".")));
			
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
				if (row["situacao"] != "C") {
					if (origemtotal[row["descorigempedido"]]) {
						origemtotal[row["descorigempedido"]].quantidade = origemtotal[row["descorigempedido"]].quantidade + 1;
						origemtotal[row["descorigempedido"]].total = origemtotal[row["descorigempedido"]].total + (row["situacao"] == "C" ? 0 : valorcobrar);
						origemtotal[row["descorigempedido"]].comissao = origemtotal[row["descorigempedido"]].comissao + valortotalcomissao;
					} else {
						origemtotal[row["descorigempedido"]] = {
							"quantidade": 1,
							"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
							"comissao": valortotalcomissao,
							"descorigempedido": row["descorigempedido"]
						}
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
		
		$(".switch-situacao").html('');
		var html = '<table class="table table-condesed table-striped">' + 
			'<thead>' + 
			'<tr>' + 
			'<th><input id="switch-all" type="checkbox" checked data-type="situacao" data-change-all data-size="mini"></th>' + 
			'<th>SITUA&Ccedil;&Atilde;O</th>' + 
			'<th class="fs-txt-right">QTD</th>' + 
			'<th class="fs-txt-right">VALOR DO PEDIDO</th>' + 
			'<th class="fs-txt-right">VALOR DA COMISS&Atilde;O</th>' +
			'</tr>' + 
			'</thead>' + 
			'<tbody>';
		
		var qtdetotal = 0;
		var pedidototal = 0;
		var comissaototal = 0;
		
		for (var key in total) {
			var o = total[key];
			html += '<tr><td>' +
				'<input id="switch-' + key + '" type="checkbox" checked data-situacao="' + key + '" data-change-situacao data-size="mini" class="check-situacao"></td>' +
				'<td><label>' + o["situacao"] + '</label></td>' + 
				'<td class="fs-txt-right">' + o["quantidade"] + '</td>' + 
				'<td class="fs-txt-right">R$ ' + relatorioPedidos.mask(o["total"].toFixed(2)) + '</td>' + 
				'<td class="fs-txt-right">R$ ' + relatorioPedidos.mask(o["comissao"].toFixed(2)) + '</td></tr>';
			if (key != 'C') {
				qtdetotal += o["quantidade"];
				pedidototal += o["total"];
				comissaototal += o["comissao"];
			}
		}
		
		if (despesas) {
			html += '<tr><td>' +
				'<input id="switch-D" type="checkbox" checked data-situacao="D" data-change-situacao data-size="mini" class="check-situacao"></td>' +
				'<td><label>Devoluções</label></td>' + 
				'<td class="fs-txt-right">' + despesas["quantidade"] + '</td>' + 
				'<td class="fs-txt-right">R$ ' + relatorioPedidos.mask(despesas["total"].toFixed(2)) + '</td>' + 
				'<td class="fs-txt-right">R$ ' + relatorioPedidos.mask(despesas["comissao"].toFixed(2)) + '</td></tr>';
			qtdetotal += despesas["quantidade"];
			pedidototal += despesas["total"];
			comissaototal += despesas["comissao"];
		}
		html += '<tr class="success" style="font-weight: bold;"><td>&nbsp</td>' +
			'<td class="fs-txt-right">TOTAL</td>' + 
			'<td class="fs-txt-right total-qtde">' + qtdetotal + '</td>' + 
			'<td class="fs-txt-right total-valor">R$ ' + relatorioPedidos.mask(pedidototal.toFixed(2)) + '</td>' + 
			'<td class="fs-txt-right total-comissao">R$ ' + relatorioPedidos.mask(comissaototal.toFixed(2)) + '</td></tr>';
			html += '</tbody></table>';
		$(".switch-situacao").html(html);
		
		relatorioPedidos.current = {
			"totais": total,
			"despesas":despesas 
		}; 
		
		relatorioPedidos.showResumo(false);
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
			
			for (var i=0; i<relatorioPedidos.listConditions.length; i++) {
				var row = relatorioPedidos.listConditions[i];
				var valorparcela = parseFloat(row["valorparcela"].replace(/,/g, '').replace(",", "."));
				row["valorparcela"] = relatorioPedidos.mask(valorparcela.toFixed(2))
				relatorioPedidos.listConditions[i] = row;
			}
			
			for (var i=0; i<relatorioPedidos.listItems.length; i++) {
				var row = relatorioPedidos.listItems[i];
				var valorpedido = parseFloat(row["valorpedido"].replace(/,/g, '').replace(",", "."));
				var valoratendido = parseFloat(row["valoratendido"].replace(/,/g, '').replace(",", "."));
				var valortotalcomissao = parseFloat(row["valortotalcomissao"].replace(/,/g, '').replace(",", "."));
				var valortotalacobrar = parseFloat(row["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
				row["valorpedido"] = relatorioPedidos.mask(valorpedido.toFixed(2));
				row["valoratendido"] = relatorioPedidos.mask(valoratendido.toFixed(2));
				row["valortotalcomissao"] = relatorioPedidos.mask(valortotalcomissao.toFixed(2));
				row["valortotalacobrar"] = relatorioPedidos.mask(valortotalacobrar.toFixed(2));
				relatorioPedidos.listItems[i] = row;
			}
			
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
	},
	scrollLeft: function(el, ev) {
		$(".table-responsive").scrollLeft(0)
	}
});
