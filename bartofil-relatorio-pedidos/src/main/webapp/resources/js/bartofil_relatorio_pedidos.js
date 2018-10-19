var relatorioPedidos = SuperWidget.extend({
	current: null,
	mobile: FLUIGC.utilities.checkDevice().isMobile,
	loading: FLUIGC.loading(window),

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
			this.getrepresentante(WCMAPI.userLogin);
		}
	},

	bindings : {
		local : {},
		global : {
			"change-periodo": ['change_getcomissoes'],
			'save-preferences': ['click_savePreferences'],
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
		var c1 = DatasetFactory.createConstraint("grupo", this.grouprca, this.grouprca, ConstraintType.MUST, false);

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
			this.getrepresentante(WCMAPI.userLogin);
		} else {
			this.setupperiodo();
			this.getrepresentante(WCMAPI.userLogin);
		}
		
	},
	
	setupperiodo: function() {
	
		var locale = WCMAPI.locale;
		locale = locale.replace("_", "-"); 
		
		var m = moment().locale(locale);
		var list = []; 
		for (var i=0; i<2; i++) {
			var o = { "mes": m.format("MM"), "ano": m.format("YYYY"), "periodo": m.format("MM") + "/" + m.format("YYYY") };
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
		
		var c1 = DatasetFactory.createConstraint("dataInclusaoInicio", startOfMonth, startOfMonth, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("datainclusaofim", endOfMonth, endOfMonth, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("codRepresentante",self.codRepresentante, self.codRepresentante, ConstraintType.MUST);
	      
		DatasetFactory.getDataset('ds_webservice_meus_pedidos', [c1, c2, c3], null, {"success": relatorioPedidos.onReadyGetPedidos});
		
	},

	onReadyGetPedidos: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			relatorioPedidos.loading.hide();
			WCMC.messageError('${i18n.getTranslation("representante.nao.comissoes")}');	    			
			return;
		}
		
		var total = { };
		var despesas = null;
		var values = rows["values"];
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
			if (row["situacao"] == "F") { situacao = "Faturamento"; }
			else if (row["situacao"] == "C") { situacao = "Cancelado"; }
			else if (row["situacao"] == "A") { situacao = "Em analise"; }
			else if (row["situacao"] == "D") { situacao = "Digitação"; }
			else if (row["situacao"] == "L") { situacao = "Liberado"; }
			else if (row["situacao"] == "R") { situacao = "Roteirização"; }
			else if (row["situacao"] == "S") { situacao = "Em separação"; }
			else if (row["situacao"] == "W") { situacao = "Em transito"; }
			
			var valorcobrar = parseFloat(row["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
			var valortotalcomissao = parseFloat(row["valortotalacobrar"].replace(/,/g, '').replace(",", "."));
			var valortotalpedido = parseFloat(row["valortotalpedido"].replace(/,/g, '').replace(",", "."));
			
			if (row["naturezaoperacao"] == "V") {
				if (total[row["situacao"]]) {
					total[row["situacao"]] = {
						"quantidade": total[row["situacao"]].quantidade + 1,
						"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar) + valorcobrar,
						"comissao": total[row["situacao"]].comissao + valortotalcomissao
					}
				} else {
					total[row["situacao"]] = {
						"quantidade": 1,
						"total": (row["situacao"] == "C" ? valortotalpedido : valorcobrar),
						"comissao": valortotalcomissao,
						"situacao": situacao, 
						"descricao": description 
					}
				}
			} else if (row["naturezaoperacao"] == "D") {
				if (despesas) {
					despesas = {
						"quantidade": despesas["quantidade"] + 1,
						"total": despesas["total"] + valortotalpedido,
						"comissao": despesas["comissao"] +valortotalcomissao
					}
				} else {
					despesas = {
						"quantidade": 1,
						"total": valortotalpedido,
						"comissao": valortotalcomissao
					}
				}
			}
		}

		console.log(total)
		console.log(despesas)
		relatorioPedidos.loading.hide();
		
		
	},
	

});
