<div id="relatorioPedidos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-pedidos" data-params="relatorioPedidos.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}' })">
	<script type="text/template" class="template_datatable">
	    <tr>
	        <td>{{nropedidovenda}}</td>
	        <td class="fs-txt-left">{{datainclusaof}}</td>
	        <td class="fs-txt-right">{{valor}}</td>
	        <td class="fs-txt-right">{{comissao}}</td>
	        <td class="fs-txt-left">{{codcliente}}</td>
	        <td>{{nomecliente}}</td>
	        <td class="fs-txt-left">{{descorigempedido}}</td>
	        <td class="fs-txt-left">{{situacao}}</td>
	    </tr>
	</script>
	
	<div class="page-header">
	    <h2>MEUS PEDIDOS</h2>
	</div>
	
	<div class="row">
		<div class="col-md-5 col-md-offset-1">
			<div class="panel panel-info">
		    	<div class="panel-heading">SITUAÇÂO</div>
		    	<div class="panel-body">
					<div class="col-md-10 col-sm-offset-1">
						<div id="pieSituacao"></div>
					</div>
		    	</div>
		    </div>
		</div>
		<div class="col-md-5 pie-faturamento">
			<div class="panel panel-info">
		    	<div class="panel-heading">FATURAMENTO</div>
		    	<div class="panel-body">
					<div class="col-md-10 col-sm-offset-1">
						<div id="pieFaturamento"></div>
					</div>
		    	</div>
		    </div>
		</div>
	</div>
	<div class="panel panel-info">
    	<div class="panel-heading">LISTA DE PEDIDOS - <span class="titleResumo"></span></div>
    	<div class="panel-body">
    		<div id="datatablePedidos"></div>
    	</div>
    </div>
</div>
<script src="/webdesk/vcXMLRPC.js"></script>

