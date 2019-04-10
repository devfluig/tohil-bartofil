<div id="relatorioPedidos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-pedidos" data-params="relatorioPedidos.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}' })">
	<script type="text/template" class="template_datatable">
	    <tr>
	        <td class="fs-txt-right"><a href="#" style="color: #60c1e0; text-decoration: underline">{{nropedidovenda}}</a></td>
	        <td class="fs-txt-left">{{datainclusaof}}</td>
	        <td class="fs-txt-right">{{valor}}</td>
	        <td class="fs-txt-right">{{comissao}}</td>
	        <td class="fs-txt-right">{{codcliente}}</td>
	        <td>{{nomecliente}}</td>
	        <td class="fs-txt-left">{{descorigempedido}}</td>
	        <td class="fs-txt-left">{{situacao}}</td>
	    </tr>
	</script>
	
	<div class="page-header">
	    <h2>MEUS PEDIDOS</h2>
	</div>
	
	<div class="row">
		<div class="col-sm-5 switch-situacao"></div>
	</div>
	<div class="panel panel-info">
    	<div class="panel-heading">LISTA DE PEDIDOS</div>
    	<div class="panel-body">
    		<div id="datatablePedidos" class="table-responsive"></div>
			<p class="help-block widget-pedidos" style="display: block;">Clique no pedido para ver detalhes</p>
    	</div>
    </div>
</div>
<script src="/webdesk/vcXMLRPC.js"></script>

