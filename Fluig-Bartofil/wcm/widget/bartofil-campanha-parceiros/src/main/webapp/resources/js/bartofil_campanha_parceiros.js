var campanhaparceiros = SuperWidget.extend({
	
	loading: FLUIGC.loading(window),
	offset: 0,
	limit: 8,
	list: [],
	instanceId: null,
	representante: null,
	grouprca: null,
	context: "/bartofil_campanha_parceiros",
	current: null,
	
	init : function() {
		$(".pageTitle").parent().remove();
		
		var tpl = $('.tpl-avatar').html();
		var data = { "userCode": WCMAPI.userCode };
		var html = Mustache.render(tpl, data);
		$('.user-avatar').append(html);
		
		campanhaparceiros.loading.show();
		campanhaparceiros.representate = WCMAPI.userLogin;
		
		if (this.isrca() == false) {
			this.showrepresentative();
		} else {
			this.getranking();
		}		
		
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado": ['click_showdetalhado'],
			'change-paginacao': ['change_changepaginacao'],
			"change-representante": ['change_getranking'],
			'change-ordenar': ['change_changeordenacao'],
		}
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
			
			campanhaparceiros.getranking();
		} else {
			campanhaparceiros.getranking();
		}
		
	},
	
	
	listcampanha: function(el, ev) {
		campanhaparceiros.loading.show();
		campanhaparceiros.representante = $('#listrepresentatives').val();
		campanhaparceiros.list = [];
		campanhaparceiros.offset = 0;
		campanhaparceiros.limit = parseInt($("#paginacao").val());
		campanhaparceiros.getranking();
	},
	
	getranking: function() {
		var c1 = DatasetFactory.createConstraint("representante", campanhaparceiros.representante, campanhaparceiros.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "1", "1", ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3], null, {"success": campanhaparceiros.onreadygetranking} );
		
	},
	
	onreadygetranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhaparceiros.loading.hide();
			WCMC.messageError('Campanhas de Parceiros 100% não possui ranking!');	    			
			return;
		}
		
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			campanhaparceiros.loading.hide();
			WCMC.messageError('Campanhas de Parceiros 100% não possui ranking!');	    			
			return;
		}
		
		var row = values[0];
		campanhaparceiros.current = row;
		
		var v = "";
		try {
			v = parseFloat(row["vlrpremio"]);
			rowclass = "success";
			if (isNaN(v)) {
				v = row["vlrpremio"];
			} else if (v > 0) {
				v = campanhaparceiros.mask(v.toFixed(2));
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
		
		campanhaparceiros.loading.hide();
	
	},
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
});
