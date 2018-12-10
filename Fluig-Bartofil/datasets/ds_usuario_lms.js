function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("id");

	var mail = "rodrigo.sombrio@gmail.com";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "mail"){
				mail = constraints[c].getInitialValue(); 
			}
		}
	}
	
	var minhaQuery = "select id from ele_user where email = '" + mail + "'";
    var dataSource = "java:/jdbc/FluigDSRO";       

    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    try {
    	var conn = ds.getConnection();
    	var stmt = conn.createStatement();
    	var rs = stmt.executeQuery(minhaQuery);
        while(rs.next()) {
        	var Arr = new Array();
    		var obj = rs.getObject(rs.getMetaData().getColumnName(1));
        	if(null!=obj){
        		Arr[0] = rs.getObject(rs.getMetaData().getColumnName(1)).toString();
        	} else {
        		Arr[0] = "null";
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