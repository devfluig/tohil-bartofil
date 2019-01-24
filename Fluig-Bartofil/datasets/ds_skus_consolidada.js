function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("codproduto");
	dataset.addColumn("descproduto");
	dataset.addColumn("valortotal");

	var representante = "12252";
	var datainicio = "01-10-2018";
	var datafim = "31-10-2018";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "codRepresentante"){
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "dataInclusaoInicio"){
				datainicio = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "datainclusaofim"){
				datafim = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
	//	var json = '{"dados":[{"codproduto":"51","descproduto":"BUTOX CARRAPATICIDA 20ML MSD","valortotal":"307.72"},{"codproduto":"58","descproduto":"CREOLINA VIDRO 50ML PEARSON","valortotal":"138.64"},{"codproduto":"59","descproduto":"CREOLINA VIDRO 100ML PEARSON","valortotal":"107.83"},{"codproduto":"166","descproduto":"ENXADA ALPE NOVA S/SOLDA 2,5LL","valortotal":"150.09"},{"codproduto":"299","descproduto":"IVOMEC GOLD 050ML INJETAVEL MERIAL","valortotal":"3313.27"},{"codproduto":"347","descproduto":"ESPATULA CB PLASTICO 08 TRAMONTINA","valortotal":"22.85"},{"codproduto":"348","descproduto":"ESPATULA CB PLASTICO 10 TRAMONTINA","valortotal":"16.51"},{"codproduto":"359","descproduto":"ESTILETE RETRATIL GDE TRAMONTINA","valortotal":"30.91"},{"codproduto":"462","descproduto":"LIMA ENXADA KF 08","valortotal":"623.46"},{"codproduto":"557","descproduto":"MARTELO 23MM BASIC TRAMONTINA","valortotal":"44.25"},{"codproduto":"587","descproduto":"NIVEL MADEIRA 25CM MOMFORT","valortotal":"45.3"},{"codproduto":"706","descproduto":"PILHA RAYOVAC AML/AZL 1,5V MED","valortotal":"39.5"},{"codproduto":"707","descproduto":"PILHA RAYOVAC AML/AZL 1,5V PEQ AA","valortotal":"117.15"},{"codproduto":"753","descproduto":"TESOURA COSTURA 08 TRAMONTINA","valortotal":"20.34"},{"codproduto":"759","descproduto":"TESOURA USO GERAL 08 TRAMONTINA","valortotal":"210.04"},{"codproduto":"849","descproduto":"TRENA ACO 10MMX3M LRJ C/TRV LUFKIN","valortotal":"33.99"},{"codproduto":"851","descproduto":"TRENA ACO 16MMX5M LRJ C/TRAVA LUFKIN","valortotal":"161.25"},{"codproduto":"852","descproduto":"TRENA ACO 25MMX8M LRJ C/TRAVA LUFKIN","valortotal":"120.39"},{"codproduto":"884","descproduto":"BOIA NIVEL AUTOM 25AMP DUP FUNCAO RAYMA","valortotal":"50.9"},{"codproduto":"1002","descproduto":"MANG JARD LISA FLEX AZL 1/2 2MM 50M SUNFLEX","valortotal":"364.02"}]}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/" + representante + "/skuparceiro?datainicio=" + datainicio + "&datafim=" + datafim + "&sessionid=123abc&resume=S&fields=codproduto,descproduto&limit=99999",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem comissão para o periodo solicitado " + mes + "/" + ano, "", "", "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["codproduto"],
			    		 dados["descproduto"],
			    		 dados["valortotal"]));
            }
            
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}