var promocoes = SuperWidget.extend({
	
	loading: FLUIGC.loading(".widget-promocao"),
	offset: 0,
	limit: 8,
	list: [],
	instanceId: null,
	folderpromocao: null,
	code: "bartofil_promocoes",
	current: null,
	grouprca: null,
	representante: null,
	
	init : function() {
		$(".pageTitle").parent().remove();
		
		promocoes.folderpromocao = this.folderpromocao;
		promocoes.current = perfilrepresentante.representante;
		
		promocoes.getPromocoes();
		
		$(window).on("scroll", function() {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			    $(window).off("scroll");
			} else {
				console.log('$(window)', $(window))
				if ($(".itens-promocoes").hasClass("fs-display-none")) {
					promocoes.loading.show();
					promocoes.offset = promocoes.limit;
					promocoes.limit = promocoes.limit + 8;
					promocoes.showPromocoes(false);	
				}
			}
		});
		
		$("#busca-promocao").keyup(function() {
			promocoes.showPromocoes(true);
		});
	},

	bindings : {
		local : {},
		global : {
			"change-representante": ['change_listPromocoes'],
			'save-preferences-promocao': ['click_savePreferences'],
			'change-paginacao-promocao': ['change_changepaginacao'],
			'click-document': ['click_clickPromocao'],
		}
	},
	clickPromocao: function(el, ev) {
		window.open(WCMAPI.serverURL + "/webdesk/webdownload?documentId=" + $(el).data("pdf") + "&version=" + $(el).data("version") + "&tenantId=" + WCMAPI.tenantCode + "&replication=false");
	},
	listPromocoes: function(el, ev) {
		promocoes.loading.show();
		promocoes.representante = $('#listrepresentatives').val();
		promocoes.list = [];
		promocoes.offset = 0;
		promocoes.current = null;
		promocoes.limit = parseInt($("#paginacao-promocao").val());
		promocoes.getPromocoes();
	},

	changepaginacao: function(el, ev) {
		promocoes.loading.show();
		promocoes.offset = 0;
		promocoes.limit = parseInt($(el).val());
		promocoes.showPromocoes(true);		
	},
	
	getPromocoes: function() {
		
		var c1 = DatasetFactory.createConstraint("pasta", promocoes.folderpromocao, promocoes.folderpromocao, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("empresa", WCMAPI.tenantCode, WCMAPI.tenantCode, ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("expiracao", "true", "true", ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_lista_campanha_imagem", null, [c1, c2, c3], null, {"success": promocoes.onReadyGetPromocoes} );
		
	},
	
	onReadyGetPromocoes: function (rows) {

		var docs = [];
		if (rows && rows["values"] && rows["values"].length > 0) {
			var values = rows["values"];
			var items = {};
			for (var i=0; i<values.length; i++) {
				var row = values[i];
				var isImg = (row["descricao"].indexOf(".jpg") != -1 || row["descricao"].indexOf(".png") != -1 || row["descricao"].indexOf(".jpeg") != -1 ? true : false);
				if (items[row["campanha"]]) {
					if (items[row["campanha"]].img == "" && isImg) {
						items[row["campanha"]].img = row["descricao"];
						items[row["campanha"]].toloading = row["numero"];
						items[row["campanha"]].datainicio = row["datainicio"];
						items[row["campanha"]].datafim = row["datafim"];
						items[row["campanha"]].texto = row["texto"];
					} else {
						items[row["campanha"]].link = (items[row["campanha"]].link == "" ? row["numero"] + "," + row["versao"] : items[row["campanha"]].link + "|" + row["numero"] + "," + row["versao"]);
					}
				} else {
					items[row["campanha"]] = {
						"img": (isImg) ? row["descricao"] : "",
						"link": (isImg == false) ? row["numero"] + "," + row["versao"] : "",
						"toloading": (isImg) ? row["numero"] : null,
						"datainicio": (isImg) ? row["datainicio"] : null,
						"datafim": (isImg) ? row["datafim"] : null,
						"id": row["numero"],
						"texto": row["texto"]
					}
				}
			}
			
			for (var key in items) {
				var o = {
					"id": (items[key].toloading ? items[key].toloading : items[key].id),
					"descricao": key,
					"toloading": items[key].toloading,
					"links": items[key].link,
					"texto": items[key].texto
				}
				if (items[key].datainicio) {
					var mi = moment(items[key].datainicio);
					o["datainicio"] = mi.format("DD/MM/YYYY");
				} else {
					o["datainicio"] = "sem data";
				}
				if (items[key].datafim) {
					var mf = moment(items[key].datafim);
					o["datafim"] = mf.format("DD/MM/YYYY");
				} else {
					o["datafim"] = "sem data";
				}
				promocoes.list.push(o);
			}
			
			console.log('items', items)
//			promocoes.list = rows["values"];
		}
		
		promocoes.showPromocoes(true);
		
	},
	
	showPromocoes: function(clean) {
		var control = 0;
		var lines = 0;
		var items = [];
		
		if ($(".premiados").hasClass("fs-display-none") == false) {
			return;
		}
		
		console.log("showPromocoes", promocoes.offset, promocoes.limit);
		
		if (clean) {
			$(".itens-promocoes").remove();
			promocoes.offset = 0;
			promocoes.limit = parseInt($("#paginacao-promocao").val());
		}
		
		var filter = promocoes.list;
		var search = $("#busca-promocao").val(); 
		if (search && search != "") {
			filter = promocoes.list.filter(function(item) {
				return item["descricao"].toLowerCase().indexOf(search) != -1 || item["id"].toLowerCase() == search;
			})
		}
		
		for (var i=promocoes.offset; i<promocoes.limit; i++) {
			var o = filter[i];
			if (o) {
				control++;
				var l = o["links"].split("|");
				var html = ""; 
				for (var x=0; x<l.length; x++) {
					var d = l[x].split(",")[0];
					var v = l[x].split(",")[1];
					html += "<a href='" + WCMAPI.serverURL + "/portal/p/" + WCMAPI.tenantCode + "/ecmnavigation?app_ecm_navigation_doc=" + d + "&app_ecm_navigation_docVersion=" + v + "' class='card-link' target='_blank'><i class='fluigicon fluigicon-document-square icon-md'></i></a>";
					if (x==0) { 
						o["pdf"] = d; 
						o["version"] = v;
					}
				}
				o["showlinks"] = html; 
				items.push(o);
				if (control == 4) {
					var tpl = $('.tpl-continuous-scroll-promocoes').html();
					var data = { "items": items};
					var html = Mustache.render(tpl, data);
					$('.widget-promocoes').append(html);
					
					control = 0;
					lines++;
					items = [];
				}
				
			}
		}
		
		console.log('items items', items)
		if (items.length > 0) {
			var tpl = $('.tpl-continuous-scroll-promocoes').html();
			var data = { "items": items};
			var html = Mustache.render(tpl, data);
			$('.widget-promocoes').append(html);
		}
		promocoes.geturlfromfluig(0, null, null);
		promocoes.loading.hide();
	},
	
	geturlfromfluig: function(index, doc, onready){
		if (index != null) {
			if (index < promocoes.list.length) {
				var c = promocoes.list[index];
				if (c["toloading"]) {
					$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + c["toloading"]).done(function(data) {
					    $("#img" + c["id"]).attr("src", data.content);
					    c["toloading"] = null;
					    c["image"] = data.content;
					    promocoes.list[index] = c;
					}).fail(function() {
					    $("#img" + c["id"]).attr("src", "/" + promocoes.code + "/resources/images/no-img.png");
					}).complete(function() {
						index++;
						promocoes.geturlfromfluig(index);
					});
				} else {
					if (c["image"]) {
					    $("#img" + c["id"]).attr("src", c["image"]);
					} else {
					    $("#img" + c["id"]).attr("src", "/" + promocoes.code + "/resources/images/no-img.png");

					}
					index++;
					promocoes.geturlfromfluig(index);
				}
			}
		} else if (doc != null) {
			$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + doc).done(function(data) {
				onready({ "doc": doc, "content": data.content}); 
			}).fail(function() {
				onready({ "doc": doc, "content": "/" + promocoes.code + "/resources/images/no-img.png"});
			});
		} 
	},
	
	savePreferences: function(el, ev) {
		var args = {
			"folderpromocao": $('input[id="folderpromocao"]', this.DOM).val()
		};
		console.log('folderpromocao', args);
		
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
	
});
