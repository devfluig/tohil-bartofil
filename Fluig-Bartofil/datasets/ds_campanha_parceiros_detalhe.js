function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("datainicio");
	dataset.addColumn("apurado");
	dataset.addColumn("pontos");
	dataset.addColumn("datafinal");
	dataset.addColumn("quesito");
	
	var limit = 999;
	var offset = 0;
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "limit") {
				limit = +(constraints[c].getInitialValue()); 
			} else if (constraints[c].getFieldName() == "offset") {
				offset = +(constraints[c].getInitialValue()); 
			}
		}
	}
	
	try {
		var json = '{"dados":[{"datainicio":"01/07/2018","apurado":"96.25","pontos":"2","datafinal":"31/07/2018","quesito":"Atingimento Potencial de Venda"},{"datainicio":"01/09/2018","apurado":"34.19","pontos":"0","datafinal":"30/09/2018","quesito":"Atingimento Potencial de Venda"},{"datainicio":"01/08/2018","apurado":"102.84","pontos":"4","datafinal":"31/08/2018","quesito":"Atingimento Potencial de Venda"},{"datainicio":"01/09/2018","apurado":"12","pontos":"-24","datafinal":"30/09/2018","quesito":"Clientes Inativos + XX dias"},{"datainicio":"01/07/2018","apurado":"17","pontos":"-34","datafinal":"31/07/2018","quesito":"Clientes Inativos + XX dias"},{"datainicio":"01/08/2018","apurado":"10","pontos":"-20","datafinal":"31/08/2018","quesito":"Clientes Inativos + XX dias"},{"datainicio":"01/07/2018","apurado":"9","pontos":"5","datafinal":"31/07/2018","quesito":"Clientes Novos/Reativados Mes"},{"datainicio":"01/09/2018","apurado":"8","pontos":"5","datafinal":"30/09/2018","quesito":"Clientes Novos/Reativados Mes"},{"datainicio":"01/08/2018","apurado":"21","pontos":"16","datafinal":"31/08/2018","quesito":"Clientes Novos/Reativados Mes"},{"datainicio":"01/09/2018","apurado":"17.63","pontos":"-90","datafinal":"30/09/2018","quesito":"Cobranca em aberto + XX dias"},{"datainicio":"01/08/2018","apurado":"5.58","pontos":"-30","datafinal":"31/08/2018","quesito":"Cobranca em aberto + XX dias"},{"datainicio":"01/07/2018","apurado":"6.38","pontos":"-30","datafinal":"31/07/2018","quesito":"Cobranca em aberto + XX dias"},{"datainicio":"01/08/2018","apurado":"1","pontos":"-15","datafinal":"31/08/2018","quesito":"DEV-Anotou Produto errado &lt;002&gt;"},{"datainicio":"01/07/2018","apurado":"0","pontos":"0","datafinal":"30/09/2018","quesito":"Nao ter Cobranca em Aberto"},{"datainicio":"01/07/2018","apurado":"28","pontos":"5","datafinal":"10/07/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"21/07/2018","apurado":"46","pontos":"13","datafinal":"31/07/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"11/09/2018","apurado":"20","pontos":"0","datafinal":"20/09/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"21/08/2018","apurado":"48","pontos":"15","datafinal":"31/08/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"01/08/2018","apurado":"49","pontos":"15","datafinal":"10/08/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"11/07/2018","apurado":"38","pontos":"9","datafinal":"20/07/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"01/09/2018","apurado":"29","pontos":"5","datafinal":"10/09/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"11/08/2018","apurado":"36","pontos":"9","datafinal":"20/08/2018","quesito":"Numero Clientes c/Pedidos"},{"datainicio":"01/07/2018","apurado":"6","pontos":"0","datafinal":"30/09/2018","quesito":"Percentual Clientes na Carteira"},{"datainicio":"01/07/2018","apurado":"1393","pontos":"45","datafinal":"31/07/2018","quesito":"Venda Mix de Parceiros"},{"datainicio":"01/08/2018","apurado":"1467","pontos":"45","datafinal":"31/08/2018","quesito":"Venda Mix de Parceiros"},{"datainicio":"01/09/2018","apurado":"675","pontos":"30","datafinal":"30/09/2018","quesito":"Venda Mix de Parceiros"},{"datainicio":"01/07/2018","apurado":"22","pontos":"44","datafinal":"31/07/2018","quesito":"Venda Mix de Parceiros +30 Itens"},{"datainicio":"01/08/2018","apurado":"24","pontos":"48","datafinal":"31/08/2018","quesito":"Venda Mix de Parceiros +30 Itens"},{"datainicio":"01/09/2018","apurado":"8","pontos":"16","datafinal":"30/09/2018","quesito":"Venda Mix de Parceiros +30 Itens"},{"datainicio":"01/09/2018","apurado":"76","pontos":"3","datafinal":"30/09/2018","quesito":"Venda de Produtos &lt; S &gt;"},{"datainicio":"01/07/2018","apurado":"129.22","pontos":"6","datafinal":"31/07/2018","quesito":"Venda de Produtos &lt; S &gt;"},{"datainicio":"01/08/2018","apurado":"158","pontos":"7","datafinal":"31/08/2018","quesito":"Venda de Produtos &lt; S &gt;"},{"datainicio":"01/07/2018","apurado":"44.828","pontos":"0","datafinal":"30/09/2018","quesito":"Venda em Todas Localidades"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":50,"totalregistros":33,"quantidaderegistros":33,"fields":"","parametros":{"limit":"50","nrorepresentante":"12252"},"order":"quesito"}}';
//		log.info("ds_comissoes")
		
/*        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/campanha?sessionid=123abc&codparticipante=" + representante + "&order=codcampanha&offset=" + offset + "&limit=" + limit,
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + representante, "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {*/
            var result = JSON.parse(json);
//            var result = JSON.parse(vo.getResult());
            
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["datainicio"],
							    		 dados["apurado"],
							    		 dados["pontos"],
							    		 dados["datafinal"],
							    		 dados["quesito"]));
        	    log.info("offset:" + offset + ":" + i + ":" + limit);
            }

            
  //      }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + representante, "", "", "", "", "", "", "", "", "", "", "", "")); 
    }

	
	return dataset;
	
	
}