function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("login");
	dataset.addColumn("colleagueName");
	
	var grupo = "RCA-Representante";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "grupo"){
				grupo = constraints[c].getInitialValue(); 
			}
		}
	}
	
	var dataSource = "java:/jdbc/FluigDSRO";       

    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    try {
    	var conn = ds.getConnection();
    	var stmt = conn.createStatement();
    	var rs = stmt.executeQuery("select ut.LOGIN, u.FULL_NAME from FDN_GROUPUSERROLE gr, FDN_USERTENANT ut, FDN_USER u where gr.group_code = '" + grupo + "' and ut.TENANT_ID = gr.TENANT_ID and ut.LOGIN = gr.LOGIN and u.USER_ID = ut.USER_ID order by u.FULL_NAME");
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