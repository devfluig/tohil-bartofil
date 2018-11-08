<div id="perfil_representante_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-perfil"
	data-params="perfilrepresentante.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}'})">

   	<div class="row">
   		<div class="col-md-1 col-sm-1 user-avatar"></div>
   		
   		<div class="col-md-11 col-sm-11">
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
		    	</div>
		    	<div class="form-group custom-form-group">
		    		<label class="col-sm-3 control-label fs-md-space nav-representative fs-display-none">Representante:</label>
			    	<div class="form-group col-sm-2 nav-representative fs-display-none">
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
						<p class="form-control-static contato">Carpegiani</p>
					</div>
					<label class="col-sm-3 control-label">Data de Admissão:</label>
					<div class="col-sm-2">
						<p class="form-control-static data-admissao">27/02/2009</p>
					</div>
			    </div>			
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Nome:</label>
					<div class="col-sm-3">
						<p class="form-control-static nome">Carpegiani Representação LTDA</p>
					</div>
					<label class="col-sm-3 control-label">Grupo Parceiros 100%:</label>
					<div class="col-sm-2">
						<p class="form-control-static grupo-parceiros">4 – acima de R$ 100 mil</p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Código:</label>
					<div class="col-sm-3">
						<p class="form-control-static codigo">30835</p>
					</div>
					<label class="col-sm-3 control-label">Venda média mensal último trimestre:</label>
					<div class="col-sm-2">
						<p class="form-control-static venda-media-trimestre">R$ 280.433,12</p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Equipe:</label>
					<div class="col-sm-3">
						<p class="form-control-static equipe">Minas Gerais 4</p>
					</div>
					<label class="col-sm-3 control-label">Venda média mensal último semestre:</label>
					<div class="col-sm-2">
						<p class="form-control-static venda-media-semestre">R$ 291.556,89</p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">Município de Residência:</label>
					<div class="col-sm-3">
						<p class="form-control-static mucipio">Carpegiani Representação LTDA</p>
					</div>
					<label class="col-sm-3 control-label">Venda média mensal último ano:</label>
					<div class="col-sm-2">
						<p class="form-control-static venda-media-ano">R$ 291.556,89</p>
					</div>
			    </div>						
				<div class="form-group custom-form-group">
					<label class="col-sm-2 control-label">UF de Residência::</label>
					<div class="col-sm-3">
						<p class="form-control-static uf">MG</p>
					</div>
			    </div>						
			</form>
   		</div>
   		<div class="row">
   			<div class="col-md-10 col-md-offset-1">
	   			<a href="#" class="btn btn-info btn-lg button-home active" data-click-widget data-widget=home role="button">HOME</a>
				<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=extrato role="button">Extrato de Comiss&atilde;o</a>
	   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=trimestral role="button">Campanha Trimestral<br>Parceiros 100%</a>
	   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=anual role="button">Campanha Anual<br>Parceiros 100%</a>
	   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=campanha role="button">Demais Concursos e<br>Campanha de Vendas</a>
	   			<a href="#" class="btn btn-info btn-lg button-home" data-click-widget data-widget=pedidos role="button">Meus pedidos</a>
	   		</div>
   		</div>
	</div>
	
	<div class="page-header">
	    <h2>DESEMPENHO NO MÊS</h2>
	</div>
	
	<div class="row">
		<div class="col-md-2 legend-chart-pie"></div>
		<div class="col-sm-3"><div id="chartPie"></div></div>
		<div class="col-sm-4">
			<div id="chartGauge"></div>
			<div class="legend-chart-gauge">
				<ul class="list-group">
				    <li class="list-group-item list-group-item-info list-group-item-custom"><b>50.000,00</b> Potencial de Venda</li>
				    <li class="list-group-item list-group-item-info list-group-item-custom"><b>80.341,00</b> Valor Vendido</li>
				    <li class="list-group-item list-group-item-info list-group-item-custom"><b>89%</b>  potencial alcançado</li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Falta <b>R$ 23.000,00</b></li>
				    <li class="list-group-item list-group-item-info list-group-item-custom">Venda/dia necessária: <b>R$ 1.320,12</b></li>
				</ul>
			</div>
		</div>
		<div class="col-md-3">
			<div class="list-group">
			    <a href="#" class="list-group-item disabled" data-click-decendio>Número de clientes atendidos:</a>
			    <a href="#" class="list-group-item" data-click-decendio>Decêndio 01: <b>23</b> clientes</a>
			    <a href="#" class="list-group-item" data-click-decendio>Decêndio 02: <b>19</b> clientes</a>
			    <a href="#" class="list-group-item" data-click-decendio>Decêndio 03: <b>00</b> clientes</a>
			</div>
		</div>
	</div>
   		
	<div class="page-header">
	    <h2>COMISS&Atilde;O</h2>
	</div>
	
	<div class="row">
		<form class="form-horizontal" role="form">
			<div class="form-group">
				<label class="col-sm-3 control-label">Comissão sobre venda faturada:</label>
				<div class="col-sm-2">
					<input type="email" class="form-control" id="comissaoVendaFaturada" disabled>
		    	</div>
	    	</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">Comissão sobre venda a faturar:</label>
				<div class="col-sm-2">
					<input type="email" class="form-control" id="comissaoVendaAFatura" disabled>
		    	</div>
		    	<p class="help-block">(Em análise + Liberado + Em separação)</p>
	    	</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">TOTAL:</label>
				<div class="col-sm-2">
					<input type="email" class="form-control" id="totalComissao" disabled>
		    	</div>
				<div class="col-sm-2">
					<button class="btn btn-primay" data-btn-por-cfa role="button">Por CFA</button>					
		    	</div>
	    	</div>
	    </form>
	</div>
	<div class="row">
		<div class="col-sm-6 col-sm-offset-1">
			<button class="btn btn-primay" data-btn-por-cfa role="button">Quantidade de Itens (SKUs) dos Parceiros vendidos no mês: <b>183</b> itens</button>					
    	</div>
    </div>
	
	<div class="page-header">
	    <h2>Evoluç&atilde;o do Semestre (&uacute;ltimos 6 meses):</h2>
	</div>
	
	<table class="table table-striped table-hover table-evolucao">
		<thead>
			<tr>
				<th>M&ecirc;s</th>
				<th>Valor Faturado</th>
				<th>Comiss&atilde;o Recebida</th>
				<th>Pr&ecirc;mios Recebidos (em dinheiro)</th>
				<th>Valor Recebido</th>
				<th>%</th>
			</tr>
		</thead>
		<tbody>
		
		</tbody>
	</table>
	
	<div class="page-header">
	    <h2>Extrato de Comiss&atilde;o Detalhado:</h2>
	</div>
	
	<table class="table table-striped table-hover table-extrato-comissao">
		<thead>
			<tr>
				<th>CFA/Produto</th>
				<th>Valor Faturado</th>
				<th>Comiss&atilde;o Recebida (R$)</th>
				<th>Comiss&atilde;o M&eacute;dia (%)</th>
			</tr>
		</thead>
		<tbody>
		
		</tbody>
	</table>
	
    <script type="text/template" class="tpl-evolucao">
        {{#items}}
    	<tr class="{{css}}">
    		<td>{{mes}}</td>
    		<td>{{valorFaturado}}</td>
    		<td>{{comissaoRecebida}}</td>
    		<td>{{premiosRecebidos}}</td>
    		<td>{{valorTotal}}</td>
    		<td>{{percentual}}</td>
    	</tr>
        {{/items}}
    </script>
	
    <script type="text/template" class="tpl-extrato-comissao">
        {{#items}}
    	<tr data-click-cfa class="fs-cursor-pointer" data-id="{{cfa}}">
    		<td>{{cfa}}</td>
    		<td>{{valorFaturado}}</td>
    		<td>{{comissaoRecebida}}</td>
    		<td>{{percentual}}</td>
    	</tr>
        {{/items}}
    </script>
    
    <script type="text/template" class="tpl-avatar">
    	<img data-update-image-profile="{{userCode}}" data-image-size="X_SMALL_PICTURE" src="{{image}}" class="fluig-style-guide thumb-profile thumb-profile-md"></img>
    </script>
    
    <script type="text/template" class="tpl-decendio">
		<table class='table table-condesed table-striped'>
			<thead>
				<tr>
					<th>Cliente</th>
					<th>Valor Faturado</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>MATOS ALEM ALVES DA COSTA ME - 2936</td>
					<td>5.610,00</td>
				</tr>
			</tbody>
		</table>
	</script>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

