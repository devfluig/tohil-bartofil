<div id="perfil_representante_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-perfil"
	data-params="perfilrepresentante.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}', groupadmin: '${groupadmin!''}'})">

   	<div class="row">
   		<div class="col-md-2 col-sm-1 user-avatar"></div>
   		
   		<div class="col-md-10 col-sm-11">
			<form class="form-horizontal" role="form">
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Periodo:</label>
					<div class="col-sm-3">
			    		<select class="form-control" id="periodo" data-change-periodo>
						    <script type="text/template" class="tpl-continuous-scroll-periodo">
						        {{#items}}
					    			<option data-month="{{mes}}" data-year="{{ano}}">{{periodo}}</option>
						        {{/items}}
						    </script>
			    		</select>
			    	</div>
		    		<label class="col-sm-3 control-label nav-representative fs-display-none">Representante:</label>
			    	<div class="form-group col-sm-2 nav-representative fs-display-none" style="margin-left: 0px !important;">
			    		<select class="form-control" id="listrepresentatives" data-change-representante>
						    <script type="text/template" class="tpl-representante">
						        {{#items}}
					    			<option value="{{id}}">{{name}}</option>
						        {{/items}}
						    </script>
			    		</select>
			    	</div>
			    </div>
			</form>
			<form class="form-horizontal" role="form">
			    <div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Contato:</label>
					<div class="col-sm-3">
						<p class="form-control-static contato"></p>
					</div>
					<label class="col-sm-3 control-label">Data de Admissão:</label>
					<div class="col-sm-2">
						<p class="form-control-static data-admissao"></p>
					</div>
			    </div>			
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Nome:</label>
					<div class="col-sm-3">
						<p class="form-control-static nome"></p>
					</div>
					<label class="col-sm-3 control-label">Venda média mensal último trimestre:</label>
					<div class="col-sm-2">
						<p class="form-control-static venda-media-trimestre"></p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Código:</label>
					<div class="col-sm-3">
						<p class="form-control-static codigo"></p>
					</div>
					<label class="col-sm-3 control-label">Venda média mensal último semestre:</label>
					<div class="col-sm-2">
						<p class="form-control-static venda-media-semestre"></p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Equipe:</label>
					<div class="col-sm-3">
						<p class="form-control-static equipe"></p>
					</div>
					<label class="col-sm-3 control-label">Venda média mensal último ano:</label>
					<div class="col-sm-2">
						<p class="form-control-static venda-media-ano"></p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Município de Residência:</label>
					<div class="col-sm-3">
						<p class="form-control-static municipio"></p>
					</div>
					<label class="col-sm-3 control-label">UF de Residência:</label>
					<div class="col-sm-2">
						<p class="form-control-static uf"></p>
					</div>
			    </div>						
			</form>
   		</div>
   		<p  class="col-md-12 col-sm-12">
   			<a href="#" class="btn btn-info btn-lg button-home active" data-click-widget data-widget=widget-home role="button">P&aacute;gina inicial</a>
   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-pedidos role="button">Meus pedidos</a>
			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-extrato role="button">Extrato de Comiss&atilde;o</a>
   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-parceiros-mensal role="button">Campanha Mensal<br>Parceiros 100%</a>
   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-parceiros role="button">Campanha Trimestral<br>Parceiros 100%</a>
  			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-parceiros-anual role="button">Campanha Anual<br>Parceiros 100%</a>
   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-campanha role="button">Concursos de Vendas</a>
   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=widget-promocoes role="button">Promo&ccedil;&otilde;es</a>
   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=universidade role="button" disabled="disabled">Universidade BCR <br>(Em desenvolvimento)</a>
   		</p>
	</div>
	
	<div class="page-header widget-home">
	    <h2>DESEMPENHO NO MÊS</h2>
	</div>
	
	<div class="row widget-home">
		<div class="col-sm-6">
			<div id="chartGauge" style="margin-left: 82px;"></div>
			<div class="legend-chart-gauge col-sm-8">
				<ul class="list-group">
				    <li class="list-group-item list-group-item-info list-group-item-custom">Potencial de Venda <b class="valor-potencial"></b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Venda Bruta <b class="venda-bruta"></b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Devolu&ccedil;&atilde;o <b class="devolucao"></b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Venda Liquida <b class="venda-liquida"></b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Potencial alcançado <b class="percentual-potencial"></b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Falta <b class="valor-faltante"></b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Venda/dia necessária: <b class="valor-dia"></b></li>
				</ul>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="list-group">
			    <a href="#" class="list-group-item disabled" data-click-decendio>Número de clientes atendidos:</a>
			    <a href="#" class="list-group-item" data-click-decendio data-id=1>1&ordm; Decêndio: <b class="decendio-1"></b> clientes</a>
			    <a href="#" class="list-group-item" data-click-decendio data-id=2>2&ordm; Decêndio: <b class="decendio-2"></b> clientes</a>
			    <a href="#" class="list-group-item" data-click-decendio data-id=3>3&ordm; Decêndio: <b class="decendio-3"></b> clientes</a>
			</div>
		</div>
	</div>
   		
	<div class="page-header widget-home">
	    <h2>COMISS&Atilde;O</h2>
	</div>
	
	<form class="form-horizontal widget-home" role="form">
		<div class="form-group">
			<label class="col-sm-3 control-label">Comissão sobre venda faturada:</label>
			<div class="col-sm-2">
				<input type="text" class="form-control fs-txt-right" id="comissaoVendaFaturada" disabled>
	    	</div>
    	</div>
		<div class="form-group">
			<label class="col-sm-3 control-label">Comissão sobre venda a faturar:</label>
			<div class="col-sm-2">
				<input type="text" class="form-control fs-txt-right" id="comissaoVendaAFatura" disabled>
	    	</div>
    	</div>
		<div class="form-group">
			<label class="col-sm-3 control-label">Comissão total:</label>
			<div class="col-sm-2">
				<input type="text" class="form-control fs-txt-right"  id="totalComissao" disabled>
	    	</div>
			<div class="col-sm-2">
				<button class="btn btn-primary" data-btn-por-cfa role="button">Comissão por CFA</button>					
	    	</div>
    	</div>
		<div class="form-group">
			<label class="col-sm-5 control-label">Quantidade de Itens (SKUs) dos Parceiros vendidos no mês: <b class="qtdeItensSkus"></b> itens</label>
		</div>
		<div class="form-group">
			<div class="col-sm-1 col-sm-offset-4">
				<button class="btn btn-primary" data-btn-show-skus role="button">Ver itens</button>
			</div>
		</div>
    </form>
    
	<div class="row widget-home">
		<div class="col-sm-6 col-sm-offset-1">
    	</div>
    </div>
	
	<div class="page-header widget-home">
	    <h2>EVOLU&Ccedil;&Atilde;O DO SEMESTRE (&Uacute;LTIMOS 6 MESES):</h2>
	</div>
	
	<div class="table-responsive">
		<table class="table table-striped table-hover table-evolucao widget-home">
			<thead>
				<tr>
					<td colspan=6>
						<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
					</td>
				</tr>
				<tr>
					<th class="fs-txt-left">M&ecirc;s</th>
					<th class="fs-txt-right">Valor Faturado</th>
					<th class="fs-txt-right">Comiss&atilde;o Recebida</th>
					<th class="fs-txt-right">Pr&ecirc;mios Recebidos (em dinheiro)</th>
					<th class="fs-txt-right">Valor Recebido</th>
					<th class="fs-txt-right">%</th>
				</tr>
			</thead>
			<tbody>
			
			</tbody>
			<tfoot>
				<tr>
					<td colspan=6>
						<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
					</td>
				</tr>
			</tfoot>
		</table>
		<p class="help-block widget-home">Valores considerando a data de faturamento (Estes valores podem divergir do gráfico de desempenho)</p>
	</div>
    <script type="text/template" class="tpl-extrato-comissao">
		<div class="table-responsive">
			<table class="table table-striped table-hover table-extrato-comissao widget-home">
				<thead>
					<tr>
						<th></th>
						<th>CFA/Produto</th>
						<th class="fs-txt-right">Valor Faturado</th>
						<th class="fs-txt-right">Comiss&atilde;o Recebida (R$)</th>
						<th class="fs-txt-right">Comiss&atilde;o M&eacute;dia (%)</th>
					</tr>
				</thead>
				<tbody>
			        {{#items}}
				    	<tr data-click-cfa class="fs-cursor-pointer" data-id="{{cfa}}">
							<td><a class="btn btn-default btn-xs" role="button"><i class="fluigicon fluigicon-plus icon-xs"></i></a></td> 
				    		<td>{{cfa}}</td>
				    		<td class="fs-txt-right">R$ {{valorFaturado}}</td>
				    		<td class="fs-txt-right">R$ {{comissaoRecebida}}</td>
				    		<td class="fs-txt-right">{{percentual}}%</td>
				    	</tr>
			        {{/items}}
				</tbody>
			</table>
		</div>
	</script>
		
    <script type="text/template" class="tpl-evolucao">
        {{#items}}
    	<tr class="{{css}}">
    		<td class="fs-txt-left">{{mes}}</td>
    		<td class="fs-txt-right">R$ {{valorFaturado}}</td>
    		<td class="fs-txt-right">R$ {{comissaoRecebida}}</td>
    		<td class="fs-txt-right">R$ {{premiosRecebidos}}</td>
    		<td class="fs-txt-right">R$ {{valorTotal}}</td>
    		<td class="fs-txt-right">{{percentual}}%</td>
    	</tr>
        {{/items}}
    </script>
	
    <script type="text/template" class="tpl-avatar">
    	<img data-update-image-profile="{{userCode}}" data-image-size="X_SMALL_PICTURE" src="{{image}}" class="fluig-style-guide thumb-profile thumb-profile-md"></img>
    </script>
    
    <script type="text/template" class="tpl-decendio">
		<div class="table-responsive">
			<table class='table table-condesed table-striped'>
				<thead>
					<tr>
						<th>Cliente</th>
						<th>Valor Faturado</th>
					</tr>
				</thead>
				<tbody>
		        {{#items}}
					<tr>
						<td>{{cliente}}</td>
						<td class="fs-txt-right">R$ {{valor}}</td>
					</tr>
		        {{/items}}
				</tbody>
			</table>
		</div>
	</script>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

