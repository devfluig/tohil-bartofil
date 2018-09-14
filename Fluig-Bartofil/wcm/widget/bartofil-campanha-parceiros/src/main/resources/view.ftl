<div id="campanha_parceiros_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros"
	data-params="campanhaparceiros.instance({instanceId: ${instanceId}})">

	<div class="page-header">
		<h1>${i18n.getTranslation('posicao.rca.campanha')}</h1>
	</div>
	
	<div class="panel panel-info">
	    <div class="panel-heading">${i18n.getTranslation('campanha.parceiros.100')}</div>
	    <div class="panel-body">
	    	<div class="row">
	    		<div class="col-md-1 col-sm-1 user-avatar">
				    <script type="text/template" class="tpl-avatar">
				    	<img data-update-image-profile="{{userCode}}" data-image-size="X_SMALL_PICTURE" src="/social/api/rest/social/image/profile/{{userCode}}/X_SMALL_PICTURE" class="fluig-style-guide thumb-profile thumb-profile-md"></img>
				    </script>
	    		</div>
	    		
	    		<div class="col-md-11 col-sm-11">
					<form class="form-horizontal" role="form">
						<div class="form-group">
					        <label for="codrca" class="col-sm-1 control-label">${i18n.getTranslation('cod.rca')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="codrca" readonly >
					        </div>
					        <label for="gerencia" class="col-sm-1 control-label">${i18n.getTranslation('gerencia')}</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="gerencia" readonly >
					        </div>
					        <label for="totalpontos" class="col-sm-1 control-label">${i18n.getTranslation('total.pontos')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="totalpontos" readonly >
					        </div>
					    </div>						
						<div class="form-group">
					        <label for="nomerca" class="col-sm-1 control-label">${i18n.getTranslation('nome.rca')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="nomerca" readonly >
					        </div>
					        <label for="equipe" class="col-sm-1 control-label">${i18n.getTranslation('equipe')}</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="equipe" readonly >
					        </div>
					        <label for="colocacao" class="col-sm-1 control-label">${i18n.getTranslation('colocacao')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="colocacao" readonly >
					        </div>
					    </div>						
						<div class="form-group">
					        <label for="divisao" class="col-sm-offset-3 col-sm-1 control-label">${i18n.getTranslation('divisao')}</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="divisao" readonly >
					        </div>
					        <label for="premio" class="col-sm-1 control-label">${i18n.getTranslation('premio')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="premio" readonly >
					        </div>
					    </div>						
					</form>
	    		</div>
	    	</div>
		</div>
		<div class="panel-footer fs-txt-center">
			<label class="label label-default fs-float-left" id="dataprocessamento" style="font-size: 100%; margin-top: 5px;">${i18n.getTranslation('data.proces')}: 10/09/2018</label>		
			<button type="button" class="btn btn-default">${i18n.getTranslation('colocacao.trimestre')}</button>&nbsp;<button type="button" class="btn btn-default">${i18n.getTranslation('detalhamento')}</button>
		</div>
	</div>
	
	<form class="form-inline" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar" data-change-ordenar>
    			<option value="id" data-type="integer">C&Oacute;DIGO</option>
    			<option value="dtainicio" data-type="date">DATA INICIO</option>
    			<option value="dtaprorrogado" data-type="date">${i18n.getTranslation('data.prorrogado')}</option>
    			<option value="dtaencerrado" data-type="date">DATA ENCERRAMENTO</option>
    			<option value="descricao" data-type="string">DESCRI&Ccedil;&Atilde;O</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-paginacao>
    			<option value="8">8</option>
    			<option value="16">16</option>
    			<option value="24">24</option>
    			<option value="32">32</option>
    			<option value="999">Todas</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca" placeholder="${i18n.getTranslation('digite.texto')}">
        </div>
		<label>${i18n.getTranslation('trimestre')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-trimestre>
    			<option value="1">1</option>
    			<option value="2">2</option>
    			<option value="3">3</option>
    			<option value="4">4</option>
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
	
   	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed">
   		<thead>
   			<tr class="primary">
   				<th class="fs-txt-center">${i18n.getTranslation('codigo')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('nome.rca')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('pontos')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('ordem')}</th>
   				<th>${i18n.getTranslation('premio')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('equipe')}</th>
   			</tr>
   		</thead>
   		<tbody>
		    <script type="text/template" class="tpl-item-ranking">
		        {{#items}}
		  			<tr class="{{premiado}}">
		  				<td class="fs-txt-center">{{codigo}}</td>
		  				<td class="fs-txt-center">{{nome}}</td>
		  				<td class="fs-txt-center">{{pontos}}</td>
		  				<td class="fs-txt-center">{{ordem}}</td>
		  				<td>{{premio}}</td>
		  				<td class="fs-txt-center">{{equipe}}</td>
		  			</tr>
		        {{/items}}
		    </script>
   			<tr class="success">
   				<td class="fs-txt-center">Premiado</td>
   				<td class="fs-txt-center">20683</td>
   				<td>Marcelo</td>
   				<td class="fs-txt-center">10.221,80</td>
   				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;1.100,00</td>
   				<td>Bahia 2</td>
   			</tr>
   		</tbody>
   	</table>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

