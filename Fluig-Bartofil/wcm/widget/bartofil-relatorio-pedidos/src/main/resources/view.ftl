<div id="relatorioPedidos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="relatorioPedidos.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}' })">
	<script type="text/template" class="tpl-detalhamento">
		<div class="{{ item.classItem }}">
			<div class="small-box {{ item.background }}" data-id="{{ item.id }}" data-click-item>
			    <div class="inner">
			      <h3>COMISS&Atilde;O DE {{ item.comissao }}</h3>
			      <p>{{ item.quantidade }} pedidos no total de {{ item.total }}</p>
			    </div>
			    <a href="#" class="small-box-footer">{{ item.tipo }}</a>
			</div>
		</div>
	</script>
	<script type="text/template" class="template_datatable">
	    <tr>
	        <td>{{nropedidovenda}}</td>
	        <td class="fs-txt-center">{{datainclusao}}</td>
	        <td class="fs-txt-center">{{valor}}</td>
	        <td class="fs-txt-center">{{comissao}}</td>
	        <td class="fs-txt-center">{{codcliente}}</td>
	        <td>{{nomecliente}}</td>
	        <td class="fs-txt-center">{{descorigempedido}}</td>
	        <td class="fs-txt-center">{{situacao}}</td>
	    </tr>
	</script>
	
	<script type="text/template" class="tpl-resumo">
	    <li class="list-group-item {{ group }}">
	        <span class="badge badge-success">{{ total }}</span>
	        {{#comissao}}
	        	<span class="badge badge-info">{{ comissao}}</span>
	        {{/comissao}}
			{{#quantidade}}	        
	        	<span class="badge badge-warning">{{ quantidade }}</span>
	        {{/quantidade}}
	        {{descricao}}
	    </li>
	</script>
	
	<div class="page-header">
		<h1>Relatório de Pedidos</h1>
	</div>
	
	<form class="form-inline" role="form">
		<label>${i18n.getTranslation('periodo')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="periodo" data-change-periodo>
			    <script type="text/template" class="tpl-continuous-scroll-periodo">
			        {{#items}}
		    			<option data-month="{{mes}}" data-year="{{ano}}">{{periodo}}</option>
			        {{/items}}
			    </script>
    		</select>
    	</div>
		<label class="fs-md-space nav-representative fs-display-none">${i18n.getTranslation('representante')}:</label>
    	<div class="form-group nav-representative fs-display-none">
    		<select class="form-control" id="listrepresentatives" data-change-representante>
			    <script type="text/template" class="tpl-representante">
			        {{#items}}
		    			<option value="{{id}}">{{name}}</option>
			        {{/items}}
			    </script>
    		</select>
    	</div>
	</form>
	<br>		
	<div class="row line-1"></div>
	<div class="row line-2"></div>
	
	<div class="row">
		<div class="col-md-6">
			<div class="panel panel-info">
		    	<div class="panel-heading">RESUMO DE PEDIDOS - <span class="titleResumo"></span></div>
		    	<div class="panel-body">
					<ul class="list-group ul-resumo"></ul>		    	
		    	</div>
		    </div>
		</div>
		<div class="col-md-6">
			<div class="panel panel-info">
		    	<div class="panel-heading">PEDIDOS POR ORIGEM - <span class="titleResumo"></span></div>
		    	<div class="panel-body">
		    		<div class="row">
						<div class="col-md-3 legend-chart"></div>
						<div class="col-md-9"><div id="chartOrigem"></div></div>
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

