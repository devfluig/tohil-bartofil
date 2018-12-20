var campanhavendas = SuperWidget.extend({
	
	loading: FLUIGC.loading(window),
	offset: 0,
	limit: 8,
	list: [],
	instanceId: null,
	foldercampanha: null,
	code: "bartofil_campanha_vendas",
	current: null,
	grouprca: null,
	representante: null,
	
	init : function() {
		$(".pageTitle").parent().remove();
		
		campanhavendas.foldercampanha = this.foldercampanha;
		campanhavendas.grouprca = perfilrepresentante.grouprca;
		campanhavendas.current = perfilrepresentante.representante;
		
		campanhavendas.getcampanha();
		
		$(window).onScrollEnd(function() {
			if ($(".premiados").hasClass("fs-display-none")) {
				campanhavendas.loading.show();
				campanhavendas.offset = campanhavendas.limit;
				campanhavendas.limit = campanhavendas.limit + 8;
				campanhavendas.showcampanhas(false);	
			}
		});
		
		$("#busca").keyup(function() {
			campanhavendas.showcampanhas(true);
		});
	},

	bindings : {
		local : {},
		global : {
			"click-campanha": ['click_clickcampanha'],
			'save-preferences': ['click_savePreferences'],
			"click-fechar": ['click_clickfechar'],
			"image-prev": ['click_clickprevimage'],
			"image-next": ['click_clicknextimage'],
			'change-paginacao': ['change_changepaginacao'],
			"change-representante": ['change_listcampanha'],
			'change-ordenar': ['change_changeordenacao'],
			'click-detail': ['click_showdetail'],
		}
	},
	
	listcampanha: function(el, ev) {
		campanhavendas.loading.show();
		campanhavendas.representante = $('#listrepresentatives').val();
		campanhavendas.list = [];
		campanhavendas.offset = 0;
		campanhavendas.current = null;
		campanhavendas.limit = parseInt($("#paginacao").val());
		campanhavendas.getcampanha();
	},

	showdetail: function (el, ev) {
		campanhavendas.loading.show();
		
		var c1 = DatasetFactory.createConstraint("campanha", campanhavendas.current["id"], campanhavendas.current["id"], ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("representante", campanhavendas.representante, campanhavendas.representante, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_participante", null, [c1, c2, c3, c4], null, {"success": campanhavendas.onreadyshowdetail} );
		
	},
	
	onreadyshowdetail: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhavendas.loading.hide();
			WCMC.messageError('Campanhas de vendas não possui detalhes do representante!');	    			
			return;
		}
		
		console.log("onreadyshowdetail")
		
		var params = { "values": rows.values }
		
		WCMAPI.convertFtlAsync(campanhavendas.code, 'detalhe.ftl', { "params": params },
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
					campanhavendas.loading.hide();
			   },
			   function(err) { }
	  );		
		
				
		
	},
	
	changepaginacao: function(el, ev) {
		campanhavendas.loading.show();
		campanhavendas.offset = 0;
		campanhavendas.limit = parseInt($(el).val());
		campanhavendas.showcampanhas(true);		
	},
	
	changeordenacao: function(el, ev) {
		campanhavendas.loading.show();
		campanhavendas.offset = 0;
		campanhavendas.limit = parseInt($(el).val());
		campanhavendas.showcampanhas(true);		
	},
	
	clickprevimage: function(el ,ev) {
		var keys = Object.keys(campanhavendas.current["listaimagens"]);
		var image = $(".image-detail").data("current");

		var prev = keys.indexOf(image) - 1;
		if (prev < 0) { prev = keys.length  - 1; }
		var o = campanhavendas.current["listaimagens"][keys[prev]];
		if (o == null) {
			campanhavendas.geturlfromfluig(null, keys[prev], campanhavendas.onreadyloadimage);
		} else {
			$(".image-detail").data("current", keys[prev]);
			$(".image-detail").attr("src", o);
		}
	},
	
	onreadyloadimage: function(data) {
		campanhavendas.current["listaimagens"][data["doc"]] = data["content"]; 
		$(".image-detail").data("current", data["doc"]);
		$(".image-detail").attr("src", data["content"]);
	},
	
	clicknextimage: function(el ,ev) {
		console.log("clicknextimage")
		var keys = Object.keys(campanhavendas.current["listaimagens"]);
		var image = $(".image-detail").data("current");

		var next = keys.indexOf(image) + 1;
		if (next >= keys.length) { next = 0; }
		var o = campanhavendas.current["listaimagens"][keys[next]];
		if (o == null) {
			campanhavendas.geturlfromfluig(null, keys[next], campanhavendas.onreadyloadimage);
		} else {
			$(".image-detail").data("current", keys[next]);
			$(".image-detail").attr("src", o);
		}
	},
	
	getcampanhabyid: function(id) {
		for (var i=0; i<campanhavendas.list.length; i++) {
			var c = campanhavendas.list[i];
			if (c["id"] == id) { return c; }
		}
		return null;
	},
	
	savePreferences: function(el, ev) {
		var args = {
			"foldercampanha": $('input[id="foldercampanha"]', this.DOM).val(),
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
	
	clickcampanha: function(el, ev) {
		console.log("campanha");
		$(".premiados").removeClass("fs-display-none");
		$(".itens-campanha").addClass("fs-display-none")
		$(".header-itens-campanha").addClass("fs-display-none");
		console.log($(el).data("id"));
		
		$('#table-myranking > tbody').html("");
		$('#table-ranking-vendas > tbody').html("");
		$(".prev-image").hide();
		$(".next-image").hide();
		
		campanhavendas.loading.show();
		
		campanhavendas.current = campanhavendas.getcampanhabyid($(el).data("id"));
		if (campanhavendas.current["image"]) {
			$(".image-detail").attr("src", campanhavendas.current["image"]);
			if (Object.keys(campanhavendas.current["listaimagens"]).length > 1) {
				$(".prev-image").show();
				$(".next-image").show();
				
				var list = campanhavendas.current["listaimagens"];
				console.log(list);
				console.log(campanhavendas.current["image"]);
				for (var o in list) {
					console.log(o, list[o])
					console.log(list[o] == campanhavendas.current["image"])
					if (list[o] && list[o] == campanhavendas.current["image"]) {
						console.log("set data")
						$(".image-detail").data("current", o);
					}
				}
				
			}
		} else {
			$(".image-detail").attr("src", "/" + campanhavendas.code + "/resources/images/loading.gif");	
		}
		
		$(".title-detail").html("<b>" + campanhavendas.current["id"] + " " + campanhavendas.current["descricao"] + "</b> - DETALHES DA CAMPANHA");
		
		var c1 = DatasetFactory.createConstraint("campanha", campanhavendas.current["id"], campanhavendas.current["id"], ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "1", "1", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("representante", campanhavendas.representante, campanhavendas.representante, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_detalhe", null, [c1, c2, c3, c4], null, {"success": campanhavendas.onreadygetmyranking} );
		
	},
	
	onreadygetcampanhadetalhe: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhavendas.loading.hide();
			WCMC.messageError('Campanhas de vendas não possui detalhes!');	    			
			return;
		}
		
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			campanhavendas.loading.hide();
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
					v = campanhavendas.mask(v.toFixed(2));
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
					p = campanhavendas.mask(p.toFixed(2));
				} else {
					p = "";
				}
			} catch (e) {
				p = row["pontos"];
			}

			var premiado = "";
			if (row["situacao"].toLowerCase() == "premiado") {
				premiado = 'success';
				codigo += "&nbsp;<span class='fluigicon fluigicon-certificate fluigicon-sm'></span>";
			} 
			if (campanhavendas.representante == row["codparticipante"]) {
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
		
		var tpl = $('.tpl-item-ranking-vendas').html();
		var data = { "items": items };
		var html = Mustache.render(tpl, data);
		
		$('#table-ranking-vendas > tbody').html(html);
		
		campanhavendas.loading.hide();
		
	},
	
	onreadygetmyranking: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhavendas.loading.hide();
			htmlmyrank = "<tr><td class='fs-txt-center' colspan='8'>Sem pontuação nessa campanha</td></tr>";
			$('#table-myranking > tbody').html(htmlmyrank);
			return;
		}
		var values = rows["values"];
		if (values[0].tipapuracao == "erro") {
			campanhavendas.loading.hide();
			htmlmyrank = "<tr><td class='fs-txt-center' colspan='8'>Sem pontuação nessa campanha</td></tr>";
			$('#table-myranking > tbody').html(htmlmyrank);
			return;
		}
		
		var row = values[0];
		var v = "";
		try {
			v = parseFloat(row["vlrpremio"]);
			if (v > 0) {
				v = campanhavendas.mask(v.toFixed(2));
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
				p = campanhavendas.mask(p.toFixed(2));
			} else {
				p = "";
			}
		} catch (e) {
			p = row["pontos"];
		}
		
		var htmlmyrank = "<tr data-click-detail class='fs-cursor-pointer " + (row["situacao"].toLowerCase() == "premiado" ? "success" : "") + "'><td class='fs-txt-center'>" + row["situacao"] + "</td><td class='fs-txt-center'>" + row["codgrupo"] + "</td><td class='fs-txt-center'>" + row["ordempremio"] + "</td><td class='fs-txt-center'>" + row["codparticipante"] + "</td><td class='fs-txt-center'>" + p + "</td><td class='fs-txt-center'>" + v + "</td><td>" + row["descequipe"] + "</td><td><span class='fluigicon fluigicon-th'></span></td></tr>";
		$('#table-myranking > tbody').html(htmlmyrank);
		
		var c1 = DatasetFactory.createConstraint("campanha", campanhavendas.current["id"], campanhavendas.current["id"], ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "50", "50", ConstraintType.MUST, false);
		var c4 = DatasetFactory.createConstraint("grupo", row["codgrupo"], row["codgrupo"], ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_detalhe", null, [c1, c2, c3, c4], null, {"success": campanhavendas.onreadygetcampanhadetalhe} );
		
	},
	
	mask: function (valor) {
	    valor = valor.toString().replace(/\D/g,"");
	    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
	    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	    return valor                    
	},
	
	
	clickfechar: function(el, ev) {
		console.log("campanha");
		$(".premiados").addClass("fs-display-none");
		$(".itens-campanha").removeClass("fs-display-none");
		$(".header-itens-campanha").removeClass("fs-display-none");
	},
	
	getcampanha: function() {
		var limit = $("#paginacao").val();
		
		var c1 = DatasetFactory.createConstraint("representante", campanhavendas.representante, campanhavendas.representante, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);

		console.log(WCMAPI.userLogin, campanhavendas.offset, limit)
		
		DatasetFactory.getDataset("ds_campanha_vendas", null, [c1, c2, c3], null, {"success": campanhavendas.onreadygetcampanha} );
		
	},
	
	onreadygetcampanha: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhavendas.loading.hide();
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
			campanhavendas.list.push(o);
		}
		
		campanhavendas.getdocuments();
		
