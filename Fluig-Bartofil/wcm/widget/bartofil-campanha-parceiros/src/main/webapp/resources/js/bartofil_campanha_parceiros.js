var campanhaparceiros = SuperWidget.extend({
	
	loading: FLUIGC.loading('.widget-parceiros'),
	offset: 0,
	limit: 30,
	list: [],
	instanceId: null,
	representante: null,
	grouprca: null,
	context: "/bartofil_campanha_parceiros",
	current: null,
	mygroup: "1",
	trimestre: null,
	equipesuperior: null,
	isLoaded: false,
	
	init : function() {
		$(".pageTitle").parent().remove();
		
		$(window).onScrollEnd(function() {
			if ($(".tab-detalhamento").hasClass("fs-display-none")) {
				campanhaparceiros.loading.show();
				campanhaparceiros.offset = campanhaparceiros.limit;
				campanhaparceiros.limit = campanhaparceiros.limit + 30;
				campanhaparceiros.showranking(false);	
			}
		});
		
		$("#busca").keyup(function() {
			campanhaparceiros.showranking(true);
		});
		
		campanhaparceiros.loading.show();
		campanhaparceiros.representante = perfilrepresentante.representante;
		campanhaparceiros.grouprca = perfilrepresentante.grouprca;
		
		var list = []; 
		var today = moment(new Date());
		trimestre = "0" + today.quarter();
		$('#trimestre').append(trimestre);
		campanhaparceiros.trimestre = trimestre;
		
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado-parceiro": ['click_showdetalhado'],
			"change-representante": ['change_changerepresentante'],
			'change-periodo': ['change_changePeriodo'],
			'save-preferences-parceiro': ['click_savePreferences'],
			'click-tab-parceiro': ['click_showtab'],
			'change-trimestre-parceiro': ['change_changetrimestre'],
			'click-minha-colocacao': ['click_myPosition'],
		}
	},
	
	onShowWidget: function() {
		if (!campanhaparceiros.isLoaded) {
			campanhaparceiros.loading.show();
			campanhaparceiros.isLoaded = true;
			campanhaparceiros.getranking();
			
		}
	},
	
	changerepresentante: function () {
		campanhaparceiros.loading.show();
		campanhaparceiros.representante = perfilrepresentante.representante;
		campanhaparceiros.list = [];
		campanhaparceiros.offset = 0;
		$(".tab-detalhamento").html("");
		campanhaparceiros.current = null;
		campanhaparceiros.limit = 99999;
		
		campanhaparceiros.isLoaded = false;
		eval(perfilrepresentante.currentWidget)();
		
	},
	
	changePeriodo: function(el ,ev) {
		if ($("option:selected", el).hasClass("widget-extrato") == false) {
			campanhaparceiros.loading.show();
			campanhaparceiros.representante = perfilrepresentante.representante;
			campanhaparceiros.list = [];
			campanhaparceiros.offset = 0;
			$(".tab-detalhamento").html("");
			campanhaparceiros.current = null;
			campanhaparceiros.trimestre = $("#trimestre").val();
			campanhaparceiros.limit = 99999;
			campanhaparceiros.isLoaded = false;
			eval(perfilrepresentante.currentWidget)();
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
				WCMC.messageInfo('Preferencias salvas com sucesso!');	    			
		    },
		    fail: function (xhr, message, errorData) {
		    	console.log("UPDATEPREFERENCES fail", xhr, message, errorData);
		    }
		}, this.instanceId, args );
	},	
	
	changetrimestre: function(el ,ev) {
		campanhaparceiros.loading.show();
		campanhaparceiros.trimestre = $(el).val();
		campanhaparceiros.list = [];
		campanhaparceiros.offset = 0;
		campanhaparceiros.limit = 99999;
		campanhaparceiros.getfullranking();		
		campanhaparceiros.getdetalhamentos();		
	},
	showtab: function(el, ev) {
		$(el).parent().find("li").removeClass("active")
		$(el).addClass("active");
		$(".tab-colocacao").addClass("fs-display-none");
		$(".tab-detalhamento").addClass("fs-display-none");
		$("." + $(el).data("tab")).removeClass("fs-display-none");
	},
	
	listcampanha: function(el, ev) {
		campanhaparceiros.loading.show();
		campanhaparceiros.representante = $('#listrepresentatives').val();
		$('.tab-detalhamento').html("");
		campanhaparceiros.list = [];
		campanhaparceiros.offset = 0;
		campanhaparceiros.limit = 99999;
		campanhaparceiros.getranking();
	},
	
	getranking: function() {
		var c1 = DatasetFactory.createConstraint("representante", campanhaparceiros.representante, campanhaparceiros.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "1", "1", ConstraintType.MUST, false);
		var ano = $("#periodo :selected").data("year");
		var c4 = DatasetFactory.createConstraint("periodo", ano  + campanhaparceiros.trimestre, ano + campanhaparceiros.trimestre, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3, c4], null, {"success": campanhaparceiros.onreadygetranking} );
		
	},
	
	onreadygetranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			$('#table-ranking > tbody').html("");
			$(".tab-detalhamento").html("");
			
			campanhaparceiros.loading.hide();
			return;
		}
		
		var values = rows["values"];
		if (values[0].apelido == "erro") {
			$('#table-ranking > tbody').html("");
			$(".tab-detalhamento").html("");
			
			campanhaparceiros.loading.hide();
			return;
		}
		
		var row = values[0];
		
		var data = {
			"ordem": row["ordem"],
			"premiacao": row["vlrpremio"],
			"data": row["dataprocessamento"],
			"pontos": campanhaparceiros.mask((+row["pontos"]).toFixed(2)),
			"grupo": row["descgrupo"]
		}
		
		var tpl = $('.tpl-my-ranking').html();
		var html = Mustache.render(tpl, data);
		$('.list-group-item-text').html(html);
		
		if (row["nrorepresentante"] == campanhaparceiros.representante) {
			campanhaparceiros.current = row;
			
			campanhaparceiros.mygroup = row["grupo"];
			campanhaparceiros.equipesuperior = row["nroequipesuperior"];
			
			campanhaparceiros.getdetalhamentos();
			campanhaparceiros.getfullranking();
			
		} else {
			campanhaparceiros.current = null;
			campanhaparceiros.mygroup = null;
			campanhaparceiros.equipesuperior = null;
			
			$('#table-ranking > tbody').html("");
			$(".tab-detalhamento").html("");
			
			campanhaparceiros.loading.hide();
			
		}
		
		
	},
	
	getfullranking: function() {
		
		var c1 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("limit", "9999", "9999", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("grupo", campanhaparceiros.mygroup, campanhaparceiros.mygroup, ConstraintType.MUST, false);
		
		var ano = $("#periodo :selected").data("year");
		
		var c4 = DatasetFactory.createConstraint("periodo", ano + campanhaparceiros.trimestre, ano + campanhaparceiros.trimestre, ConstraintType.MUST, false);
		var c5 = DatasetFactory.createConstraint("equipesuperior", campanhaparceiros.equipesuperior, campanhaparceiros.equipesuperior, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3, c4, c5], null, {"success": campanhaparceiros.onreadygetfullranking} );
		
	},
	
	onreadygetfullranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			$('#table-ranking > tbody').html("");
			$(".tab-detalhamento").html("");
			
			campanhaparceiros.loading.hide();
			return;
		}
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			$('#table-ranking > tbody').html("");
			$(".tab-detalhamento").html("");
			
			campanhaparceiros.loading.hide();
			return;
		}
		
		var htmlrank = "";
		for (var i = 0; i<values.length; i++) {
			var row = values[i];
			
			var premiado = "";
			var codigo = row["nrorepresentante"];
			var v = "";
			try {
				v = parseFloat(row["vlrpremio"]);
				rowclass = "success";
				if (isNaN(v)) {
					v = row["vlrpremio"];
				} else if (v > 0) {
					premiado = "success";
					codigo += "&nbsp;<span class='fluigicon fluigicon-certificate fluigicon-sm'></span>";
					v = campanhaparceiros.mask(v.toFixed(2));
					v = "R$ " + v;
				} else {
					v = "";
				}
			} catch (e) {
				v = row["vlrpremio"];
			}
			
			if (row["nrorepresentante"] == campanhaparceiros.representante) {
				premiado = "info";
			}
			
			var o = {
				"codigo": codigo,
				"nome": row["apelido"],
				"pontos": campanhaparceiros.mask((+row["pontos"]).toFixed(2)),
				"ordem": row["ordem"],
				"premio": v,
				"equipe": row["descequipe"],
				"trimestre": row["trimestre"],
				"grupo": row["grupo"],
				"premiado": premiado
				
			}
			
			campanhaparceiros.list.push(o);
		}
		
		campanhaparceiros.showranking(true);
		
	},
	
	showranking: function(clean) {
		var htmlrank = "";
		
		if (clean) {
			$('#table-ranking > tbody').html("");
			campanhaparceiros.offset = 0;
			campanhaparceiros.limit = 99999;
		}

		var filter = campanhaparceiros.list;
		var search = $("#busca").val(); 
		if (search && search != "") {
			filter = campanhaparceiros.list.filter(function(item) {
				return item["codigo"].toLowerCase().indexOf(search) != -1;
			})
		}
		
		filter.sort(function compare(a, b) {
			var c1 = a["ordem"];
			var c2 = b["ordem"];
			return +(c1) - +(c2);
		});
		
		var mylist = [];
		
		for (var i = campanhaparceiros.offset; i<campanhaparceiros.limit; i++) {
			var o = filter[i];
			if (o && +(o["trimestre"]) == +($("#trimestre").val()) && o["grupo"] == campanhaparceiros.mygroup) {
				mylist.push(o);
			}
		}
		
		var tpl = $('.tpl-item-ranking').html();
		var data = { "items": mylist };
		var html = Mustache.render(tpl, data);
		$('#table-ranking > tbody').append(html);

		campanhaparceiros.loading.hide();
	},
	
	getdetalhamentos: function() {
		
		FLUIGC.loading(".tab-detalhamento").show();
		
		var c1 = DatasetFactory.createConstraint("representante", campanhaparceiros.representante, campanhaparceiros.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);
		var ano = $("#periodo :selected").data("year");
		var c4 = DatasetFactory.createConstraint("periodo", ano + campanhaparceiros.trimestre, ano + campanhaparceiros.trimestre, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_detalhe", null, [c1, c2, c3, c4], null, {"success": campanhaparceiros.onreadygetdetalhamentos} );
		
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
					"pontosapurados": +(row["pontosapurados"]),
					"pontos": +(row["pontos"]),
					"cobranca": row["cobranca"] + "%",
					"detalhe": row["detalhe"] 
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
						"cobranca": row["cobranca"] + "%",
						"detalhe": row["detalhe"], 
						"pontosapurados": +(row["pontosapurados"]) 
					}]
				}
			}
		}
		
		console.log(items);
		$(".tab-detalhamento").html("");
		
		for (var key in items) {
			var o = items[key];
			var tpl = $('.tpl-detalhamento').html();
			
			var classbadge = "badge-default";
			if (o["pontos"] > 0) {
				classbadge = "badge-success";
			} else if (o["pontos"] < 0) {
				classbadge = "badge-danger";
			}
			
			var data = { "items": o["items"], "quesito": o["quesito"], "id": o["id"], "hashid": o["hashid"], "total": campanhaparceiros.mask(o["pontos"].toFixed(2)), "classbadge": classbadge };
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
	
	myPosition: function(el, ev) {
		$("#table-ranking tr").each(function(index) {
			if (index !== 0) {
				var row = $(this);
				var id = row.find("td:nth-child(1)").text();
				if (id == campanhaparceiros.representante) {
					var rowpos = row.position();
					$(document).scrollTop(rowpos.top);					
	            }
	        }
	    });		
	},
});
