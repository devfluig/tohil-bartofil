var campanhaparceirosanual = SuperWidget.extend({
	loading: FLUIGC.loading(".widget-parceiros-anual"),
	offset: 0,
	limit: 30,
	list: [],
	instanceId: null,
	representante: null,
	context: "/bartofil_campanha_parceiros_anual",
	current: null,
	mygroup: "1",
	trimestre: null,
	equipesuperior: null,
	codcampanha: null,
	isLoaded: false,
	init : function() {
		$(".pageTitle").parent().remove();
		
		$(window).on("scroll", function() {
			console.log((window.innerHeight + window.scrollY) >= document.body.offsetHeight);
			var scrollHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop();
			if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
			    // when scroll to bottom of the page
			} else {
				if ($(".tab-detalhamento-anual").hasClass("fs-display-none")) {
					campanhaparceirosanual.loading.show();
					campanhaparceirosanual.offset = campanhaparceirosanual.limit;
					campanhaparceirosanual.limit = campanhaparceirosanual.limit + 30;
					campanhaparceirosanual.showranking(false);	
				}
			}
		});
		
		$("#busca-anual").keyup(function() {
			campanhaparceirosanual.showranking(true);
		});
		
		campanhaparceirosanual.loading.show();
		campanhaparceirosanual.representante = perfilrepresentante.representante;
		
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado-parceiro-anual": ['click_showdetalhado'],
			'change-paginacao-parceiro-anual': ['change_changepaginacao'],
			"change-representante": ['change_changerepresentante'],
			'change-ordenar-parceiro-anual': ['change_changeordenacao'],
			'click-tab-parceiro-anual': ['click_showtab'],
		}
	},
	
	onShowWidget: function() {
		if (!campanhaparceirosanual.isLoaded) {
			campanhaparceirosanual.loading.show();
			campanhaparceirosanual.isLoaded = true;
			campanhaparceirosanual.getranking();
			
		}
	},
	
	changerepresentante: function () {
		campanhaparceirosanual.representante = perfilrepresentante.representante;
		campanhaparceirosanual.list = [];
		campanhaparceirosanual.offset = 0;
		$(".tab-detalhamento-anual").html("");
		campanhaparceirosanual.current = null;
		campanhaparceirosanual.limit = parseInt($("#paginacao-anual").val());
		
		campanhaparceirosanual.isLoaded = false;
		eval(perfilrepresentante.currentWidget)();
		
	},
	
	changetrimestre: function(el ,ev) {
		campanhaparceirosanual.loading.show();
		campanhaparceirosanual.trimestre = $(el).val();
		campanhaparceirosanual.list = [];
		campanhaparceirosanual.offset = 0;
		campanhaparceirosanual.limit = parseInt($("#paginacao-anual").val());
		campanhaparceirosanual.getfullranking();		
	},
	showtab: function(el, ev) {
		$(el).parent().find("li").removeClass("active")
		$(el).addClass("active");
		$(".tab-colocacao-anual").addClass("fs-display-none");
		$(".tab-detalhamento-anual").addClass("fs-display-none");
		$("." + $(el).data("tab")).removeClass("fs-display-none");
	},
	
	changepaginacao: function(el, ev) {
		campanhaparceirosanual.loading.show();
		campanhaparceirosanual.offset = 0;
		campanhaparceirosanual.limit = parseInt($(el).val());
		campanhaparceirosanual.showranking(true);		
	},
	
	changeordenacao: function(el, ev) {
		campanhaparceirosanual.loading.show();
		campanhaparceirosanual.offset = 0;
		campanhaparceirosanual.limit = parseInt($(el).val());
		campanhaparceirosanual.showranking(true);		
	},
	
	listcampanha: function(el, ev) {
		campanhaparceirosanual.loading.show();
		campanhaparceirosanual.representante = perfilrepresentante.representante;
		$('.tab-detalhamento-anual').html("");
		campanhaparceirosanual.list = [];
		campanhaparceirosanual.offset = 0;
		campanhaparceirosanual.limit = parseInt($("#paginacao-anual").val());
		campanhaparceirosanual.getranking();
	},
	
	getranking: function() {
		var c1 = DatasetFactory.createConstraint("representante", campanhaparceirosanual.representante, campanhaparceirosanual.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "1", "1", ConstraintType.MUST, false);
		var ano = $("#periodo :selected").data("year");
		var c4 = DatasetFactory.createConstraint("periodo", ano + "99", ano + "99", ConstraintType.MUST, false);
		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3, c4], null, {"success": campanhaparceirosanual.onreadygetranking} );
	},
	
	onreadygetranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			$('#table-campanha-anual> tbody').html("");
			$(".tab-detalhamento-anual").html("");
			campanhaparceirosanual.loading.hide();
			return;
		}
		
		var values = rows["values"];
		if (values[0].apelido == "erro") {
			$('#table-campanha-anual > tbody').html("");
			$(".tab-detalhamento-anual").html("");
			campanhaparceirosanual.loading.hide();
			return;
		}
		
		var row = values[0];
		var m = moment(row["dtaprocessamento"])
		
		$("#ordem-premio-anual").val(row["ordem"]);
		$("#premiacao-anual").val(row["vlrpremio"]);
		$("#data-processamento-anual").val(m.format("DD/MM/YYYY"));
		$("#status-anual").val(campanhaparceirosanual.mask((+(row["pontos"])).toFixed(2)));
		$("#grupo-anual").val(row["descgrupo"]);
		
		campanhaparceirosanual.current = row;
		campanhaparceirosanual.mygroup = row["grupo"];
		campanhaparceirosanual.equipesuperior = row["nroequipesuperior"];

		campanhaparceirosanual.getfullranking();
		
	},
	
	getfullranking: function() {
		
		var c1 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("limit", "9999", "9999", ConstraintType.MUST, false);
		var ano = $("#periodo :selected").data("year");
		var c3 = DatasetFactory.createConstraint("periodo", ano + "99", ano + "99", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("grupo", campanhaparceirosanual.mygroup, campanhaparceirosanual.mygroup, ConstraintType.MUST, false);
		var c5 = DatasetFactory.createConstraint("equipesuperior", campanhaparceirosanual.equipesuperior, campanhaparceirosanual.equipesuperior, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_representante", null, [c1, c2, c3], null, {"success": campanhaparceirosanual.onreadygetfullranking} );
		
	},
	
	onreadygetfullranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhaparceirosanual.loading.hide();
			return;
		}
		var values = rows["values"];
		if (values[0].apelido == "erro") {
			campanhaparceirosanual.loading.hide();
			return;
		}
		
		for (var i = 0; i<values.length; i++) {
			var row = values[i];
			
			var premiado = "";
			var v = "Sem premia&ccedil;&atilde;o";
			var codigo = row["nrorepresentante"];
			try {
				v = parseFloat(row["vlrpremio"]);
				rowclass = "success";
				if (isNaN(v)) {
					v = row["vlrpremio"];
				} else if (v > 0) {
					premiado = "success";
					v = campanhaparceirosanual.mask(v.toFixed(2));
					codigo += "&nbsp;<span class='fluigicon fluigicon-certificate fluigicon-sm'></span>";
					v = "R$ " + v;
				} else {
					v = "Sem premia&ccedil;&atilde;o";
				}
			} catch (e) {
				v = "Sem premia&ccedil;&atilde;o";
			}
			
			if (row["nrorepresentante"] == campanhaparceiros.representante) {
				premiado = "info";
			}
			
			
			if (row["grupo"] == campanhaparceirosanual.mygroup) {
				if (v == "") v = "Sem premia&ccedil;&atilde;o";
				var o = {
					"codigo": codigo,
					"pontos": campanhaparceirosanual.mask((+row["pontos"]).toFixed(2)),
					"ordem": row["ordem"],
					"premio": v,
					"equipe": row["descequipe"],
					"codgrupo": row["grupo"],
					"premiado": premiado
					
				}
				
				campanhaparceirosanual.list.push(o);
			}
			
		}
		
		campanhaparceirosanual.showranking(true);
		
	},
	
	showranking: function(clean) {
		var htmlrank = "";
		
		if (clean) {
			$('#table-campanha-anual> tbody').html("");
			campanhaparceirosanual.offset = 0;
			campanhaparceirosanual.limit = parseInt($("#paginacao-anual").val());
		}

		var filter = campanhaparceirosanual.list;
		var search = $("#busca-anual").val(); 
		if (search && search != "") {
			filter = campanhaparceirosanual.list.filter(function(item) {
				return item["codigo"].toLowerCase().indexOf(search) != -1;
			})
		}
		
		filter.sort(function compare(a, b) {
			
			var c1 = a[$("#ordenar-anual").val()];
			var c2 = b[$("#ordenar-anual").val()];
			var type = $("#ordenar-anual :selected").data("type");
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
		
		for (var i = campanhaparceirosanual.offset; i<campanhaparceirosanual.limit; i++) {
			var o = filter[i];
			if (o) {
				mylist.push(o);
			}
		}
		
		
		var tpl = $('.tpl-item-campanha-anual').html();
		var data = { "items": mylist };
		var html = Mustache.render(tpl, data);
		$('#table-campanha-anual > tbody').append(html);
		
		campanhaparceirosanual.getdetalhamentos();

		campanhaparceirosanual.loading.hide();
	},
	
	getdetalhamentos: function() {
		
		FLUIGC.loading(".tab-detalhamento-anual").show();
		
		var c1 = DatasetFactory.createConstraint("representante", campanhaparceirosanual.representante, campanhaparceiros.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);
		var ano = $("#periodo :selected").data("year");
		var c4 = DatasetFactory.createConstraint("periodo", ano + "99", ano + "99", ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_parceiros_detalhe", null, [c1, c2, c3, c4], null, {"success": campanhaparceirosanual.onreadygetdetalhamentos} );
		
	},
	
	onreadygetdetalhamentos: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			FLUIGC.loading(".tab-detalhamento-anual").hide();
			$(".tab-detalhamento-anual").html('<p>Campanhas de Parceiros 100% não possui detalhamento!</p>');	    			
			return;
		}
		var values = rows["values"];
		if (values[0].apelido == "erro") {
			FLUIGC.loading(".tab-detalhamento-anual").hide();
			$(".tab-detalhamento-anual").html('<p>Campanhas de Parceiros 100% não possui detalhamento!</p>');	    			
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
					"pontosapurados": campanhaparceirosanual.mask((+(row["pontosapurados"])).toFixed(2)),
					"pontos": campanhaparceirosanual.mask((+(row["pontos"])).toFixed(2)),
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
						"pontosapurados": campanhaparceirosanual.mask((+(row["pontosapurados"])).toFixed(2)),
						"pontos": campanhaparceirosanual.mask((+(row["pontos"])).toFixed(2)),
						"cobranca": row["cobranca"] + "%",
						"detalhe": row["detalhe"] 
					}]
				}
			}
		}
		
		console.log(items);
		
		$('.tab-detalhamento-anual').html("");
		
		for (var key in items) {
			var o = items[key];
			var tpl = $('.tpl-detalhamento-anual').html();
			
			var classbadge = "badge-default";
			if (o["pontos"] > 0) {
				classbadge = "badge-success";
			} else if (o["pontos"] < 0) {
				classbadge = "badge-danger";
			}
			
			var data = { "items": o["items"], "quesito": o["quesito"], "id": o["id"], "hashid": o["hashid"], "total": campanhaparceirosanual.mask(o["pontos"].toFixed(2)), "classbadge": classbadge };
			var html = Mustache.render(tpl, data);
			$('.tab-detalhamento-anual').append(html);
		}
		
		FLUIGC.loading(".tab-detalhamento-anual").hide();
		
	},
	
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
});