//		campanhavendas.showcampanhas();
		
	},
	
	getdocuments: function() {
		
		var c1 = DatasetFactory.createConstraint("pasta", campanhavendas.foldercampanha, campanhavendas.foldercampanha, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("empresa", WCMAPI.tenantCode, WCMAPI.tenantCode, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_lista_campanha_imagem", null, [c1, c2], null, {"success": campanhavendas.onreadygetdocuments} );
		
	},
	
	onreadygetdocuments: function (rows) {

		var docs = [];
		if (rows && rows["values"] && rows["values"].length > 0) {
			docs = rows["values"];
		}
		
		for (var i=0; i<campanhavendas.list.length; i++) {
			var c = campanhavendas.list[i];
			var images = {};
			for (var x=0; x<docs.length; x++) {
				var row = docs[x];
				if (row["campanha"] == c["id"]) {
					images[row["numero"]] = null;
					if (row["descricao"] == c["id"]) {
						c["toloading"] = row["numero"]; 
						c["image"] = "/" + campanhavendas.code + "/resources/images/loading.gif";
					}
				}
			}
			
			c["listaimagens"] = images; 
			
			if (c["image"] == null && $.isEmptyObject(images) == false) { 
				c["toloading"] = Object.keys(images)[0]; 
				c["image"] = "/" + campanhavendas.code + "/resources/images/loading.gif";
			} else if (c["toloading"] == null) {  
				c["image"] = "/" + campanhavendas.code + "/resources/images/no-img.png"; 
			}
			
			campanhavendas.list[i] = c;
		}
		
		campanhavendas.showcampanhas(true);
		
	},
	
	showcampanhas: function(clean) {
		var control = 0;
		var lines = 0;
		var items = [];
		
		if ($(".premiados").hasClass("fs-display-none") == false) {
			return;
		}
		
		console.log("showcampanhas", campanhavendas.offset, campanhavendas.limit);
		
		if (clean) {
			$(".itens-campanha").remove();
			campanhavendas.offset = 0;
			campanhavendas.limit = parseInt($("#paginacao").val());
		}
		
		var filter = campanhavendas.list;
		var search = $("#busca").val(); 
		if (search && search != "") {
			filter = campanhavendas.list.filter(function(item) {
				return item["descricao"].toLowerCase().indexOf(search) != -1 || item["id"].toLowerCase() == search;
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

		for (var i=campanhavendas.offset; i<campanhavendas.limit; i++) {
			var o = filter[i];
			if (o) {
				control++;
				items.push(o);
				if (control == 4) {
					var tpl = $('.tpl-continuous-scroll-campanhas').html();
					var data = { "items": items};
					var html = Mustache.render(tpl, data);
					$('.widget-campanha').append(html);
					
					control = 0;
					lines++;
					items = [];
				}
				
			}
		}		
		if (items.length > 0) {
			var tpl = $('.tpl-continuous-scroll-campanhas').html();
			var data = { "items": items};
			var html = Mustache.render(tpl, data);
			$('.widget-campanha').append(html);
		}
		campanhavendas.geturlfromfluig(0, null, null);
		campanhavendas.loading.hide();
	},
	
	geturlfromfluig: function(index, doc, onready){
		if (index != null) {
			if (index < campanhavendas.list.length) {
				var c = campanhavendas.list[index];
				if (c["toloading"]) {
					$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + c["toloading"]).done(function(data) {
					    $("#img" + c["id"]).attr("src", data.content);
					    c["listaimagens"][c["toloading"]] = data.content; 
					    c["toloading"] = null;
					    c["image"] = data.content;
					    campanhavendas.list[index] = c;
					}).fail(function() {
					    $("#img" + c["id"]).attr("src", "/" + campanhavendas.code + "/resources/images/no-img.png");
					}).complete(function() {
						index++;
						campanhavendas.geturlfromfluig(index);
					});
				} else {
					index++;
					campanhavendas.geturlfromfluig(index);
				}
			}
		} else if (doc != null) {
			$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + doc).done(function(data) {
				onready({ "doc": doc, "content": data.content}); 
			}).fail(function() {
				onready({ "doc": doc, "content": "/" + campanhavendas.code + "/resources/images/no-img.png"});
			});
		} 
	}
	
	

});
