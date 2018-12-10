function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("anomes");
	dataset.addColumn("codrepresentante");
	dataset.addColumn("valortotalatendido");
	dataset.addColumn("valortotalcomissao");
	dataset.addColumn("valorpremio");

	var representante = "12252";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"anomes":"201806","codrepresentante":"12252","valortotalatendido":"239042.06","valortotalcomissao":"7574.37","valorpremio":"355"},{"anomes":"201808","codrepresentante":"12252","valortotalatendido":"267795.02","valortotalcomissao":"8088.91","valorpremio":null},{"anomes":"201805","codrepresentante":"12252","valortotalatendido":"214841.37","valortotalcomissao":"6774.67","valorpremio":"11.91"},{"anomes":"201807","codrepresentante":"12252","valortotalatendido":"234527.85","valortotalcomissao":"7196.32","valorpremio":null},{"anomes":"201810","codrepresentante":"12252","valortotalatendido":"242087.58","valortotalcomissao":"7260.99","valorpremio":"300"},{"anomes":"201809","codrepresentante":"12252","valortotalatendido":"206037.14","valortotalcomissao":"6588.51","valorpremio":"37.5"}]}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/" + representante + "/evolucaovenda?sessionid=123abc",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem comissão para o representante solicitado " + representante, "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["anomes"],
			    		 dados["codrepresentante"],
			    		 dados["valortotalatendido"],
			    		 dados["valortotalcomissao"],
			    		 dados["valorpremio"]));
            }
            
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "")); 
    }
    
	return dataset;
	
}