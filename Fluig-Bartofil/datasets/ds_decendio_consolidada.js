function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("decendio");
	dataset.addColumn("quantidadepedidos");
	dataset.addColumn("valortotalcomissaogeral");
	dataset.addColumn("quantidadeclientes");
	dataset.addColumn("valortotalgeral");

	var representante = "20009";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
		var json = '{"dados":[{"decendio":"1","quantidadepedidos":"62","valortotalcomissaogeral":"2772.32","quantidadeclientes":"47","valortotalgeral":"94952.04"},{"decendio":"2","quantidadepedidos":"54","valortotalcomissaogeral":"1968.8","quantidadeclientes":"41","valortotalgeral":"65137.58"},{"decendio":"3","quantidadepedidos":"70","valortotalcomissaogeral":"2519.69","quantidadeclientes":"40","valortotalgeral":"99967.74"}]}';
//		log.info("ds_comissoes")
		
  /*      var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/12252/pedidos?sessionid=123abc&datainclusaoinicio=01-10-2018&datainclusaofim=31-10-2018&fields=decendio&resume=S",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem comissão para o periodo solicitado " + mes + "/" + ano, "", "", "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {*/
            var result = JSON.parse(json);
//            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["decendio"],
			    		 dados["quantidadepedidos"],
			    		 dados["valortotalcomissaogeral"],
			    		 dados["quantidadeclientes"],
			    		 dados["valortotalgeral"]));
            }
            
            //       }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}