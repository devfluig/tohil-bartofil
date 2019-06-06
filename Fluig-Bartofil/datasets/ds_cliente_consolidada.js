function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("vlrtotal");
	dataset.addColumn("codrepresentante");

	var representante = "12252";
	var periodo = "201901";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "periodo"){
				periodo = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"situacao":"A","quantidadepedidos":"2","valortotalcomissaogeral":"184.33","quantidadeclientes":"2","valortotalgeral":"4703.28"},{"situacao":"C","quantidadepedidos":"4","valortotalcomissaogeral":"0","quantidadeclientes":"4","valortotalgeral":"0"},{"situacao":"F","quantidadepedidos":"66","valortotalcomissaogeral":"3301.92","quantidadeclientes":"48","valortotalgeral":"113623.57"},{"situacao":"R","quantidadepedidos":"1","valortotalcomissaogeral":"9.52","quantidadeclientes":"1","valortotalgeral":"408.66"},{"situacao":"S","quantidadepedidos":"5","valortotalcomissaogeral":"459.64","quantidadeclientes":"4","valortotalgeral":"18142.68"}]}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/devolucao?sessionid=123abc&codrepresentante=" + representante + "&anomes=" + periodo + "&fields=codrepresentante,vlrtotal&resume=S",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem comissão para o periodo solicitado " + mes + "/" + ano)); 
        } else {
            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["vlrtotal"],
			    		 				 dados["codrepresentante"]));
            }
            
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}