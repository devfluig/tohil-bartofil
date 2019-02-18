function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("login");
	dataset.addColumn("colleagueName");
	
	var grupo = "RCA";
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
    	var rs = stmt.executeQuery("select ut.LOGIN, u.FULL_NAME from FDN_USERTENANT as ut left join FDN_USER as u on u.USER_ID = ut.USER_ID where ut.TENANT_ID = 1 and ut.LOGIN in (select g.LOGIN from FDN_GROUPUSERROLE g where g.group_code = '" + grupo + "' and login is not null) OR ut.LOGIN in (select g2.login as login2 from FDN_GROUPUSERROLE as g1 left join FDN_GROUPUSERROLE as g2 on g2.TENANT_ID = g1.TENANT_ID and g2.GROUP_CODE = g1.CHILD_GROUPCODE where g1.group_code = '" + grupo + "' and g2.login is not null) OR ut.LOGIN in (select r1.login from FDN_GROUPUSERROLE as g1 left join FDN_USERROLE as r1 on r1.TENANT_ID = g1.TENANT_ID and r1.ROLE_CODE = g1.ROLE_CODE where g1.group_code = '" + grupo + "' and r1.login is not null) order by u.FULL_NAME");
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