function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("decendio");
	dataset.addColumn("nomeclientes");
	dataset.addColumn("valortotalgeral");

	var representante = "30275";
	var datainicio = "01-01-2019";
	var datafim = "31-01-2019";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "data-inicio"){
				datainicio = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "data-fim"){
				datafim = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"decendio":"1","quantidadepedidos":"62","valortotalcomissaogeral":"2772.32","quantidadeclientes":"47","valortotalgeral":"94952.04"},{"decendio":"2","quantidadepedidos":"54","valortotalcomissaogeral":"1968.8","quantidadeclientes":"41","valortotalgeral":"65137.58"},{"decendio":"3","quantidadepedidos":"70","valortotalcomissaogeral":"2519.69","quantidadeclientes":"40","valortotalgeral":"99967.74"}]}';
		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
		
		for (var x=1; x<4; x++) {
	        var data = {
                companyId : getValue("WKCompany") + '',
                serviceCode : 'RCA',
                endpoint : "/v1/representante/" + representante + "/pedidos?sessionid=123abc&datainclusaoinicio=" + datainicio + "&datainclusaofim=" + datafim + "&resume=S&fields=nomecliente,valortotalatendido&decendio=" + x + "&offset=0&limit=9999",
                method : 'get',     
                timeoutService: '1000',
    	        options : {
    	            mediaType: 'application/json'
    	        }
            }
            var vo = clientService.invoke(JSON.stringify(data));
            if (vo.getResult()== null || vo.getResult().isEmpty()) {
            	dataset.addRow(new Array("erro", "Sem comissão para o periodo solicitado " + datainicio + " " + datafim, "", "", "", "", "", "", "", "", "", "", "", "", "", "")); 
            } else {
//	                var result = JSON.parse(json);
                var result = JSON.parse(vo.getResult());
                var list = result["dados"];
                for (var i=0; i<list.length; i++) {
                	var dados = list[i];
            	    dataset.addRow(new Array('' + x,
    			    		 dados["nomecliente"],
    			    		 dados["valortotalatendido"]));
                }
                
            }
		}
		
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}