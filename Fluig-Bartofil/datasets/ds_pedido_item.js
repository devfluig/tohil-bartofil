function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("valortotalatendidocomimpostos");
	dataset.addColumn("desconto");
	dataset.addColumn("valortotaldescincondicional");
	dataset.addColumn("descproduto");
	dataset.addColumn("valorpedido");
	dataset.addColumn("valoratendido");
	dataset.addColumn("qtdatendida");
	dataset.addColumn("qtdembalagem");
	dataset.addColumn("qtdpedida");
	dataset.addColumn("valortotalicmsantec");
	dataset.addColumn("descembalagem");
	dataset.addColumn("valortotalacobrar");
	dataset.addColumn("codproduto");
	dataset.addColumn("valorembalagem");
	dataset.addColumn("valortotalipi");
	dataset.addColumn("valortotalicmsst");
	dataset.addColumn("tipotabvenda");
	dataset.addColumn("seqitem");
	dataset.addColumn("valortotalcomissao");
	dataset.addColumn("nropedidovenda");
	
	var pedido = "9590902";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "pedido"){
				pedido = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"valortotalatendidocomimpostos":"23.79","desconto":"0","valortotaldescincondicional":"0","descproduto":"CHUMBADA OLIVA N 02 +-100PC/KG LOBO","valorpedido":"23.79","valoratendido":"23.79","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"KG","valortotalacobrar":"23.79","codproduto":"100281","valorembalagem":"23.79","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"1","valortotalcomissao":"1.07","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"21.15","desconto":"0","valortotaldescincondicional":"0","descproduto":"CHUMBADA OLIVA N 03 +-066PC/KG LOBO","valorpedido":"21.15","valoratendido":"21.15","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"KG","valortotalacobrar":"21.15","codproduto":"100282","valorembalagem":"21.15","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"2","valortotalcomissao":".95","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"132.34","desconto":"0","valortotaldescincondicional":"0","descproduto":"SERRA TICO TICO 420W 110V BLACK DECKER","valorpedido":"109.21","valoratendido":"109.21","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"132.34","codproduto":"100646","valorembalagem":"109.21","valortotalipi":"0","valortotalicmsst":"23.13","tipotabvenda":"V","seqitem":"3","valortotalcomissao":"2.51","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"21.36","desconto":"0","valortotaldescincondicional":"0","descproduto":"TORN JARDIM PLAST 1/2 PTA HERC C/ ADAPT 3/4","valorpedido":"19.43","valoratendido":"19.43","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"PT","valortotalacobrar":"21.36","codproduto":"102488","valorembalagem":"19.43","valortotalipi":"0","valortotalicmsst":"1.93","tipotabvenda":"V","seqitem":"4","valortotalcomissao":".87","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"214.6","desconto":"0","valortotaldescincondicional":"0","descproduto":"TELA PINTEIRO F22 A100 M1 C/50M BELGO #N","valorpedido":"193.46","valoratendido":"193.46","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"RL","valortotalacobrar":"214.6","codproduto":"104360","valorembalagem":"193.46","valortotalipi":"0","valortotalicmsst":"21.14","tipotabvenda":"V","seqitem":"5","valortotalcomissao":"4.45","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"34.19","desconto":"0","valortotaldescincondicional":"0","descproduto":"TORN TANQ PLAST 15CM 1/2 C/BICO HERC","valorpedido":"31.09","valoratendido":"31.09","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"PT","valortotalacobrar":"34.19","codproduto":"15008","valorembalagem":"31.09","valortotalipi":"0","valortotalicmsst":"3.1","tipotabvenda":"V","seqitem":"6","valortotalcomissao":"1.4","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"14.22","desconto":"0","valortotaldescincondicional":"0","descproduto":"SERRA TICO TICO BIMETAL BU218 STARRETT","valorpedido":"12.74","valoratendido":"12.74","qtdatendida":"5","qtdembalagem":"5","qtdpedida":"5","valortotalicmsantec":"0","descembalagem":"CR","valortotalacobrar":"14.22","codproduto":"15971","valorembalagem":"12.74","valortotalipi":"0","valortotalicmsst":"1.48","tipotabvenda":"V","seqitem":"7","valortotalcomissao":".57","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"108","desconto":"0","valortotaldescincondicional":"0","descproduto":"LINHA PESCA BCA DOURADO 100M 100","valorpedido":"108","valoratendido":"108","qtdatendida":"10","qtdembalagem":"10","qtdpedida":"10","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"108","codproduto":"1712","valorembalagem":"108","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"8","valortotalcomissao":"4.86","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"45.04","desconto":"0","valortotaldescincondicional":"0","descproduto":"BUCHA 1/2 P/TORNEIRA PLAST HERC C/100","valorpedido":"45.04","valoratendido":"45.04","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"45.04","codproduto":"19309","valorembalagem":"45.04","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"9","valortotalcomissao":"2.03","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"44.41","desconto":"0","valortotaldescincondicional":"0","descproduto":"SERRA ACO RAPIDO FLEX STARRETT KBS 1218","valorpedido":"39.41","valoratendido":"39.41","qtdatendida":"10","qtdembalagem":"10","qtdpedida":"10","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"44.41","codproduto":"20057","valorembalagem":"39.41","valortotalipi":"0","valortotalicmsst":"5","tipotabvenda":"V","seqitem":"10","valortotalcomissao":".91","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"24.57","desconto":"0","valortotaldescincondicional":"0","descproduto":"TORN PIA/TANQ PLAST 10CM 1/2 HERC","valorpedido":"22.34","valoratendido":"22.34","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"PT","valortotalacobrar":"24.57","codproduto":"2015","valorembalagem":"22.34","valortotalipi":"0","valortotalicmsst":"2.23","tipotabvenda":"V","seqitem":"11","valortotalcomissao":"1.01","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"28.69","desconto":"0","valortotaldescincondicional":"0","descproduto":"TORN PIA/TANQ PLAST 15CM 1/2 HERC","valorpedido":"26.07","valoratendido":"26.07","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"PT","valortotalacobrar":"28.69","codproduto":"2017","valorembalagem":"26.07","valortotalipi":"0","valortotalicmsst":"2.62","tipotabvenda":"V","seqitem":"12","valortotalcomissao":"1.17","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"53.72","desconto":"0","valortotaldescincondicional":"0","descproduto":"TINTA SPRAY COLORGIN DECOR VERNIZ 360ML #A","valorpedido":"46.22","valoratendido":"46.22","qtdatendida":"6","qtdembalagem":"6","qtdpedida":"6","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"53.72","codproduto":"20520","valorembalagem":"46.22","valortotalipi":"0","valortotalicmsst":"7.5","tipotabvenda":"V","seqitem":"13","valortotalcomissao":"1.06","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"54.93","desconto":"0","valortotaldescincondicional":"0","descproduto":"PULVERIZADOR TROMBONE 5L GUARANY","valorpedido":"54.93","valoratendido":"54.93","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"54.93","codproduto":"212","valorembalagem":"54.93","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"14","valortotalcomissao":"1.26","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"30.18","desconto":"0","valortotaldescincondicional":"0","descproduto":"TESOURA GRAMA CERCA VIVA 12 TRAMO","valorpedido":"29.5","valoratendido":"29.5","qtdatendida":"2","qtdembalagem":"1","qtdpedida":"2","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"30.18","codproduto":"249","valorembalagem":"14.75","valortotalipi":"0","valortotalicmsst":".68","tipotabvenda":"V","seqitem":"15","valortotalcomissao":"1.33","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"57.6","desconto":"0","valortotaldescincondicional":"0","descproduto":"MATA BICHEIRA 500ML FORTE SV ZOETIS","valorpedido":"57.6","valoratendido":"57.6","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"57.6","codproduto":"326","valorembalagem":"57.6","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"16","valortotalcomissao":"1.32","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"117.09","desconto":"0","valortotaldescincondicional":"0","descproduto":"CORDA PP TROPICAL 06MM AML RIOMAR","valorpedido":"117.09","valoratendido":"117.09","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"117.09","codproduto":"3370","valorembalagem":"117.09","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"17","valortotalcomissao":"5.27","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"65.36","desconto":"0","valortotaldescincondicional":"0","descproduto":"FACA PEIXEIRA CARBONO 05 TRAMONTINA","valorpedido":"65.36","valoratendido":"65.36","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"65.36","codproduto":"3478","valorembalagem":"65.36","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"18","valortotalcomissao":"1.5","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"74.25","desconto":"0","valortotaldescincondicional":"0","descproduto":"FACA PEIXEIRA CARBONO 06 TRAMONTINA","valorpedido":"74.25","valoratendido":"74.25","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"74.25","codproduto":"3479","valorembalagem":"74.25","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"19","valortotalcomissao":"1.71","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"83.76","desconto":"0","valortotaldescincondicional":"0","descproduto":"FACA PEIXEIRA CARBONO 07 TRAMONTINA","valorpedido":"83.76","valoratendido":"83.76","qtdatendida":"12","qtdembalagem":"12","qtdpedida":"12","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"83.76","codproduto":"3480","valorembalagem":"83.76","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"20","valortotalcomissao":"1.93","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"63.22","desconto":"0","valortotaldescincondicional":"0","descproduto":"COMEDOURO CRISTAL 040ML 1FURO C/ GANCHO PET","valorpedido":"63.22","valoratendido":"63.22","qtdatendida":"80","qtdembalagem":"40","qtdpedida":"80","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"63.22","codproduto":"480","valorembalagem":"31.61","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"21","valortotalcomissao":"2.84","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"19.24","desconto":"0","valortotaldescincondicional":"0","descproduto":"PORTA OVO 20ML ALVORADA PET","valorpedido":"19.24","valoratendido":"19.24","qtdatendida":"50","qtdembalagem":"50","qtdpedida":"50","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"19.24","codproduto":"503","valorembalagem":"19.24","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"22","valortotalcomissao":".87","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"19.4","desconto":"0","valortotaldescincondicional":"0","descproduto":"PORTA VITAMINA GDE 20ML PET","valorpedido":"19.4","valoratendido":"19.4","qtdatendida":"50","qtdembalagem":"50","qtdpedida":"50","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"19.4","codproduto":"505","valorembalagem":"19.4","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"23","valortotalcomissao":".87","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"45.3","desconto":"0","valortotaldescincondicional":"0","descproduto":"PARAFUSO FRANCES GALV A 1/4X2 C/200","valorpedido":"40.38","valoratendido":"40.38","qtdatendida":"1","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"45.3","codproduto":"7476","valorembalagem":"40.38","valortotalipi":"0","valortotalicmsst":"4.92","tipotabvenda":"V","seqitem":"24","valortotalcomissao":"2.75","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"34","desconto":"0","valortotaldescincondicional":"0","descproduto":"CANTOLINDO POLIVITAMINICO 30ML SIMOES PET","valorpedido":"34","valoratendido":"34","qtdatendida":"5","qtdembalagem":"1","qtdpedida":"5","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"34","codproduto":"86972","valorembalagem":"6.8","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"25","valortotalcomissao":"1.53","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"152.54","desconto":"0","valortotaldescincondicional":"0","descproduto":"ISQUEIRO BIC MAX SORTIDO BERCO #A","valorpedido":"152.54","valoratendido":"152.54","qtdatendida":"50","qtdembalagem":"50","qtdpedida":"50","valortotalicmsantec":"0","descembalagem":"CX","valortotalacobrar":"152.54","codproduto":"92111","valorembalagem":"152.54","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"26","valortotalcomissao":"3.51","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"47.1","desconto":"0","valortotaldescincondicional":"0","descproduto":"CATOSAL B12 10ML INJETAVEL BAYER","valorpedido":"47.1","valoratendido":"47.1","qtdatendida":"3","qtdembalagem":"1","qtdpedida":"3","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"47.1","codproduto":"93976","valorembalagem":"15.7","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"27","valortotalcomissao":"1.08","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"30.86","desconto":"0","valortotaldescincondicional":"0","descproduto":"SUPORTE DE PAREDE P/MANGUEIRA TRAMONTINA","valorpedido":"27.6","valoratendido":"27.6","qtdatendida":"6","qtdembalagem":"1","qtdpedida":"6","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"30.86","codproduto":"106219","valorembalagem":"4.6","valortotalipi":"0","valortotalicmsst":"3.26","tipotabvenda":"V","seqitem":"29","valortotalcomissao":"1.24","nropedidovenda":"9590902"},{"valortotalatendidocomimpostos":"0","desconto":"0","valortotaldescincondicional":"0","descproduto":"#TABLOIDE DE PRODUTOS BCR A","valorpedido":".01","valoratendido":"0","qtdatendida":"0","qtdembalagem":"1","qtdpedida":"1","valortotalicmsantec":"0","descembalagem":"UN","valortotalacobrar":"0","codproduto":"91457","valorembalagem":".01","valortotalipi":"0","valortotalicmsst":"0","tipotabvenda":"V","seqitem":"28","valortotalcomissao":"0","nropedidovenda":"9590902"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":999,"totalregistros":29,"quantidaderegistros":29,"fields":"","parametros":{"limit":"999","nropedidovenda":"9590902"},"order":"nropedidovenda"}}';
		//log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/pedidovenda/" + pedido + "/item?sessionid=123abc&order=seqitem&offset=0&limit=999",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem detalhe para a campanha solicitada", "", "", "", "", "", "", "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());

            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["valortotalatendidocomimpostos"],
			    		 dados["desconto"],
			    		 dados["valortotaldescincondicional"],
			    		 dados["descproduto"],
			    		 dados["valorpedido"],
			    		 dados["valoratendido"],
			    		 dados["qtdatendida"],
			    		 dados["qtdembalagem"],
			    		 dados["qtdpedida"],
			    		 dados["valortotalicmsantec"],
			    		 dados["descembalagem"],
			    		 dados["valortotalacobrar"],
			    		 dados["codproduto"],
			    		 dados["valorembalagem"],
			    		 dados["valortotalipi"],
			    		 dados["valortotalicmsst"],
			    		 dados["tipotabvenda"],
			    		 dados["seqitem"],
			    		 dados["valortotalcomissao"],
			    		 dados["nropedidovenda"]));
            }
       }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem detalhe para a campanha solicitada", "", "", "", "", "", "", "", "", "")); 
    }

    
	return dataset;
	
}