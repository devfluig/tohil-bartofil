<div id="promocoes_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-promocoes"
	data-params="promocoes.instance({instanceId: ${instanceId}, folderpromocao: '${folderpromocao!''}'})">

	<div class="page-header">
		<h1>PROMO&Ccedil;&Otilde;ES EM VIGOR</h1>
	</div>

	<form class="form-inline header-itens-promocao" role="form">
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao-promocao" data-change-paginacao-promocao>
    			<option value="8">8</option>
    			<option value="16">16</option>
    			<option value="24">24</option>
    			<option value="32">32</option>
    			<option value="999">Todas</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca-promocao" placeholder="Digite o texto">
        </div>
	</form>
	<br>
	
    <script type="text/template" class="tpl-continuous-scroll-promocoes">
		<div class="row clearfix itens-promocoes">
	        {{#items}}
				<div class="col-sm-4 col-md-3" data-click-document data-pdf="{{pdf}}" data-version="{{version}}">
				    <div class="thumbnail">
				        <img id="img{{id}}" src="{{img}}" alt="{{descricao}}" style="height: 300px;">
				        <div class="caption">
				            <h4>{{descricao}}</h4>
				            <p>{{{texto}}}</p>
				            <p style="padding-top: 5px;"><span class="label label-default">Iniciada {{datainicio}}</span><span class="label label-danger">at&eacute; {{datafim}}</span></p>
				        </div>
				    </div>
				</div>
	        {{/items}}
	    </div>
    </script>
	
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

