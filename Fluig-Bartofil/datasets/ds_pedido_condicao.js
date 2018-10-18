function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("nroparcela");
	dataset.addColumn("valorparcela");
	dataset.addColumn("prazo");
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
//		var json = '{"dados":[{"nroparcela":"2","valorparcela":"830.46","prazo":"46","nropedidovenda":"9590902"},{"nroparcela":"1","valorparcela":"830.45","prazo":"26","nropedidovenda":"9590902"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":999,"totalregistros":2,"quantidaderegistros":2,"fields":"","parametros":{"limit":"999","nropedidovenda":"9590902"},"order":"nropedidovenda"}}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/pedidovenda/" + pedido + "/vencimento?sessionid=123abc&order=nroparcela&offset=0&limit=999",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem condições de pagamento", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());

            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["nroparcela"],
			    		 dados["valorparcela"],
			    		 dados["prazo"],
			    		 dados["nropedidovenda"]));
            }
            
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem detalhe para a campanha solicitada", "", "")); 
    }

    
	return dataset;
	
}