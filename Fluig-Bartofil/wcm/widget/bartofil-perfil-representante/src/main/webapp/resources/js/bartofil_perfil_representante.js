var perfilrepresentante = SuperWidget.extend({
	loading: FLUIGC.loading(window),
	offset: 0,
	limit: 30,
	list: [],
	instanceId: null,
	representante: null,
	grouprca: null,
	context: "/bartofil_perfil_representante",
	current: null,
	mydivision: "1",
	trimestre: null,
	equipesuperior: null,
	
	init : function() {
		perfilrepresentante.loading.show();
		perfilrepresentante.grouprca = this.grouprca;
		
		if (this.isrca() == false) {
			this.showrepresentative();
		} else {
			this.setupperiodo();
			this.getRepresentante();
		}
	},

	bindings : {
		local : {},
		global : {
			'save-preferences': ['click_savePreferences'],
			"click-widget": ['click_widget'],
		}
	},
	
	widget: function(el, ev) {
		$(".btn-info").removeClass("active");
		$(el).addClass("active");
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
	
	changerepresentante: function () {
		perfilrepresentante.loading.show();
		perfilrepresentante.representante = $('#listrepresentatives').val();
		perfilrepresentante.list = [];
		perfilrepresentante.offset = 0;
		$(".tab-detalhamento").html("");
		perfilrepresentante.current = null;
		perfilrepresentante.limit = parseInt($("#paginacao").val());
		perfilrepresentante.getranking();
		
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
		if (values[0].apelido == "erro") {
			perfilrepresentante.loading.hide();
			return;
		}
		
		var row = values[0];

		var tpl = $('.tpl-avatar').html();
		var data = { "userCode": perfilrepresentante.representante, "image": row["foto"] };
		var html = Mustache.render(tpl, data);
		$('.user-avatar').html(html);
		
		
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
	
	changetrimestre: function(el ,ev) {
		perfilrepresentante.loading.show();
		perfilrepresentante.trimestre = $(el).val();
		perfilrepresentante.list = [];
		perfilrepresentante.offset = 0;
		perfilrepresentante.limit = parseInt($("#paginacao").val());
		perfilrepresentante.getfullranking();		
	},
	showtab: function(el, ev) {
		$(el).parent().find("li").removeClass("active")
		$(el).addClass("active");
		$(".tab-colocacao").addClass("fs-display-none");
		$(".tab-detalhamento").addClass("fs-display-none");
		$("." + $(el).data("tab")).removeClass("fs-display-none");
	},
	
	isrca: function() {
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", this.grouprca, this.grouprca, ConstraintType.MUST, false);

		var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1, c2], null);
		if (dataset && dataset.values && dataset.values.length > 0) { return true; }
		
		return false;
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
			
			perfilrepresentante.getranking();
			perfilrepresentante.getfoto();
		} else {
			perfilrepresentante.getranking();
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
