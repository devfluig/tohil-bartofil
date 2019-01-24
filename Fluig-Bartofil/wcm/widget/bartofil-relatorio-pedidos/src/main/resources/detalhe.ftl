<div class="panel panel-info">
   	<div class="panel-heading">CONDI&Ccedil;&Atilde;O DE PAGAMENTO</div>
   	<div class="panel-body">
		<table class="table table-striped with-border table-hover table-condensed">
			<thead>
		  		<tr class="primary">
		  			<th class="fs-txt-right">Parcela</th>
		  			<th class="fs-txt-right">Prazo</th>
		  			<th class="fs-txt-right">Valor</th>
		  		</tr>
		  	</thead>
		  	<tbody>
				<#list params['condicoes'] as row>
					<tr> 
			  			<td class="fs-txt-right">${row.nroparcela}</td>
			  			<td class="fs-txt-right">${row.prazo}</td>
			  			<td class="fs-txt-right">R$ ${row.valorparcela}</td>
			  		</tr>
				</#list>
		  	</tbody>
		</table>
   	</div>
</div>
<div class="panel panel-info">
   	<div class="panel-heading">ITEMS DO PEDIDO</div>
   	<div class="panel-body">
		<table class="table table-striped with-border table-hover table-condensed">
			<thead>
		  		<tr class="primary">
		  			<th class="fs-txt-right">Seq</th>
		  			<th>Produto</th>
		  			<th class="fs-txt-right">Qtde Pedida</th>
		  			<th class="fs-txt-right">Qtde Atend</th>
		  			<th class="fs-txt-right">Valor Pedido</th>
		  			<th class="fs-txt-right">Valor Atend</th>
		  			<th class="fs-txt-right">Comiss&atilde;o</th>
		  			<th class="fs-txt-right">Valor Total</th>
		  		</tr>
		  	</thead>
		  	<tbody>
				<#list params['items'] as row>
					<tr> 
			  			<td class="fs-txt-right">${row.seqitem}</td>
			  			<td>${row.codproduto} - ${row.descproduto}</td>
			  			<td class="fs-txt-right">${row.qtdpedida}</td>
			  			<td class="fs-txt-right">${row.qtdatendida}</td>
			  			<td class="fs-txt-right">R$ ${row.valorpedido}</td>
			  			<td class="fs-txt-right">R$ ${row.valoratendido}</td>
			  			<td class="fs-txt-right">R$ ${row.valortotalcomissao}</td>
			  			<td class="fs-txt-right">R$ ${row.valortotalacobrar}</td>
			  		</tr>
				</#list>
		  	</tbody>
		</table>
   	</div>
</div>
