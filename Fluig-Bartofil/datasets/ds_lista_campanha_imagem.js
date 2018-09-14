function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("numero");
	dataset.addColumn("descricao");
	dataset.addColumn("prioridade");
	dataset.addColumn("campanha");
	
	var pasta = 267;
	var empresa = 1;
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "pasta"){
				pasta = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "empresa"){
				empresa = constraints[c].getInitialValue(); 
			}
		}
	}
	
	var dataSource = "java:/jdbc/FluigDSRO";       

    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    try {
    	var conn = ds.getConnection();
    	var stmt = conn.createStatement();
    	var rs = stmt.executeQuery("select d.NR_DOCUMENTO, d.DS_PRINCIPAL_DOCUMENTO, D.NUM_PRIORID, (select DS_PRINCIPAL_DOCUMENTO from DOCUMENTO where COD_EMPRESA = d.COD_EMPRESA and NR_DOCUMENTO = d.NR_DOCUMENTO_PAI) as CAMPANHA from DOCUMENTO d where d.COD_EMPRESA = " + empresa + " and d.versao_ativa = 1 and d.NR_DOCUMENTO_PAI in (select NR_DOCUMENTO from DOCUMENTO where COD_EMPRESA = " + empresa + " and NR_DOCUMENTO_PAI = " + pasta + ")");
    	var columnCount = rs.getMetaData().getColumnCount();
        while(rs.next()) {
        	var Arr = new Array();
            for(var i=1;i<=columnCount; i++) {
            	var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if(null!=obj){
                	Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                	Arr[i-1] = "null";
                }
            }
            dataset.addRow(Arr);
        }
    } catch(e) {
                   log.info("ERRO==============> " + e.message);
    } finally {
    	if(stmt != null) stmt.close();
    	if(conn != null) conn.close();                     
    }
    
	return dataset;
	
}