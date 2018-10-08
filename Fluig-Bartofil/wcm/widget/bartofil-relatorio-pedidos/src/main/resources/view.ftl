<div id="relatorioPedidos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="relatorioPedidos.instance()">
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
	
	<script type="text/template" class="tpl-resumo">
	    <li class="list-group-item">
	        <span class="badge {{ item.badge }}">{{ item.valor }}</span>
	        {{item.descricao}}
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
		    	</div>
		    </div>
		</div>
	</div>

	<div class="panel panel-default" id="panelGrid">
	<input type="hidden" id="tipoUsuario_${instanceId}" name="tipoUsuario_${instanceId}"></input>
    	<div class="panel-body">
			<div class="row no-print">
	    		<div class="col-sm-10 col-md-10 col-lg-10">
					<div class="form-group"  id="filtro_pontoIluminacao"> 
					    <div class="form-group col-xs-2 col-md-2">
							<label for="mes_${instanceId}">Mês: </label>
					        <select class="form-control input-sm filtros" id="mes_${instanceId}" data-AtualizaDataInformada>
					        	<option class="mes" value="0">Janeiro</option>
					        	<option class="mes" value="1">Fevereiro</option>
					        	<option class="mes" value="2">Março</option>
					        	<option class="mes" value="3">Abril</option>
					        	<option class="mes" value="4">Maio</option>
					        	<option class="mes" value="5">Junho</option>
					        	<option class="mes" value="6">Julho</option>
					        	<option class="mes" value="7">Agosto</option>
					        	<option class="mes" value="8">Setembro</option>
					        	<option class="mes" value="9">Outubro</option>
					        	<option class="mes" value="10">Novembro</option>
					        	<option class="mes" value="11">Dezembro</option>
					        </select>
					    </div>
					    <div class="form-group col-xs-2 col-md-2">
							<label for="ano_${instanceId}">Ano: </label>
							<select class="form-control input-sm filtros" id="ano_${instanceId}" data-AtualizaDataInformada>	
						        </select>
					    </div>
					    <div class="form-group col-xs-3 col-md-3" id="divCodRepres_${instanceId}">   
					    </div>
					</div>					
				</div>
				<div class="col-sm-2 col-md-2 col-lg-2" style="margin-top: 20px;">
					<span class="btn btn-primary" id="consultar_${instanceId}" data-validarInputCodRepres><span class="fluigicon fluigicon-search"></span>&nbsp;&nbsp;Filtrar Registros</span>
				</div>
			</div>
			<hr>
			<div id="gridDatatable_${instanceId}">
			
			</div>
    	</div>
    </div> 
</div>
<script src="/webdesk/vcXMLRPC.js"></script>

