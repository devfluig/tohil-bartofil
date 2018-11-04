<div id="perfil_representante_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros"
	data-params="perfilrepresentante.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}'})">

   	<div class="row">
   		<div class="col-md-1 col-sm-1 user-avatar"></div>
   		
   		<div class="col-md-11 col-sm-11">
			<form class="form-inline" role="form">
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
   		
    <script type="text/template" class="tpl-avatar">
    	<img data-update-image-profile="{{userCode}}" data-image-size="X_SMALL_PICTURE" src="{{image}}" class="fluig-style-guide thumb-profile thumb-profile-md"></img>
    </script>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

