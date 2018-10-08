var relatorioPedidos = SuperWidget.extend({
	current: null,
	mobile: FLUIGC.utilities.checkDevice().isMobile,
	loading: FLUIGC.loading(window),
	background: ["bg-aqua", "bg-red", "bg-light-blue", "bg-green", "bg-navy", "bg-olive", "bg-orange", "bg-teal"],
	list: null,
	current: {}, 
	
	init : function() {
		$(".pageTitle").parent().remove();
		relatorioPedidos.loading.show();
		
		relatorioPedidos.grouprca = this.grouprca;
		
		if (this.isrca() == false) {
			console.log("showrepresentative");
			this.showrepresentative();
		} else {
			console.log("no rca");
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
			"change-periodo": ['change_getcomissoes'],
			'save-preferences': ['click_savePreferences'],
			"change-representante": ['change_listcomissoes'],
			'click-item': ['click_clickItem']
		}
	},
	
	clickItem: function(el, ev) {
		console.log(el, ev);
		
		relatorioPedidos.showResumo($(el).data("id"));
		
	},
	
	showResumo: function(type) {
		var o = relatorioPedidos["current"].totais[[type]];
		
		$(".titleResumo").html(o["situacao"]);

		$(".ul-resumo").html("");
		for (var key in o["cgo"]) {
			var row = o.cgo[key];
			
			var o = {
				"badge": "",
				"valor": "R$ " + relatorioPedidos.mask(row["total"].toFixed(2)),
				"descricao": key
			}
			var tpl = $('.tpl-resumo').html();
			var data = { "item": o};
			var html = Mustache.render(tpl, data);
			$(".ul-resumo").append(html);
		}
		
		var total = {
			"pedido": 0,
			"comissao": 0,
			"quantidade": 0,
			"mensalRegiao": 0,
			"mensalRemanescente": 0,
			"diarioRemanescente": 0,
			"dias": 0
		};
		for (var i=0; i<relatorioPedidos.list.length; i++) {
			var item = relatorioPedidos.list[i];
			
			total["pedido"] += item["valortotalacobrar"];
			total["comissao"] += item["valortotalcomissao"];
			total["comissao"] += 1;
			
			if (total["mensalRegiao"] == 0) {
				total["mensalRegiao"] = item["metavlrvenda"];
			}
			if (total["dias"] == 0) {
				total["dias"] = item["diasuteisrestantes"];
			}
			
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
		console.log("show", c1)
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

			console.log("show", list)
			
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
					total[row["situacao"]].cgo[description].total = total[row["situacao"]].cgo[description].total + (row["situacao"] == "C" ? valortotalpedido : valorcobrar);
					total[row["situacao"]].cgo[description].comissao = total[row["situacao"]].cgo[description].comissao + valortotalcomissao;
					total[row["situacao"]].cgo[description].quantidade = total[row["situacao"]].cgo[description].quantidade + 1;
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
		if (Object.keys(items).length == 1) {
			colClassLine1 = "col-md-12";
		} else if (Object.keys(items).length == 2) {
			colClassLine1 = "col-md-6";
		} else if (Object.keys(items).length == 3) {
			colClassLine1 = "col-md-4";
		} else if (Object.keys(items).length == 4) {
			colClassLine1 = "col-md-3";
		} else if (Object.keys(items).length == 5) {
			colClassLine1 = "col-md-4";
			colClassLine2 = "col-md-6";
		} else if (Object.keys(items).length == 6) {
			colClassLine1 = "col-md-4";
			colClassLine2 = "col-md-4";
		} else if (Object.keys(items).length == 7) {
			colClassLine1 = "col-md-4";
			colClassLine2 = "col-md-3";
		} else if (Object.keys(items).length == 8) {
			colClassLine1 = "col-md-3";
			colClassLine2 = "col-md-3";
		}
		
		console.log(Object.keys(items).length);
		
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
			if (index < 4) {
				o["classItem"] = colClassLine1;
			} else {
				o["classItem"] = colClassLine2;
				inrow = "line-2";
			}
			
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
	
});
