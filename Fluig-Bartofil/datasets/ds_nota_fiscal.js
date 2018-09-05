function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("valor");
	dataset.addColumn("datapedido");
	
	var pessoa = "12252";
	var mes = "08";
	var ano = "2018";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "pessoa"){
				pessoa = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "mes"){
				mes = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "ano"){
				ano = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"datapedido":"2018-09","valor":"1000"}]}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/notafiscal?sessionid=123abc&fields=datapedido,valor&codpessoarepresentante=" + pessoa + "&mesanofaturamento=" + ano + "" + mes + "&resume=S&order=datapedido&offset=0&limit=999",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem pedidos para o periodo solicitado " + mes + "/" + ano)); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["valor"],
			    		 dados["datapedido"]));
            }
            
         }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem pedidos para o periodo solicitado " + mes + "/" + ano)); 
    }
    
	return dataset;
	
}