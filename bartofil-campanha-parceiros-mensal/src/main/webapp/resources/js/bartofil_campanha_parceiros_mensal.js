var campanhaparceirosmensal = SuperWidget.extend({
	
	loading: FLUIGC.loading('.widget-parceiros-mensal'),
	offset: 0,
	limit: 8,
	list: [],
	instanceId: null,
	foldercampanha: null,
	code: "bartofil_campanha_vendas_mensal",
	current: null,
	grouprca: null,
	representante: null,
	isLoaded: false,
	
	init : function() {
		$(".pageTitle").parent().remove();
		
		campanhaparceirosmensal.foldercampanha = this.foldercampanha;
		campanhaparceirosmensal.grouprca = perfilrepresentante.grouprca;
		campanhaparceirosmensal.representante = perfilrepresentante.representante;
		
		$(window).on("scroll", function() {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			    $(window).off("scroll");
			} else {
				if ($(".premiados-mensal").hasClass("fs-display-none")) {
					campanhaparceirosmensal.loading.show();
					campanhaparceirosmensal.offset = campanhaparceirosmensal.limit;
					campanhaparceirosmensal.limit = campanhaparceirosmensal.limit + 8;
					campanhaparceirosmensal.showcampanhas(false);	
				}
			}
		});
		
		$("#busca-concurso-mensal").keyup(function() {
			campanhaparceirosmensal.showcampanhas(true);
		});
	},

	bindings : {
		local : {},
		global : {
			"click-campanha-mensal": ['click_clickcampanha'],
			'save-preferences-camp-mensal': ['click_savePreferences'],
			"click-fechar-mensal": ['click_clickfechar'],
			"image-prev-mensal": ['click_clickprevimage'],
			"image-nex-mensalt": ['click_clicknextimage'],
			"change-representante": ['change_listcampanha'],
			'change-ordenar-mensal': ['change_changeordenacao'],
			'click-detail-mensal': ['click_showdetail'],
			'change-periodo': ['change_changePeriodo'],
		}
	},
	onShowWidget: function() {
		if (!campanhaparceirosmensal.isLoaded) {
			campanhaparceirosmensal.loading.show();
			campanhaparceirosmensal.isLoaded = true;
			campanhaparceirosmensal.getcampanha();
		}
	},
	changePeriodo: function(el ,ev) {
		campanhaparceirosmensal.list = [];
		campanhaparceirosmensal.isLoaded = false;
		eval(perfilrepresentante.currentWidget)();
	},
	
	listcampanha: function(el, ev) {
		$(".premiados-mensal").addClass("fs-display-none");
		$(".itens-campanha-mensal").removeClass("fs-display-none");
		$(".header-itens-campanha-mensal").removeClass("fs-display-none");
		campanhaparceirosmensal.representante = $('#listrepresentatives').val();
		campanhaparceirosmensal.list = [];
		campanhaparceirosmensal.offset = 0;
		campanhaparceirosmensal.current = null;
		campanhaparceirosmensal.limit = 99999;
		campanhaparceirosmensal.isLoaded = false;
		eval(perfilrepresentante.currentWidget)();
	},

	showdetail: function (el, ev) {
		campanhaparceirosmensal.loading.show();
		
		var c1 = DatasetFactory.createConstraint("campanha", campanhaparceirosmensal.current["id"], campanhaparceirosmensal.current["id"], ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("representante", campanhaparceirosmensal.representante, campanhaparceirosmensal.representante, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_participante", null, [c1, c2, c3, c4], null, {"success": campanhaparceirosmensal.onreadyshowdetail} );
		
	},
	
	onreadyshowdetail: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhaparceirosmensal.loading.hide();
			WCMC.messageError('Campanhas de vendas não possui detalhes do representante!');	    			
			return;
		}
		
		console.log("onreadyshowdetail");
		
		var list = rows.values;
		for (var i=0; i< list.length; i++) {
			var row = list[i];
			for (var o in row) {
				if (row[o] == null) {
					row[o] = "";
				}
			}
			list[i] = row;
		}
		
		var params = { "values": list }

		$(".modal").remove();
		WCMAPI.convertFtlAsync(campanhaparceirosmensal.code, 'detalhe.ftl', { "params": params },
				function (data) {
				   FLUIGC.modal({
					    title: 'Detalhes do Campanha',
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
					campanhaparceirosmensal.loading.hide();
			   },
			   function(err) { }
	  );		
		
				
		
	},
	
	changeordenacao: function(el, ev) {
		campanhaparceirosmensal.loading.show();
		campanhaparceirosmensal.offset = 0;
		campanhaparceirosmensal.limit = parseInt($(el).val());
		campanhaparceirosmensal.showcampanhas(true);		
	},
	
	clickprevimage: function(el ,ev) {
		var keys = Object.keys(campanhaparceirosmensal.current["listaimagens"]);
		var image = $(".image-detail-mensal").data("current");

		var prev = keys.indexOf(image) - 1;
		if (prev < 0) { prev = keys.length  - 1; }
		var o = campanhaparceirosmensal.current["listaimagens"][keys[prev]];
		if (o == null) {
			campanhaparceirosmensal.geturlfromfluig(null, keys[prev], campanhaparceirosmensal.onreadyloadimage);
		} else {
			$(".image-detail-mensal").data("current", keys[prev]);
			$(".image-detail-mensal").attr("src", o);
		}
	},
	
	onreadyloadimage: function(data) {
		campanhaparceirosmensal.current["listaimagens"][data["doc"]] = data["content"]; 
		$(".image-detail-mensal").data("current", data["doc"]);
		$(".image-detail-mensal").attr("src", data["content"]);
	},
	
	clicknextimage: function(el ,ev) {
		console.log("clicknextimage")
		var keys = Object.keys(campanhaparceirosmensal.current["listaimagens"]);
		var image = $(".image-detail-mensal").data("current");

		var next = keys.indexOf(image) + 1;
		if (next >= keys.length) { next = 0; }
		var o = campanhaparceirosmensal.current["listaimagens"][keys[next]];
		if (o == null) {
			campanhaparceirosmensal.geturlfromfluig(null, keys[next], campanhaparceirosmensal.onreadyloadimage);
		} else {
			$(".image-detail-mensal").data("current", keys[next]);
			$(".image-detail-mensal").attr("src", o);
		}
	},
	
	getcampanhabyid: function(id) {
		for (var i=0; i<campanhaparceirosmensal.list.length; i++) {
			var c = campanhaparceirosmensal.list[i];
			if (c["id"] == id) { return c; }
		}
		return null;
	},
	
	savePreferences: function(el, ev) {
		var args = {
			"foldercampanha": $('input[id="foldercampanha-mensal"]', this.DOM).val(),
			"grouprca": $('input[id="grouprca-mensal"]', this.DOM).val()
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
	
	clickcampanha: function(el, ev) {
		console.log("campanha");
		$(".premiados-mensal").removeClass("fs-display-none");
		$(".itens-campanha-mensal").addClass("fs-display-none")
		$(".header-itens-campanha-mensal").addClass("fs-display-none");
		console.log($(el).data("id"));
		
		$('#table-myranking-mensal > tbody').html("");
		$('#table-ranking-vendas-mensal > tbody').html("");
		$(".prev-image-mensal").hide();
		$(".next-image-mensal").hide();
		
		campanhaparceirosmensal.loading.show();
		
		campanhaparceirosmensal.current = campanhaparceirosmensal.getcampanhabyid($(el).data("id"));
		if (campanhaparceirosmensal.current["image"]) {
			$(".image-detail-mensal").attr("src", campanhaparceirosmensal.current["image"]);
			if (Object.keys(campanhaparceirosmensal.current["listaimagens"]).length > 1) {
				$(".prev-image-mensal").show();
				$(".next-imag-mensale").show();
				
				var list = campanhaparceirosmensal.current["listaimagens"];
				console.log(list);
				console.log(campanhaparceirosmensal.current["image"]);
				for (var o in list) {
					console.log(o, list[o])
					console.log(list[o] == campanhaparceirosmensal.current["image"])
					if (list[o] && list[o] == campanhaparceirosmensal.current["image"]) {
						console.log("set data")
						$(".image-detail-mensal").data("current", o);
					}
				}
				
			}
		} else {
			$(".image-detail-mensal").attr("src", "/" + campanhaparceirosmensal.code + "/resources/images/loading.gif");	
		}
		
		$(".title-detail-mensal").html("<b>" + campanhaparceirosmensal.current["id"] + " " + campanhaparceirosmensal.current["descricao"] + "</b> - DETALHES");
		
		var c1 = DatasetFactory.createConstraint("campanha", campanhaparceirosmensal.current["id"], campanhaparceirosmensal.current["id"], ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "1", "1", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("representante", campanhaparceirosmensal.representante, campanhaparceirosmensal.representante, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_detalhe", null, [c1, c2, c3, c4], null, {"success": campanhaparceirosmensal.onreadygetmyranking} );
		
	},
	
	onreadygetcampanhadetalhe: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhaparceirosmensal.loading.hide();
			WCMC.messageError('Campanhas de vendas não possui detalhes!');	    			
			return;
		}
		
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			campanhaparceirosmensal.loading.hide();
			WCMC.messageError('Campanhas de vendas não possui detalhes!');	    			
			return;
		}
		
		var items = [];
		
		for (var i = 0; i<values.length; i++) {
			var row = values[i];
			
			var v = "";
			var codigo = row["codparticipante"];
			try {
				v = parseFloat(row["vlrpremio"]);
				if (v > 0) {
					v = campanhaparceirosmensal.mask(v.toFixed(2));
					v = "R$ " + v;
				} else {
					v = "";
				}
			} catch (e) {
				v = row["vlrpremio"];
			}
			
			var p = "";
			try {
				p = parseFloat(row["pontos"]);
				if (p > 0) {
					p = campanhaparceirosmensal.mask(p.toFixed(2));
				} else {
					p = "";
				}
			} catch (e) {
				p = row["pontos"];
			}

			var premiado = "";
			if (row["situacao"] && row["situacao"].toLowerCase() == "premiado") {
				premiado = 'success';
				//codigo += "&nbsp;<span class='fluigicon fluigicon-certificate fluigicon-sm'></span>";
			} 
			if (campanhaparceirosmensal.representante == row["codparticipante"]) {
				premiado = "info";
			}
			
			var o = {
				"premiado": premiado,
				"situacao": row["situacao"],
				"grupo": row["codgrupo"],
				"posicao": row["ordempremio"],
				"rca": codigo,
				"pontos": p,
				"premio": v,
				"equipe": row["descequipe"] 
			}
			
			items.push(o);
			
			console.log(row);
		}
		
		var tpl = $('.tpl-item-ranking-vendas-mensal').html();
		var data = { "items": items };
		var html = Mustache.render(tpl, data);
		
		$('#table-ranking-vendas-mensal > tbody').html(html);
		
		campanhaparceirosmensal.loading.hide();
		
	},
	
	onreadygetmyranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhaparceirosmensal.loading.hide();
			htmlmyrank = "<tr><td class='fs-txt-center' colspan='8'>Sem pontuação nessa campanha</td></tr>";
			$('#table-myranking-mensal > tbody').html(htmlmyrank);
			return;
		}
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			campanhaparceirosmensal.loading.hide();
			htmlmyrank = "<tr><td class='fs-txt-center' colspan='8'>Sem pontuação nessa campanha</td></tr>";
			$('#table-myranking-mensal > tbody').html(htmlmyrank);
			return;
		}
		
		var row = values[0];
		var v = "";
		try {
			v = parseFloat(row["vlrpremio"]);
			if (v > 0) {
				v = campanhaparceirosmensal.mask(v.toFixed(2));
				v = "R$ " + v;
			} else {
				v = "";
			}
		} catch (e) {
			v = row["vlrpremio"];
		}
		
		var p = "";
		try {
			p = parseFloat(row["pontos"]);
			if (p > 0) {
				p = campanhaparceirosmensal.mask(p.toFixed(2));
			} else {
				p = "";
			}
		} catch (e) {
			p = row["pontos"];
		}
		
		var situacao = (row["situacao"] ? row["situacao"] : "");
		
		var htmlmyrank = "<tr data-click-detail class='fs-cursor-pointer " + (situacao.toLowerCase() == "premiado" ? "success" : "") + "'><td class='fs-txt-left'>" + situacao + "</td><td class='fs-txt-right'>" + row["codgrupo"] + "</td><td class='fs-txt-right'>" + row["ordempremio"] + "</td><td class='fs-txt-right'>" + row["codparticipante"] + "</td><td class='fs-txt-right'>" + p + "</td><td class='fs-txt-right'>" + v + "</td><td>" + row["descequipe"] + "</td><td><span class='fluigicon fluigicon-th'></span></td></tr>";
		$('#table-myranking-mensal > tbody').html(htmlmyrank);
		
		var c1 = DatasetFactory.createConstraint("campanha", campanhaparceirosmensal.current["id"], campanhaparceirosmensal.current["id"], ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "50", "50", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("grupo", row["codgrupo"], row["codgrupo"], ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_detalhe", null, [c1, c2, c3, c4], null, {"success": campanhaparceirosmensal.onreadygetcampanhadetalhe} );
		
	},
	
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
	
	clickfechar: function(el, ev) {
		$(".premiados-mensal").addClass("fs-display-none");
		$(".itens-campanha-mensal").removeClass("fs-display-none");
		$(".header-itens-campanha-mensal").removeClass("fs-display-none");
	},
	
	getcampanha: function() {
		var limit = 99999;
		
		var mes = $("#periodo :selected").data("month");
		var ano = $("#periodo :selected").data("year");
		
		var c1 = DatasetFactory.createConstraint("representante", campanhaparceirosmensal.representante, campanhaparceirosmensal.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("tipcampanha", "S", "S", ConstraintType.MUST, false);
		var c5 = DatasetFactory.createConstraint("anomes", ano + "" + mes, ano + "" + mes, ConstraintType.MUST, false);
		
		DatasetFactory.getDataset("ds_campanha_vendas", null, [c1, c2, c3, c4, c5], null, {"success": campanhaparceirosmensal.onreadygetcampanha} );
		
	},
	
	onreadygetcampanha: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhaparceirosmensal.loading.hide();
			WCMC.messageError('Representante não possui campanhas de vendas!');	    			
			return;
		}
		var values = rows["values"];
		console.log(values.length)
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			var dtainicio = moment(row["dtainicio"]);
			var dtaprorrogado = moment(row["dtaprorrogada"]);
			var dtaencerrado = moment(row["dtaencerramento"]);
			var ordem = row["ordempremio"].split("/");
			console.log("ordem", ordem, row["ordempremio"]);
			if (ordem.length == 2) {
				ordem = "Posi&ccedil;&atilde;o <strong>" + ordem[0] + "" + (row["sitpremiado"] == "Premiado" ? '<span class="fluigicon fluigicon-certificate"></span>' : '') + "</strong> de <strong>" + ordem[1] + "</strong>";
			} else {
				ordem = row["ordempremio"];
			}
			var classbutton = "";
			if (row["sitpremiado"] == "Premiado") {
				classbutton = "btn-success";
			}
			var classlabel = "label-info";
			var labelfim = "Encerra em " + dtaencerrado.format("DD/MM/YYYY");
			if (row["status"] == "E") {
				classlabel = "label-danger";
				labelfim = "Encerrada em " + dtaencerrado.format("DD/MM/YYYY");
			} else if (row["status"] == "P") {
				classlabel = "label-warning";
				labelfim = "Prorrogada até " + dtaprorrogado.format("DD/MM/YYYY");
			}
			
			var o = {
				"id": row["codcampanha"],
				"descricao": row["desccampanha"],
				"dainiciado": dtainicio.format("DD/MM/YYYY"),
				"dtaprorrogado": moment(row["dtaprorrogada"]),
				"dtaencerrado": moment(row["dtaencerramento"]),
				"dtainicio": moment(row["dtainicio"]),
				"posicao": ordem,
				"image": null,
				"classbutton": classbutton,
				"classlabel": classlabel,
				"labelfim": labelfim, 
				"listaimagens": {}				
			}
			campanhaparceirosmensal.list.push(o);
		}
		
		campanhaparceirosmensal.getdocuments();
		
//		campanhaparceirosmensal.showcampanhas();
		
	},
	
	getdocuments: function() {
		
		var c1 = DatasetFactory.createConstraint("pasta", campanhaparceirosmensal.foldercampanha, campanhaparceirosmensal.foldercampanha, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("empresa", WCMAPI.tenantCode, WCMAPI.tenantCode, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_lista_campanha_imagem", null, [c1, c2], null, {"success": campanhaparceirosmensal.onreadygetdocuments} );
		
	},
	
	onreadygetdocuments: function (rows) {

		var docs = [];
		if (rows && rows["values"] && rows["values"].length > 0) {
			docs = rows["values"];
		}
		
		for (var i=0; i<campanhaparceirosmensal.list.length; i++) {
			var c = campanhaparceirosmensal.list[i];
			var images = {};
			for (var x=0; x<docs.length; x++) {
				var row = docs[x];
				if (row["campanha"] == c["id"]) {
					images[row["numero"]] = null;
					if (row["descricao"] == c["id"]) {
						c["toloading"] = row["numero"]; 
						c["image"] = "/" + campanhaparceirosmensal.code + "/resources/images/loading.gif";
					}
				}
			}
			
			c["listaimagens"] = images; 
			
			if (c["image"] == null && $.isEmptyObject(images) == false) { 
				c["toloading"] = Object.keys(images)[0]; 
				c["image"] = "/" + campanhaparceirosmensal.code + "/resources/images/loading.gif";
			} else if (c["toloading"] == null) {  
				c["image"] = "/" + campanhaparceirosmensal.code + "/resources/images/no-img.png"; 
			}
			
			campanhaparceirosmensal.list[i] = c;
		}
		
		campanhaparceirosmensal.showcampanhas(true);
		
	},
	
	showcampanhas: function(clean) {
		var control = 0;
		var lines = 0;
		var items = [];
		
		if ($(".premiados-mensal").hasClass("fs-display-none") == false) {
			return;
		}
		
		console.log("showcampanhas", campanhaparceirosmensal.offset, campanhaparceirosmensal.limit);
		
		if (clean) {
			$(".itens-campanha-mensal").remove();
			campanhaparceirosmensal.offset = 0;
			campanhaparceirosmensal.limit = 99999;
		}
		
		var filter = campanhaparceirosmensal.list;
		var search = $("#busca-concurso-mensal").val(); 
		if (search && search != "") {
			filter = campanhaparceirosmensal.list.filter(function(item) {
				return item["descricao"].toLowerCase().indexOf(search) != -1 || item["id"].toLowerCase().indexOf(search) != -1;
			})
		}
		
		
		filter.sort(function compare(a, b) {
			
			var c1 = a[$("#ordenar-mensal").val()];
			var c2 = b[$("#ordenar-mensal").val()];
			var type = $("#ordenar-mensal :selected").data("type");
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

		for (var i=campanhaparceirosmensal.offset; i<campanhaparceirosmensal.limit; i++) {
			var o = filter[i];
			if (o) {
				control++;
				items.push(o);
				if (control == 4) {
					var tpl = $('.tpl-continuous-scroll-campanhas-mensal').html();
					var data = { "items": items};
					var html = Mustache.render(tpl, data);
					$('.widget-parceiros-mensal').append(html);
					
					control = 0;
					lines++;
					items = [];
				}
				
			}
		}		
		
		if (items.length > 0) {
			var tpl = $('.tpl-continuous-scroll-campanhas-mensal').html();
			var data = { "items": items};
			var html = Mustache.render(tpl, data);
			$('.widget-parceiros-mensal').append(html);
		}
		campanhaparceirosmensal.geturlfromfluig(0, null, null);
		campanhaparceirosmensal.loading.hide();
	},
	
	geturlfromfluig: function(index, doc, onready){
		if (index != null) {
			if (index < campanhaparceirosmensal.list.length) {
				var c = campanhaparceirosmensal.list[index];
				if (c["toloading"]) {
					$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + c["toloading"]).done(function(data) {
					    $("#img" + c["id"]).attr("src", data.content);
					    c["listaimagens"][c["toloading"]] = data.content; 
					    c["toloading"] = null;
					    c["image"] = data.content;
					    campanhaparceirosmensal.list[index] = c;
					}).fail(function() {
					    $("#img" + c["id"]).attr("src", "/" + campanhaparceirosmensal.code + "/resources/images/no-img.png");
					}).complete(function() {
						index++;
						campanhaparceirosmensal.geturlfromfluig(index);
					});
				} else {
					index++;
					campanhaparceirosmensal.geturlfromfluig(index);
				}
			}
		} else if (doc != null) {
			$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + doc).done(function(data) {
				onready({ "doc": doc, "content": data.content}); 
			}).fail(function() {
				onready({ "doc": doc, "content": "/" + campanhaparceirosmensal.code + "/resources/images/no-img.png"});
			});
		} 
	}
});

